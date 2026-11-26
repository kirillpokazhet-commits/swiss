const polyglotPractice = (() => {
  const passPercent = 85;
  const minimumCredits = 50;
  const recentWindow = 50;
  const minimumPerTopic = 5;
  const minimumRecent = Math.ceil(recentWindow * passPercent / 100);
  const version = 2;
  const people = [
    ["ich", "mich", "habe", "bin"], ["du", "dich", "hast", "bist"],
    ["er", "sich", "hat", "ist"], ["wir", "uns", "haben", "sind"],
    ["ihr", "euch", "habt", "seid"], ["sie", "sich", "haben", "sind"]
  ];
  const capital = text => text[0].toUpperCase() + text.slice(1);

  function shuffleItems(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  }

  function parseVerb(row) {
    const [key, translation, forms, auxiliary, participle, context, revision] = row.split("|");
    const reflexive = key.startsWith("sich ");
    const [first, second] = key.replace(/^sich /, "").split("/");
    const prefix = second ? first : "";
    const base = second ?? first;
    const separator = prefix === "spazieren" ? " " : "";
    const infinitive = prefix ? prefix + separator + base : base;
    const [firstPerson, secondPerson, thirdPerson, pluralSecond] = forms.split(",");
    return {
      term: (reflexive ? "sich " : "") + infinitive,
      translation, reflexive, prefix, auxiliary, participle, context, revision,
      forms: [firstPerson, secondPerson, thirdPerson, base, pluralSecond, base]
    };
  }

  function wordExample(verb) {
    const middle = verb.reflexive ? "mich " + verb.context : verb.context;
    return ["Ich", verb.forms[0], middle, verb.prefix].filter(Boolean).join(" ") + ".";
  }

  function choice(id, kind, label, prompt, answer, alternatives, detail = "") {
    return { id, kind, label, prompt, answer, detail, type: "choice",
      options: [...new Set([answer, ...alternatives])].slice(0, 3) };
  }

  function build(id, kind, label, prompt, answer, detail = "") {
    return { id, kind, label, prompt, answer, detail, type: "build" };
  }

  function expandPattern(template) {
    const group = /\[([^\]]+)\]/u.exec(template);
    return group ? group[1].split("|").flatMap(value =>
      expandPattern(template.slice(0, group.index) + value + template.slice(group.index + group[0].length))) : [template];
  }

  function patternQuestions(lesson, index) {
    const patterns = polyglotPracticePatterns[index];
    return patterns.flatMap(([ruleIndex, pattern], group) =>
      expandPattern(pattern).flatMap((template, example) => {
        const slot = /\{([^{}]+)\}/u.exec(template);
        const [answer, ...alternatives] = slot[1].split("/");
        const before = template.slice(0, slot.index);
        const after = template.slice(slot.index + slot[0].length);
        const fullAnswer = before + answer + after;
        const id = "grammar-" + group + "-" + example;
        const label = lesson.rules[ruleIndex][0];
        const fill = {
          ...choice(id, "rule", label, "", answer, alternatives, before + "…" + after),
          fullAnswer, ruleIndex
        };
        const left = before.trim().split(/\s+/u).filter(Boolean);
        const wrong = alternatives[example % alternatives.length];
        const isLast = /^[.!?]$/u.test(after.trim());
        const errorParts = [...left, isLast ? wrong + after.trim() : wrong, ...(isLast ? [] : after.trim().split(/\s+/u).filter(Boolean))];
        const find = {
          ...choice(id + "-find", "rule", label, "", answer, alternatives),
          type: "find", instruction: "Найди ошибку", ruleIndex, fullAnswer,
          errorParts, errorIndex: left.length, wrong
        };
        return [fill, find];
      }));
  }

  function makeBank(lesson) {
    const verbs = lesson.verbs.map(parseVerb);
    const words = [...lesson.words, ...verbs.map(verb => [verb.term, verb.translation, wordExample(verb), verb])];
    const questions = lesson.drills.flatMap(([ruleIndex, prompt, template, revision, variants = []], index) => {
      const key = revision ? index + "-" + revision : index;
      const match = /\{([^{}]+)\}/u.exec(template);
      const [answer, ...alternatives] = match[1].split("/");
      const fullAnswer = template.replace(match[0], answer);
      const label = lesson.rules[ruleIndex][0];
      const pick = {
        ...choice("rule-" + key, "rule", label, prompt, answer, alternatives, template.replace(match[0], "…")),
        fullAnswer, ruleIndex
      };
      const choosePhrase = {
        ...choice("choose-phrase-" + key, "rule", label, prompt, fullAnswer,
          alternatives.map(option => template.replace(match[0], option))),
        instruction: "Как ты скажешь по-немецки?", ruleIndex, format: "meaning"
      };
      const arrange = {
        ...build("phrase-" + key, "phrase", label, prompt, fullAnswer,
          /начни с/iu.test(prompt) ? "" : courseText("Начало: #1", fullAnswer.split(/\s+/u)[0])),
        instruction: fullAnswer.endsWith("?") ? "Задай вопрос" : undefined,
        distractors: alternatives.filter(option => !option.includes(" ")),
        ruleIndex, variants
      };
      return [pick, arrange, choosePhrase,
        { ...arrange, id: "write-" + key, kind: "write", type: "type", instruction: undefined, variants }];
    });

    for (const [index, verb] of (lesson.verbPractice ? verbs : []).entries()) {
      if (Array.isArray(lesson.verbPractice) && !lesson.verbPractice.includes(verb.term)) continue;
      const forms = [...new Set(verb.forms)];
      const otherParticiples = verbs.filter((item, position) => position !== index &&
        (!Array.isArray(lesson.verbPractice) || lesson.verbPractice.includes(item.term))).map(item => item.participle);
      for (const [position, [subject, reflexive, have, be]] of people.entries()) {
        const name = capital(subject);
        const middle = (verb.reflexive ? reflexive + " " : "") + verb.context;
        const verbForm = verb.forms[position];
        const presentTail = [middle, verb.prefix].filter(Boolean).join(" ");
        const id = "verb-" + index + "-" + position + (verb.revision ? "-" + verb.revision : "") + "-";
        const verbPrompt = verb.term + " — " + courseText(verb.translation);
        const questionPrompt = verbPrompt + ". " + (subject === "sie"
          ? courseText("Используй «sie» (они).") : courseText("Используй «#1».", subject));
        const choicePrompt = subject === "sie" ? questionPrompt : verbPrompt;
        questions.push(
          { ...choice(id + "present", "present", "Кто что делает",
            choicePrompt, verbForm, shuffleItems(forms.filter(form => form !== verbForm)), name + " … " + presentTail + "."),
            fullAnswer: name + " " + verbForm + " " + presentTail + ".", verb, subject, verbForm },
          { ...build(id + "build", "verb-build", "Вопросы",
            questionPrompt, capital(verbForm) + " " + subject + " " + presentTail + "?"),
            instruction: "Задай вопрос",
            distractors: forms.filter(form => form !== verbForm).map(capital), verb, subject, verbForm }
        );
        if (!lesson.pastPractice) continue;
        const auxiliary = verb.auxiliary === "sein" ? be : have;
        const pastTail = middle + " " + verb.participle;
        questions.push(
          { ...choice(id + "aux", "past", "Когда нужно haben или sein", choicePrompt,
            auxiliary, [verb.auxiliary === "sein" ? have : be], name + " … " + pastTail + "."),
            fullAnswer: name + " " + auxiliary + " " + pastTail + ".", verb, subject, auxiliary },
          { ...choice(id + "part", "past", "Что уже случилось", choicePrompt,
            verb.participle, shuffleItems([verb.term, verbForm, ...otherParticiples]), name + " " + auxiliary + " " + middle + " …."),
            fullAnswer: name + " " + auxiliary + " " + pastTail + ".", verb, subject, auxiliary },
          { ...build(id + "perfect", "verb-build", "Что уже случилось",
            questionPrompt, name + " " + auxiliary + " " + pastTail + "."),
            instruction: "Расскажи, что было", distractors: [verbForm, verb.auxiliary === "sein" ? have : be], verb, subject, auxiliary }
        );
      }
    }

    for (const [index, [term, meaning]] of words.entries()) {
      const neighbors = words.filter(([word, translation]) => word !== term && translation !== meaning);
      questions.push(
        { ...choice("word-ru-" + index, "words", "Слова урока", meaning,
          term, shuffleItems(neighbors.map(([word]) => word))),
          wordTerm: term, instruction: "Как по-немецки?" },
        { ...choice("word-de-" + index, "words", "Слова урока", "", meaning,
          shuffleItems(neighbors.map(([, translation]) => translation)), term),
          wordTerm: term, instruction: "Выбери перевод" }
      );
    }

    const lessonIndex = polyglotCourse.indexOf(lesson);
    questions.push(...patternQuestions(lesson, lessonIndex));
    const [ruleIndex, instruction, source, answer] = polyglotPracticeRewrites[lessonIndex];
    questions.push({
      ...build("rewrite", "phrase", lesson.rules[ruleIndex][0], instruction, answer, source),
      instruction: "Переделай фразу", format: "rewrite", ruleIndex,
      answerStart: answer.split(/\s+/u)[0]
    });

    const skills = new Map();
    for (const question of questions) {
      question.skill = question.ruleIndex !== undefined ? "rule-" + question.ruleIndex :
        question.kind === "verb-build" || question.kind === "past" ? question.id.split("-").at(-1) : question.kind;
      const example = question.kind === "words" ? "vocabulary " + question.wordTerm :
        question.fullAnswer ?? question.answer;
      question.variant = example.normalize("NFC").toLowerCase().replace(/ß/gu, "ss")
        .replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/gu, " ").trim();
      question.format ??= question.type;
      if (!skills.has(question.skill)) skills.set(question.skill, []);
      skills.get(question.skill).push(question);
    }
    const grammar = questions.filter(question => question.kind !== "words" && question.type !== "type");
    const topics = [...new Set(grammar.map(question => question.skill))];
    return { words, skills, grammar, topics, byId: new Map(questions.map(question => [question.id, question])) };
  }

  function newMastery() {
    return { version, earned: {}, produced: {}, recent: [], formats: {}, seen: {}, reviews: {}, attempts: 0, revision: 0, active: null };
  }

  function masteryPercent(bank, mastery) {
    const stats = masteryStats(bank, mastery);
    return stats.passed ? 100 : Math.min(99, Math.floor(100 * stats.earned / minimumCredits));
  }

  function masteryStats(bank, mastery) {
    const earned = bank.topics.reduce((total, skill) => total + (mastery?.earned[skill]?.length ?? 0), 0);
    const recent = mastery?.recent ?? [];
    const accurate = recent.length === recentWindow && recent.filter(Boolean).length >= minimumRecent;
    const covered = bank.topics.every(skill => (mastery?.earned[skill]?.length ?? 0) >= minimumPerTopic &&
      (!skill.startsWith("rule-") || mastery?.produced?.[skill]));
    return { earned, accurate, covered, passed: earned >= minimumCredits && accurate && covered };
  }

  function passedLegacySkills(skills, mastery) {
    const earned = skills.reduce((total, skill) => total + (mastery.earned[skill]?.length ?? 0), 0);
    return Math.floor(100 * earned / (skills.length * 2)) >= passPercent;
  }

  function passedPreviousBank(lesson, bank, mastery) {
    if (!mastery || mastery.version === version) return false;
    if (passedLegacySkills([...bank.skills.keys()], mastery)) return true;
    if (lesson.verbPractice) return false;
    // Older banks added the same conjugation skills to every lesson.
    const skills = [...lesson.rules.map((_, index) => "rule-" + index), "words", "present", "build"];
    if (lesson.pastPractice) skills.push("aux", "part", "perfect");
    return passedLegacySkills(skills, mastery);
  }

  function upgradeMastery(bank, saved) {
    if (!saved || saved.version === version) return saved;
    const mastered = new Set();
    const earned = {};
    for (const skill of bank.topics) {
      for (const question of bank.skills.get(skill)) {
        if (mastered.has(question.variant) || !saved.earned?.[skill]?.includes(question.variant)) continue;
        (earned[skill] ??= []).push(question.variant);
        mastered.add(question.variant);
      }
    }
    return { ...newMastery(), ...saved, version, earned, recent: [], produced: {}, formats: {} };
  }

  function recordAttempt(mastery, question, correct) {
    const { skill, variant, format, type } = question;
    if (question.kind === "words") return false;
    mastery.seen[variant] = ++mastery.attempts;
    mastery.recent = [...mastery.recent, correct].slice(-recentWindow);
    mastery.formats[format] = mastery.attempts;
    if (!correct) {
      mastery.reviews[skill] = { variant, due: mastery.attempts + 2 };
      return false;
    }
    if (mastery.reviews[skill]?.variant === variant) return false;
    delete mastery.reviews[skill];
    if (type === "build") mastery.produced[skill] = true;
    if (Object.values(mastery.earned).some(variants => variants.includes(variant))) return false;
    (mastery.earned[skill] ??= []).push(variant);
    return true;
  }

  function nextQuestion(bank, mastery) {
    const count = skill => mastery.earned[skill]?.length ?? 0;
    const credited = new Set(Object.values(mastery.earned).flat());
    const review = skill => mastery.reviews[skill];
    const different = bank.grammar.filter(question => review(question.skill)?.variant !== question.variant);
    const ready = different.filter(question => !review(question.skill) || review(question.skill).due <= mastery.attempts);
    const rank = question => {
      const { skill, variant, type, format } = question;
      const needsBuild = skill.startsWith("rule-") && !mastery.produced[skill];
      return [
        review(skill)?.due <= mastery.attempts ? 0 : 1,
        count(skill) < minimumPerTopic ? 0 : 1,
        credited.has(variant) ? 1 : 0,
        needsBuild && type === "build" ? 0 : 1,
        mastery.formats[format] ?? 0,
        mastery.seen[variant] ?? 0,
        count(skill)
      ];
    };
    const pool = ready.length ? ready : different;
    const ordered = shuffleItems(pool).map(question => ({ question, rank: rank(question) }));
    ordered.sort((left, right) => {
      for (const [index, value] of left.rank.entries()) {
        if (value !== right.rank[index]) return value - right.rank[index];
      }
      return 0;
    });
    return ordered[0]?.question ?? null;
  }

  function migrateRound(bank, round) {
    const mastery = newMastery();
    if (!Array.isArray(round?.order) || !Array.isArray(round.results)) return mastery;
    for (const [index, result] of round.results.entries()) {
      const question = bank.byId.get(round.order[index]);
      if (!question || question.kind === "words" || typeof result?.answer !== "string" || typeof result.correct !== "boolean") continue;
      const gained = recordAttempt(mastery, question, result.correct);
      if (round.pending && index === round.results.length - 1) {
        mastery.active = { id: question.id, feedback: { ...result, gained } };
      }
    }
    const outstanding = bank.byId.get(round.order[round.results.length]);
    if (!round.pending && outstanding && masteryPercent(bank, mastery) < 100 && !mastery.reviews[outstanding.skill]) {
      mastery.active = { id: outstanding.id };
    }
    return mastery;
  }

  return { passPercent, minimumCredits, makeBank, shuffleItems, newMastery, masteryPercent, masteryStats,
    passedPreviousBank, upgradeMastery, recordAttempt, nextQuestion, migrateRound };
})();
