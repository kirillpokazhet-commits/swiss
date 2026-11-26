"use strict";

const wordSchedule = (() => {
  // FSRS-6 default model at 90% target retention.
  // https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm#fsrs-6
  const weights = [
    0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001,
    1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014,
    1.8729, 0.5425, 0.0912, 0.0658, 0.1542
  ];
  const grades = { again: 1, hard: 2, good: 3, easy: 4 };
  const minute = 60_000;
  const day = 24 * 60 * minute;
  const maximumDays = 36_500;
  const steps = { learning: [minute, 10 * minute], relearning: [10 * minute] };
  const forgettingFactor = 0.9 ** (-1 / weights[20]) - 1;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const initialDifficulty = grade => weights[4] + 1 - Math.exp(weights[5] * (grade - 1));
  const intervalDays = stability => clamp(Math.round(stability), 1, maximumDays);

  function updateMemory(card, grade, now) {
    if (!card) {
      return { stability: weights[grade - 1], difficulty: clamp(initialDifficulty(grade), 1, 10) };
    }
    const { stability, difficulty, lastReview } = card;
    const elapsedDays = Math.max(0, Math.floor((now - lastReview) / day));
    const difficultyChange = -weights[6] * (grade - grades.good) * (10 - difficulty) / 9;
    const nextDifficulty = weights[7] * initialDifficulty(grades.easy) +
      (1 - weights[7]) * (difficulty + difficultyChange);
    let nextStability;
    if (elapsedDays === 0) {
      const multiplier = Math.exp(weights[17] * (grade - grades.good + weights[18])) * stability ** -weights[19];
      nextStability = stability * (grade === grades.again ? multiplier : Math.max(1, multiplier));
    } else {
      const recall = (1 + forgettingFactor * elapsedDays / stability) ** -weights[20];
      if (grade === grades.again) {
        const afterForgetting = weights[11] * difficulty ** -weights[12] *
          ((stability + 1) ** weights[13] - 1) * Math.exp((1 - recall) * weights[14]);
        nextStability = Math.min(afterForgetting, stability / Math.exp(weights[17] * weights[18]));
      } else {
        const hardPenalty = grade === grades.hard ? weights[15] : 1;
        const easyBonus = grade === grades.easy ? weights[16] : 1;
        const growth = Math.exp(weights[8]) * (11 - difficulty) * stability ** -weights[9] *
          Math.expm1((1 - recall) * weights[10]) * hardPenalty * easyBonus;
        nextStability = stability * (1 + growth);
      }
    }
    return { stability: clamp(nextStability, 0.001, maximumDays), difficulty: clamp(nextDifficulty, 1, 10) };
  }

  function preview(card, now) {
    const phase = card?.phase ?? "learning";
    const step = card?.step ?? 0;
    const eligibleSteps = steps[phase] ?? steps.relearning;
    const firstStep = eligibleSteps[0];
    const secondStep = eligibleSteps[1];
    const memory = Object.fromEntries(Object.entries(grades).map(([label, grade]) =>
      [label, updateMemory(card, grade, now)]));
    const hardDays = intervalDays(memory.hard.stability);
    const goodDays = intervalDays(memory.good.stability);
    const reviewDays = {
      hard: Math.min(hardDays, goodDays),
      good: phase === "review" ? Math.min(maximumDays, Math.max(goodDays, Math.min(hardDays, goodDays) + 1)) : goodDays,
      easy: intervalDays(memory.easy.stability)
    };
    reviewDays.easy = Math.min(maximumDays, Math.max(reviewDays.easy, reviewDays.good + 1));
    const answer = (label, delay, nextPhase = "review", nextStep = 0) => ({
      ...memory[label], due: now + delay, lastReview: now, phase: nextPhase, step: nextStep
    });
    const review = label => answer(label, reviewDays[label] * day);
    return {
      again: answer("again", firstStep, phase === "review" ? "relearning" : phase),
      hard: phase === "review" ? review("hard") :
        answer("hard", step ? eligibleSteps[step] : secondStep ? (firstStep + secondStep) / 2 : firstStep * 1.5, phase, step),
      good: phase !== "review" && eligibleSteps[step + 1] ?
        answer("good", eligibleSteps[step + 1], phase, step + 1) : review("good"),
      easy: review("easy")
    };
  }

  function isSchedule(card) {
    return Number.isSafeInteger(card?.due) && Number.isSafeInteger(card.lastReview) &&
      card.lastReview >= 0 && card.due >= card.lastReview &&
      Number.isFinite(card.stability) && card.stability >= 0.001 && card.stability <= maximumDays &&
      Number.isFinite(card.difficulty) && card.difficulty >= 1 && card.difficulty <= 10 &&
      Number.isInteger(card.step) && card.step >= 0 &&
      (card.phase === "review" ? card.step === 0 : Object.hasOwn(steps, card.phase) && card.step < steps[card.phase].length);
  }

  function migrate(card) {
    const interval = Number.isSafeInteger(card.interval) && card.interval > 0
      ? card.interval
      : [0, 1, 3, 7, 14, 30][card.level] * day;
    return {
      due: card.due, lastReview: Math.max(0, card.due - interval),
      stability: clamp(interval / day || weights[0], weights[0], maximumDays),
      difficulty: initialDifficulty(grades.good),
      phase: interval >= day ? "review" : "learning", step: interval >= 10 * minute && interval < day ? 1 : 0
    };
  }

  return { preview, isSchedule, migrate };
})();
