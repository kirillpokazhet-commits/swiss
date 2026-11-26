const polyglotPractice = (() => {
  const passPercent = 85;
  const confirmations = 2;
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
        instruction: "Выбери подходящую фразу", ruleIndex
      };
      const arrange = {
        ...build("phrase-" + key, "phrase", label, prompt, fullAnswer,
          /начни с/iu.test(prompt) ? "" : courseText("Начало: #1", fullAnswer.split(/\s+/u)[0])),
        instruction: fullAnswer.endsWith("?") ? "Задай вопрос" : undefined,
        distractors: alternatives.filter(option => !option.includes(" ")),
        ruleIndex
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

    const skills = new Map();
    for (const question of questions) {
      question.skill = question.ruleIndex !== undefined ? "rule-" + question.ruleIndex :
        question.kind === "verb-build" || question.kind === "past" ? question.id.split("-").at(-1) : question.kind;
      const example = question.kind === "words" ? "vocabulary " + question.wordTerm :
        question.fullAnswer ?? question.answer;
      question.variant = example.normalize("NFC").toLowerCase().replace(/ß/gu, "ss")
        .replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/gu, " ").trim();
      if (!skills.has(question.skill)) skills.set(question.skill, []);
      skills.get(question.skill).push(question);
    }
    return { words, skills, byId: new Map(questions.map(question => [question.id, question])) };
  }

  function newMastery() {
    return { earned: {}, seen: {}, reviews: {}, attempts: 0, revision: 0, active: null };
  }

  function masteryPercent(bank, mastery) {
    if (!mastery) return 0;
    return percentageForSkills([...bank.skills.keys()], mastery);
  }

  function percentageForSkills(skills, mastery) {
    const earned = skills.reduce((total, skill) => total + (mastery.earned[skill]?.length ?? 0), 0);
    return Math.floor(100 * earned / (skills.length * confirmations));
  }

  function passedPreviousBank(lesson, mastery) {
    if (!mastery || lesson.verbPractice) return false;
    // Older banks added the same conjugation skills to every lesson.
    const skills = [...lesson.rules.map((_, index) => "rule-" + index), "words", "present", "build"];
    if (lesson.pastPractice) skills.push("aux", "part", "perfect");
    return percentageForSkills(skills, mastery) >= passPercent;
  }

  function recordAttempt(mastery, question, correct) {
    const { skill, variant } = question;
    const earned = mastery.earned[skill] ??= [];
    mastery.seen[variant] = ++mastery.attempts;
    if (earned.length === confirmations) return false;
    if (!correct) {
      mastery.reviews[skill] = { variant, due: mastery.attempts + 2 };
      return false;
    }
    if (earned.includes(variant) || mastery.reviews[skill]?.variant === variant) return false;
    earned.push(variant);
    delete mastery.reviews[skill];
    return true;
  }

  function nextQuestion(bank, mastery) {
    const skills = [...bank.skills.keys()];
    const count = skill => mastery.earned[skill]?.length ?? 0;
    const remaining = skills.filter(skill => count(skill) < confirmations);
    if (!remaining.length) return null;

    const review = skill => mastery.reviews[skill];
    const due = remaining.filter(skill => review(skill)?.due <= mastery.attempts);
    const fresh = remaining.filter(skill => !review(skill));
    // Keep two other attempts between a mistake and a new example on its skill.
    const eligible = due.length ? due : fresh.length ? fresh : skills.filter(skill => !remaining.includes(skill));
    const pool = (eligible.length ? eligible : remaining).flatMap(skill =>
      bank.skills.get(skill).filter(question => review(skill)?.variant !== question.variant &&
        (count(skill) === confirmations || !mastery.earned[skill]?.includes(question.variant))));
    return shuffleItems(pool).sort((left, right) =>
      (due.length ? review(left.skill).due - review(right.skill).due : count(left.skill) - count(right.skill)) ||
      (mastery.seen[left.variant] ?? 0) - (mastery.seen[right.variant] ?? 0)
    )[0] ?? null;
  }

  function migrateRound(bank, round) {
    const mastery = newMastery();
    if (!Array.isArray(round?.order) || !Array.isArray(round.results)) return mastery;
    for (const [index, result] of round.results.entries()) {
      const question = bank.byId.get(round.order[index]);
      if (!question || typeof result?.answer !== "string" || typeof result.correct !== "boolean") continue;
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

  return { passPercent, makeBank, shuffleItems, newMastery, masteryPercent, passedPreviousBank, recordAttempt, nextQuestion, migrateRound };
})();
