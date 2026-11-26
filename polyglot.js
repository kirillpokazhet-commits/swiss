const polyglot = (() => {
  const { passPercent, makeBank, shuffleItems, newMastery, masteryPercent, recordAttempt, nextQuestion, migrateRound } = polyglotPractice;
  const root = document.getElementById("polyglot-view");
  const keyPrefix = "deutsch-a11.polyglot.v1.";
  const sections = { theory: "Теория", practice: "Практика", words: "Слова и глаголы" };
  const courseLink = "#polyglot";
  const courseTitle = "Немецкий шаг за шагом";
  const lessonLink = (id, tab = "theory") => courseLink + "/" + id + "/" + tab;
  const banks = new Map();
  const memory = new Map();
  let current;
  let storageUnavailable = false;

  function normalizeAnswer(value) {
    return value.normalize("NFC").toLocaleLowerCase("de").replace(/ß/gu, "ss")
      .replace(/[.,!?;:„“”"«»]/gu, "").replace(/[’‘]/gu, "'").replace(/\s+/gu, " ").trim();
  }

  function getBank(id) {
    if (!banks.has(id)) banks.set(id, makeBank(polyglotCourse[id - 1]));
    return banks.get(id);
  }

  function getProgress(id) {
    let stored;
    try {
      if (storageUnavailable) return memory.get(id) ?? {};
      stored = localStorage.getItem(keyPrefix + id);
    } catch {
      storageUnavailable = true;
      return memory.get(id) ?? {};
    }
    try {
      const progress = JSON.parse(stored);
      return progress && typeof progress === "object" ? progress : {};
    } catch {
      return {};
    }
  }

  function saveProgress(id, progress) {
    memory.set(id, progress);
    try {
      if (!storageUnavailable) localStorage.setItem(keyPrefix + id, JSON.stringify(progress));
    } catch {
      storageUnavailable = true;
    }
  }

  function getMastery(id, progress) {
    return progress.mastery ?? (progress.round ? migrateRound(getBank(id), progress.round) : null);
  }

  function lessonPercent(id, progress) {
    const mastery = getMastery(id, progress);
    return mastery ? masteryPercent(getBank(id), mastery) : 0;
  }

  function passedLegacyRound(progress) {
    return (progress.best ?? 0) >= 90;
  }

  function saveMastery(id, progress, mastery) {
    delete progress.round;
    saveProgress(id, { ...progress, mastery });
  }

  function firstUnpassed() {
    let lastPassed = 0;
    for (const [index] of polyglotCourse.entries()) {
      const id = index + 1;
      const progress = getProgress(id);
      if (passedLegacyRound(progress) || lessonPercent(id, progress) >= passPercent) lastPassed = id;
    }
    return lastPassed + 1;
  }

  function updateMastery(change) {
    const { id } = current;
    const progress = getProgress(id);
    const mastery = getMastery(id, progress);
    if (!mastery || mastery.revision !== current.mastery?.revision ||
        mastery.active?.id !== current.mastery.active?.id) {
      renderPractice();
      return false;
    }
    change(mastery);
    mastery.revision++;
    saveMastery(id, progress, mastery);
    current.mastery = mastery;
    return true;
  }

  function courseNavigation(href = "#home", label = "Все разделы") {
    return pageNavigation(href, label);
  }

  function setTitle(hero, title, description, back, compact = false) {
    hero.innerHTML = courseNavigation(...back) + '<h1' +
      (compact ? ' class="polyglot-practice-title"' : "") + '>' + escapeHTML(title) + "</h1>" +
      (description ? '<p>' + escapeHTML(description) + "</p>" : "");
  }

  function link(href, text, className = "button") {
    return '<a class="' + className + '" href="' + href + '">' + escapeHTML(text) + "</a>";
  }

  function renderHub(hero, first) {
    setTitle(hero, courseTitle, "", []);
    const passed = first - 1;
    const total = polyglotCourse.length;
    const complete = passed === total;
    const progress = complete ? {} : getProgress(first);
    const startedPractice = Boolean(progress.mastery || progress.round);
    const nextTab = startedPractice || progress.tab === "practice" ? "practice" :
      progress.tab === "words" ? "words" : "theory";
    const primaryLabel = complete ? "Итоговая практика" : {
      practice: (startedPractice ? "Продолжить" : "Начать") + " практику урока " + first,
      words: "К словам урока " + first,
      theory: (progress.tab ? "Продолжить" : "Начать") + " урок " + first
    }[nextTab];
    const nextHref = complete ? courseLink + "/final" : lessonLink(first, nextTab);
    const unlock = complete ? "" : " · " + (first === total ? "Итоговая практика откроется" : "Урок " + (first + 1) + " откроется") +
      " при " + passPercent + "% в уроке " + first;
    const groups = ["Знакомство, работа и встречи", "Повседневные ситуации", "Строим и уточняем фразы", "Выражаемся точнее"];
    const cardsLesson = polyglotCourse.map((_, index) => index + 1).slice(0, first)
      .map(id => ({ id, deck: getProgress(id).deck })).filter(item => item.deck)
      .sort((left, right) => (right.deck.updated ?? 0) - (left.deck.updated ?? 0))[0];
    root.innerHTML = '<div class="polyglot-start">' + link(nextHref, primaryLabel, "button primary") +
      (cardsLesson && !(cardsLesson.id === first && nextTab === "words")
        ? link(lessonLink(cardsLesson.id, "words"), "Продолжить карточки · урок " + cardsLesson.id) : "") +
      '<p class="muted">Пройдено ' + passed + ' из ' + total + ' уроков' + unlock + '</p></div>' +
      groups.map((name, index) => {
        const list = polyglotCourse.slice(index * 4, index * 4 + 4).map((lesson, offset) => {
          const id = index * 4 + offset + 1;
          const lessonProgress = getProgress(id);
          const locked = id > first;
          const opening = locked ? '<span class="polyglot-lesson is-locked">' :
            '<a class="polyglot-lesson" href="' + lessonLink(id) + '">';
          const percent = locked ? 0 : lessonPercent(id, lessonProgress);
          const status = locked ? "Закрыт" :
            id < first && percent < passPercent ? "Пройден" : percent + "%";
          return "<li>" + opening + '<span class="polyglot-lesson-number">' + id + '</span><strong>' +
            escapeHTML(lesson.title) + "</strong><small>" + status + "</small>" + (locked ? "</span>" : "</a>") + "</li>";
        }).join("");
        return '<section><h2>' + name + '</h2><ol class="polyglot-lesson-list" start="' + (index * 4 + 1) + '">' + list + "</ol></section>";
      }).join("") + (first < total ? '<p><small>Итоговая практика откроется после урока 16.</small></p>' : "");
  }

  function readingTopic(index) {
    const notes = [
      ["ei / ie", "ei звучит примерно как «ай»: mein. ie — долгий «и»: Liebe.", "mein, Liebe"],
      ["eu / äu", "Оба сочетания звучат примерно как «ой»: heute, Häuser.", "heute, Häuser"],
      ["sch / tsch", "sch — как «ш» в Schule. tsch — как «ч» в Tschüss.", "Schule, Tschüss"],
      ["sp / st", "В начале слова или части слова часто звучат как «шп» и «шт»: spielen, stehen.", "spielen, stehen"],
      ["ch", "После i и e звук мягче, как в ich. После a, o, u чаще слышен звук ближе к «х», как в Buch.", "ich, Buch"],
      ["ä / ö / ü", "Ä часто близко к открытому «э». Для ö произнеси «э» с округлёнными губами, для ü — «и» с округлёнными губами.", "spät, schön, Tür"]
    ];
    return '<article class="polyglot-rule"><h2 tabindex="-1" id="polyglot-topic-' + index + '"' +
      (current.target === "reading" ? " data-route-focus" : "") + '>Правила чтения</h2>' +
      '<ul class="polyglot-reading">' + notes.map(([name, detail, examples]) =>
        '<li><h3 lang="de">' + escapeHTML(name) + '</h3><p>' + escapeHTML(detail) + '</p>' +
        speaker(examples) + '<p class="muted polyglot-audio-status" role="status"></p></li>').join("") + '</ul></article>';
  }

  function renderFinal(hero) {
    setTitle(hero, "Итоговая практика", "Ответь по-немецки вслух и сравни свой вариант с примером.", [courseLink, courseTitle]);
    const progress = getProgress("final");
    const marks = progress.marks ?? {};
    root.innerHTML = '<p class="muted" id="polyglot-final-summary" role="status">' + finalSummary(marks) + '</p>' +
      '<ol class="polyglot-final">' + polyglotFinal.map(([question, example], index) =>
        '<li class="panel"><p lang="de">' + escapeHTML(question) + '</p><details><summary>Показать пример</summary><p lang="de">' +
        escapeHTML(example) + '</p></details><div class="polyglot-actions">' +
        [["done", "Ответил"], ["review", "Повторить"]].map(([mark, label]) =>
          '<button type="button" data-polyglot="final-mark" data-index="' + index + '" data-mark="' + mark +
          '" aria-pressed="' + (marks[index] === mark) + '">' + label + '</button>').join("") + '</div></li>').join("") + "</ol>";
  }

  function finalSummary(marks) {
    const values = Object.values(marks);
    return "Отвечено " + values.filter(mark => mark === "done").length + " из " + polyglotFinal.length +
      " · Повторить " + values.filter(mark => mark === "review").length;
  }

  function renderLocked(hero, id, first) {
    const final = id === polyglotCourse.length + 1;
    setTitle(hero, final ? "Итоговая практика закрыта" : "Урок " + id + " пока закрыт",
      "Достигни " + passPercent + "% освоения в практике урока " + first + ", чтобы продвинуться дальше.", [courseLink, courseTitle]);
    root.innerHTML = link(lessonLink(first, "practice"), "К практике урока " + first, "button primary");
  }

  function render(hero, target, tab, rememberTab = true, context) {
    const first = firstUnpassed();
    current = { hero, target, tab, context };
    if (target === "reading") {
      target = "1";
      tab = "theory";
      rememberTab = false;
    }
    if (target === "final") {
      if (first <= polyglotCourse.length) return renderLocked(hero, polyglotCourse.length + 1, first);
      return renderFinal(hero);
    }
    const id = /^\d+$/u.test(target ?? "") ? Number(target) : 0;
    const lesson = polyglotCourse[id - 1];
    if (!lesson) return renderHub(hero, first);
    if (id > first) return renderLocked(hero, id, first);
    current.id = id;
    current.lesson = lesson;
    current.section = Object.hasOwn(sections, tab) ? tab : "theory";
    const practicing = current.section === "practice";
    setTitle(hero, id + ". " + lesson.title, practicing ? "" : lesson.goal, [courseLink, courseTitle], practicing);
    const progress = getProgress(id);
    if (rememberTab && progress.tab !== current.section) saveProgress(id, { ...progress, tab: current.section });
    root.innerHTML = '<nav class="tabs polyglot-tabs" aria-label="Разделы урока">' +
      Object.entries(sections).map(([name, label]) => '<a href="' + lessonLink(id, name) + '"' +
        (current.section === name ? ' aria-current="page"' : "") + '>' + label + "</a>").join("") +
      '</nav><div class="polyglot-body"></div>';
    current.body = root.querySelector(".polyglot-body");
    if (current.section === "practice") {
      current.bank = getBank(id);
      renderPractice();
    } else if (current.section === "words") {
      current.bank = getBank(id);
      current.deck = progress.deck;
      renderWords();
    } else {
      renderTheory();
    }
  }

  function renderTheory() {
    const { id, lesson, body } = current;
    const topics = polyglotTheory[id - 1];
    const topicNames = topics.map(([, name]) => name);
    if (id === 1) topicNames.push("Правила чтения");
    const focused = getBank(id).skills.get(current.context)?.[0];
    const tip = focused?.ruleIndex !== undefined ? lesson.rules[focused.ruleIndex][1] : null;
    body.innerHTML = (focused ? '<article class="panel polyglot-rule" tabindex="-1" data-route-focus><h2>' +
      escapeHTML(skillLabel(focused)) + '</h2><p>' + escapeHTML(tip ?? skillHint(focused.skill)) +
      '</p><p class="example" lang="de">' + escapeHTML(focused.fullAnswer ?? focused.answer) + '</p></article>' : "") +
      '<details class="theory-index polyglot-theory-index"><summary>Темы урока</summary><ul>' + topicNames.map((name, index) =>
        '<li><button type="button" data-polyglot="theory-topic" data-index="' + index + '">' + escapeHTML(name) + '</button></li>').join("") + '</ul></details>' +
      '<div class="polyglot-theory-topics">' +
      topics.map(([, name, explanation, tip, examples, table], index) =>
        '<article class="polyglot-rule"><h2 tabindex="-1" id="polyglot-topic-' + index + '">' + escapeHTML(name) + "</h2>" +
        explanation.split("\n\n").map(paragraph => "<p>" + escapeHTML(paragraph) + "</p>").join("") +
        (table ? theoryTable(name, table) : "") +
        '<p class="polyglot-tip"><strong>Как запомнить.</strong> ' + escapeHTML(tip) + '</p>' +
        '<dl class="polyglot-theory-examples">' + examples.map(([german, russian]) =>
          '<div><dt lang="de">' + escapeHTML(german) + '</dt><dd class="muted">' +
          escapeHTML(russian) + "</dd></div>").join("") + "</dl></article>").join("") +
      (id === 1 ? readingTopic(topics.length) : "") + "</div>";
  }

  function theoryTable(name, [headers, ...rows]) {
    return '<div class="polyglot-theory-table" tabindex="0"><table><caption class="sr-only">' + escapeHTML(name) +
      '</caption><thead><tr>' + headers.map(header => '<th scope="col">' + escapeHTML(header) + "</th>").join("") +
      "</tr></thead><tbody>" + rows.map(([label, ...cells]) =>
        '<tr><th scope="row">' + escapeHTML(label) + "</th>" +
        cells.map(cell => "<td>" + escapeHTML(cell) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
  }

  const speaker = text => '<button type="button" data-polyglot="speak" data-text="' + escapeAttribute(text) +
    '" aria-label="' + escapeAttribute(courseText("Слушать #1", text)) + '">Слушать</button>';
  function escapeAttribute(text) {
    return escapeHTML(text).replace(/"/gu, "&quot;");
  }

  function renderWords() {
    const { id, bank, body } = current;
    const deck = current.deck;
    if (!deck) {
      const saved = getProgress(id).deck;
      body.innerHTML = '<div class="polyglot-actions">' +
        (saved ? '<button type="button" class="primary" data-polyglot="resume-cards">Продолжить · карточка ' + (saved.index + 1) + '</button>' : "") +
        '<button type="button"' + (saved ? "" : ' class="primary"') + ' data-polyglot="cards-de">Карточки · немецкий → русский</button>' +
        '<button type="button" data-polyglot="cards-ru">Карточки · русский → немецкий</button></div>' +
        '<ul class="polyglot-word-list">' + bank.words.map(([term, meaning, example, verb]) =>
          '<li class="panel"><strong lang="de">' + escapeHTML(term) + "</strong><p>" + escapeHTML(meaning) + '</p><p lang="de">' +
          escapeHTML(example) + "</p>" + (verb ? '<p class="muted" lang="de">ich ' + escapeHTML(verb.forms[0]) +
          ' · du ' + escapeHTML(verb.forms[1]) + ' · er ' + escapeHTML(verb.forms[2]) +
          (id > 1 ? ' · ' + escapeHTML(verb.auxiliary + " + " + verb.participle) : "") + "</p>" : "") +
          speaker(term) + '<p class="muted polyglot-audio-status" role="status"></p></li>').join("") + "</ul>";
      return;
    }
    const [term, meaning, example] = bank.words[deck.order[deck.index]];
    const question = deck.reverse ? meaning : term;
    const answer = deck.reverse ? term : meaning;
    body.innerHTML = '<div class="panel polyglot-card"><p class="muted">Карточка ' + (deck.index + 1) + " из " + deck.order.length +
      '</p><h2 lang="' + (deck.reverse ? courseLanguage : "de") + '">' + escapeHTML(question) +
      '</h2><div aria-live="polite">' + (deck.revealed ? '<p lang="' + (deck.reverse ? "de" : courseLanguage) + '">' + escapeHTML(answer) +
      '</p><p lang="de">' + escapeHTML(example) + "</p>" + speaker(term) : "") +
      '</div><p class="muted polyglot-audio-status" role="status"></p><div class="polyglot-actions">' + (deck.revealed ?
        '<button class="primary" type="button" data-polyglot="next-card">' + (deck.index + 1 === deck.order.length ? "К списку слов" : "Следующее слово") + "</button>" :
        '<button class="primary" type="button" data-polyglot="reveal">Показать ответ</button>') +
      '<button type="button" data-polyglot="word-list">Вернуться к списку</button></div></div>';
  }

  function saveDeck(deck) {
    if (deck) deck.updated = Date.now();
    current.deck = deck;
    saveProgress(current.id, { ...getProgress(current.id), deck });
    renderWords();
  }

  function skillHint(skill) {
    return ({
      present: "Найди подлежащее и выбери форму глагола для этого лица.",
      build: "В общем вопросе сначала идёт спрягаемый глагол, затем подлежащее.",
      aux: "В Perfekt проверь, с каким вспомогательным глаголом употребляется смысловой глагол.",
      part: "У вспомогательного глагола своя форма. Смысловой глагол ставится в Partizip II.",
      perfect: "В утверждении вспомогательный глагол занимает вторую позицию, Partizip II стоит в конце.",
      words: "Вспомни слово вместе с его значением и примером из карточек урока."
    })[skill] ?? "";
  }

  function masteryHeader(percent, previouslyPassed) {
    const detail = percent >= passPercent ? "Урок пройден" : previouslyPassed ? "Ранее пройден" : "Переход при " + passPercent + "%";
    return '<div class="practice-progress polyglot-mastery"><strong>Освоение ' + percent + '%</strong><span>' + detail +
      '</span></div><progress class="polyglot-progress" aria-label="Освоение урока" value="' + percent + '" max="100"></progress>' +
      '<details class="polyglot-skills"' + (current.skillsOpen ? " open" : "") + '><summary>Навыки урока</summary><ul>' +
      [...current.bank.skills].map(([skill, questions]) => {
        const count = current.mastery?.earned[skill]?.length ?? 0;
        return '<li><span>' + escapeHTML(skillLabel(questions[0])) + '</span><strong' + (count ? "" : ' class="muted"') + '>' +
          ["Ещё не проверено", "1 из 2", "Подтверждён"][count] + '</strong></li>';
      }).join("") + '</ul></details>';
  }

  function skillLabel(question) {
    return ({ present: "Формы глаголов", build: "Порядок слов в общих вопросах", words: "Слова и выражения" })[question.skill] ?? question.label;
  }

  function chooseActive(mastery) {
    const question = nextQuestion(current.bank, mastery);
    mastery.active = question ? { id: question.id } : null;
  }

  function startPractice() {
    const { id } = current;
    const progress = getProgress(id);
    if (!getMastery(id, progress)) {
      const mastery = newMastery();
      chooseActive(mastery);
      saveMastery(id, progress, mastery);
    }
    renderPractice();
    focusQuestion();
  }

  function renderPractice() {
    const { id, bank, body } = current;
    const progress = getProgress(id);
    const mastery = getMastery(id, progress);
    current.mastery = mastery;
    const percent = masteryPercent(bank, mastery);
    const previouslyPassed = passedLegacyRound(progress);
    const passed = previouslyPassed || percent >= passPercent;
    const header = masteryHeader(percent, previouslyPassed);
    const status = storageUnavailable ? '<p class="muted" role="status">Сохранение недоступно. Прогресс останется в этой вкладке до её закрытия.</p>' : "";
    if (!mastery) {
      body.innerHTML = status + header + '<div class="panel polyglot-card"><h2 tabindex="-1">Практика урока</h2>' +
        '<p>Потренируй каждую тему на двух разных примерах. Если ошибёшься, прогресс сохранится, а похожее задание встретится позже.</p>' +
        (passed ? '<div class="polyglot-actions">' + onwardLink() : '<div class="polyglot-actions">') +
        '<button ' + (passed ? "" : 'class="primary" ') + 'type="button" data-polyglot="start">Начать практику</button></div></div>';
      return;
    }
    const needsQuestion = !bank.byId.has(mastery.active?.id) && (mastery.active || percent < 100);
    if (!progress.mastery || needsQuestion) {
      if (needsQuestion) chooseActive(mastery);
      mastery.revision++;
      saveMastery(id, progress, mastery);
    }
    const active = mastery.active;
    if (!active) {
      body.innerHTML = status + header + '<article class="panel polyglot-card"><h2 tabindex="-1">Все навыки урока подтверждены</h2>' +
        '<div class="polyglot-actions">' + onwardLink() + link(lessonLink(id), "Повторить теорию") + '</div></article>';
      return;
    }
    const question = bank.byId.get(active.id);
    if (current.question?.id !== question.id || current.questionAttempt !== mastery.attempts - Number(Boolean(active.feedback))) {
      current.question = question;
      current.questionAttempt = mastery.attempts - Number(Boolean(active.feedback));
      const tokens = question.type === "build" ? question.answer.split(/\s+/u) : [];
      current.tokenCount = tokens.length;
      const distractors = shuffleItems(question.distractors ?? []).filter(token =>
        !tokens.some(item => normalizeAnswer(item) === normalizeAnswer(token))).slice(0, 1);
      current.options = active.draft?.options ?? shuffleItems(question.type === "build" ? [...tokens, ...distractors] : question.options ?? []);
      current.selected = active.draft?.selected ?? [];
    }
    current.correcting = Boolean(active.editing);
    const confirmations = mastery.earned[question.skill]?.length ?? 0;
    const ready = question.type === "build" ? current.selected.length === current.tokenCount : Boolean(active.draft?.input?.trim());

    const mode = question.instruction ?? {
      choice: "Вставь слово", build: "Собери фразу", type: "Напиши по-немецки"
    }[question.type];
    body.innerHTML = status + header + (passed && !active.feedback ? '<div class="polyglot-actions">' + onwardLink() + '</div>' : "") +
      '<article class="panel exercise-panel polyglot-question">' +
      '<p class="muted polyglot-skill">' + escapeHTML(skillLabel(bank.skills.get(question.skill)[0])) + ' · ' + confirmations + ' из 2' +
      (!active.feedback && mastery.reviews[question.skill] ? ' · Новый пример на повторение' : '') + '</p>' +
      '<h2 tabindex="-1">' + mode + "</h2>" +
      (question.prompt ? "<p>" + escapeHTML(question.prompt) + "</p>" : "") +
      (question.detail ? '<p class="polyglot-detail"' + (question.type === "choice" ? ' lang="de"' : "") +
        ">" + escapeHTML(question.detail) + "</p>" : "") +
      (active.feedback && !current.correcting ? feedback(question, active, passed, percent) :
        (current.correcting ? '<p class="muted">Исправь ответ. Процент растёт после верного ответа на другом примере.</p>' : "") +
        '<form aria-label="' + mode + '">' +
        answerControls(question, active.draft?.input ?? "") + '<div class="polyglot-actions"><button class="primary" type="submit"' +
        (ready ? '' : ' disabled') + '>Проверить</button></div></form>') + "</article>";
  }

  function trayButtons() {
    return current.selected.map(index => '<button type="button" lang="de" data-polyglot="remove" data-index="' + index +
      '" aria-label="' + escapeAttribute(courseText("Убрать #1", current.options[index])) + '">' + escapeHTML(current.options[index]) + '</button>').join("");
  }

  function answerControls(question, input) {
    if (question.type === "type") return '<p class="muted" id="polyglot-writing-tip">Проверь заглавные буквы и знаки препинания.</p>' +
      '<label class="sr-only" for="polyglot-answer">Твой ответ</label>' +
      '<input id="polyglot-answer" name="answer" type="text" lang="de" autocomplete="off" spellcheck="false" aria-describedby="polyglot-writing-tip" required value="' + escapeAttribute(input) + '">';
    if (question.type === "choice") {
      const language = question.id.startsWith("word-de-") ? courseLanguage : "de";
      return '<div class="choices">' + current.options.map((option, index) => '<label class="choice"><input name="answer" type="radio" required value="' +
        index + '"' + (input === String(index) ? ' checked' : '') + '><span lang="' + language + '">' + escapeHTML(option) + "</span></label>").join("") + "</div>";
    }
    const instructions = current.options.length > current.tokenCount ? '<p class="muted">Одно слово лишнее.</p>' : "";
    return instructions + '<div class="word-tray" role="group" aria-label="Собранная фраза">' + trayButtons() +
      '</div><div class="word-bank" role="group" aria-label="Доступные слова">' +
      current.options.map((option, index) => '<button type="button" lang="de" data-polyglot="add" data-index="' + index +
        '"' + (current.selected.includes(index) ? ' disabled' : '') + '>' + escapeHTML(option) + "</button>").join("") + "</div>";
  }

  function onwardLink() {
    const { id } = current;
    return id === polyglotCourse.length
      ? link(courseLink + "/final", "К итоговой практике", "button primary")
      : link(lessonLink(id + 1), "Следующий урок", "button primary");
  }

  function feedback(question, active, passed, percent) {
    const result = active.feedback;
    const reviewLink = link(lessonLink(current.id, "theory") + "/" + question.skill, "Открыть правило");
    const reference = question.fullAnswer ?? question.answer;
    const translatedChoice = question.id.startsWith("word-de-");
    const language = translatedChoice ? courseLanguage : "de";
    const ownAnswer = !result.correct ? '<p>Твой ответ: <span lang="' + language + '"' +
      (translatedChoice ? "" : " data-user-text") + '>' + escapeHTML(result.answer) + "</span></p>" : "";
    const verb = question.verb;
    let tip = "";
    if (question.ruleIndex !== undefined) {
      tip = current.lesson.rules[question.ruleIndex][1];
    } else if (verb) {
      tip = question.auxiliary ?
        courseText("Если рассказываешь о прошлом, скажи «#1».", question.subject + " " + question.auxiliary + " … " + verb.participle) :
        courseText("С «#1» говорим «#2».", question.subject, question.subject + " " + question.verbForm);
    }
    if (result.compare) {
      return '<div class="polyglot-feedback" tabindex="-1"><strong>Сравни с образцом</strong>' + ownAnswer +
        '<p>Образец <span lang="de">' + escapeHTML(reference) + '</span></p>' +
        '<p>Проверь смысл и форму, которую тренирует задание.</p></div><div class="polyglot-actions">' +
        '<button type="button" class="primary" data-polyglot="accept-translation">Мой вариант подходит</button>' +
        '<button type="button" data-polyglot="review-translation">Дать новый пример</button>' + reviewLink + '</div>';
    }
    return '<div class="polyglot-feedback ' + (result.correct ? "feedback-correct" : "polyglot-incorrect") + '" role="status" tabindex="-1">' +
      '<strong>' + (result.selfChecked ? "Зачтено после сверки" : result.correct ? "Верно" : "Разберём ошибку") + '</strong>' + ownAnswer +
      '<p>Ответ: <span lang="' + language + '">' + escapeHTML(reference) + "</span></p>" +
      (result.correct || !tip ? "" : '<p class="muted">' + escapeHTML(tip) + "</p>") +
      (active.correction === undefined ? "" : '<p>' + (active.correction ? "Исправленный ответ верный." : "Исправленный ответ пока неверный.") + "</p>") +
      '<p class="muted">' + (result.gained ? "Освоение выросло до " + percent + "%." : "Освоение осталось на " + percent + "%.") +
      (!result.correct && (current.mastery.earned[question.skill]?.length ?? 0) < 2 ? " Новый пример на этот навык появится позже." : "") + '</p></div>' +
      '<div class="polyglot-actions">' + (passed ? onwardLink() : "") +
      '<button ' + (passed ? "" : 'class="primary" ') + 'type="button" data-polyglot="advance">' +
      (percent === 100 ? "Посмотреть итог" : passed ? "Продолжить практику" : "Дальше") + "</button>" +
      (result.correct ? "" : (active.correction ? "" : '<button type="button" data-polyglot="correct">Исправить ответ</button>') + reviewLink) + "</div>";
  }

  function updateWords(button, action) {
    const chosen = Number(button.dataset.index);
    if (action === "add") current.selected.push(chosen);
    else current.selected = current.selected.filter(index => index !== chosen);
    if (!saveDraft("")) return;
    root.querySelector(".word-tray").innerHTML = trayButtons();
    for (const token of root.querySelectorAll('[data-polyglot="add"]')) {
      token.disabled = current.selected.includes(Number(token.dataset.index));
    }
    root.querySelector('[type="submit"]').disabled = current.selected.length !== current.tokenCount;
    const focus = action === "remove" ? '[data-polyglot="add"][data-index="' + chosen + '"]' :
      current.selected.length === current.tokenCount ? '[type="submit"]' : '.word-bank button:not(:disabled)';
    root.querySelector(focus)?.focus();
  }

  function saveDraft(input) {
    return updateMastery(mastery => {
      mastery.active.draft = { input, options: current.options, selected: [...current.selected] };
    });
  }

  function matchesAnswer(question, answer) {
    if (question.type !== "type") return normalizeAnswer(answer) === normalizeAnswer(question.answer);
    const model = normalizeGermanWriting(question.answer);
    const written = normalizeGermanWriting(answer);
    const variants = (question.variants ?? []).map(normalizeGermanWriting);
    return written === model || variants.includes(written) ||
      (/\b(?:lerne|lernst|lernt|lernen) Deutsch\b/u.test(model) &&
        written === model.replace(/\bDeutsch\b/u, "die deutsche Sprache"));
  }

  function recordAnswer(mastery, answer, correct, selfChecked = false) {
    const gained = recordAttempt(mastery, current.question, correct);
    mastery.active.feedback = { answer, correct, gained, selfChecked };
    delete mastery.active.draft;
  }

  function focusQuestion() {
    root.querySelector("h2[tabindex]")?.focus();
  }

  root.addEventListener("input", event => {
    const input = event.target;
    if (input.name !== "answer" || !input.form) return;
    input.form.querySelector('[type="submit"]').disabled = !input.value.trim();
    saveDraft(input.value);
  });

  root.addEventListener("toggle", event => {
    if (event.target.matches(".polyglot-skills") && event.target.isConnected) current.skillsOpen = event.target.open;
  }, true);

  root.addEventListener("submit", event => {
    const active = current?.mastery?.active;
    if (current?.section !== "practice" || !active || (active.feedback && !current.correcting)) return;
    event.preventDefault();
    const { question } = current;
    const input = new FormData(event.target).get("answer");
    const answer = question.type === "build" ? current.selected.map(index => current.options[index]).join(" ") :
      question.type === "choice" ? input === null ? "" : current.options[Number(input)] : input?.trim();
    if (!answer || (question.type === "build" && current.selected.length !== current.tokenCount)) return;
    const correct = question.type === "choice" ? answer === question.answer : matchesAnswer(question, answer);
    if (current.correcting) {
      current.correcting = false;
      if (!updateMastery(mastery => {
        mastery.active.correction = correct;
        delete mastery.active.editing;
        delete mastery.active.draft;
      })) return;
      renderPractice();
      root.querySelector('[data-polyglot="advance"]')?.focus();
      return;
    }
    if (!updateMastery(mastery => {
      if (question.type === "type" && !correct) mastery.active.feedback = { answer, correct, compare: true };
      else recordAnswer(mastery, answer, correct);
    })) return;
    renderPractice();
    root.querySelector(".polyglot-feedback")?.focus();
  });

  root.addEventListener("click", event => {
    const button = event.target.closest("button[data-polyglot]");
    if (!button) return;
    const action = button.dataset.polyglot;
    switch (action) {
      case "speak": {
        playGermanSpeech(button.dataset.text, button.closest("li, .panel").querySelector(".polyglot-audio-status"));
        break;
      }
      case "cards-de":
      case "cards-ru":
        saveDeck({ order: shuffleItems(current.bank.words.map((_, index) => index)), index: 0, reverse: action === "cards-ru", revealed: false });
        root.querySelector('[data-polyglot="reveal"]')?.focus();
        break;
      case "reveal":
        current.deck.revealed = true;
        saveDeck(current.deck);
        root.querySelector('[data-polyglot="next-card"]')?.focus();
        break;
      case "next-card":
        current.deck.index++;
        current.deck.revealed = false;
        saveDeck(current.deck.index === current.deck.order.length ? null : current.deck);
        root.querySelector('[data-polyglot="reveal"], [data-polyglot="cards-de"]')?.focus();
        break;
      case "word-list":
        current.deck = null;
        renderWords();
        root.querySelector('[data-polyglot="resume-cards"]')?.focus();
        break;
      case "resume-cards":
        current.deck = getProgress(current.id).deck;
        renderWords();
        root.querySelector('[data-polyglot="reveal"], [data-polyglot="next-card"]')?.focus();
        break;
      case "theory-topic": {
        const heading = document.getElementById("polyglot-topic-" + button.dataset.index);
        heading?.focus();
        break;
      }
      case "final-mark": {
        const progress = getProgress("final");
        const marks = progress.marks ?? {};
        const { index, mark } = button.dataset;
        if (marks[index] === mark) delete marks[index];
        else marks[index] = mark;
        saveProgress("final", { ...progress, marks });
        for (const control of button.parentElement.querySelectorAll("button")) {
          control.setAttribute("aria-pressed", control.dataset.mark === marks[index]);
        }
        root.querySelector("#polyglot-final-summary").textContent = finalSummary(marks);
        break;
      }
      case "start":
        startPractice();
        break;
      case "add":
      case "remove":
        updateWords(button, action);
        break;
      case "correct":
        current.selected = [];
        if (!updateMastery(mastery => {
          mastery.active.editing = true;
          delete mastery.active.draft;
        })) return;
        renderPractice();
        focusQuestion();
        break;
      case "accept-translation":
      case "review-translation":
        if (!current.mastery?.active?.feedback?.compare || !updateMastery(mastery => {
          const accepted = action === "accept-translation";
          recordAnswer(mastery, mastery.active.feedback.answer, accepted, accepted);
        })) return;
        renderPractice();
        root.querySelector(".polyglot-feedback")?.focus();
        break;
      case "advance":
        if (!current.mastery?.active?.feedback || !updateMastery(chooseActive)) return;
        renderPractice();
        focusQuestion();
        break;
    }
  });

  window.addEventListener("storage", event => {
    if (root.hidden || !event.key?.startsWith(keyPrefix)) return;
    if (!current.id) render(current.hero, current.target, current.tab, false, current.context);
    else if (current.section === "practice" && event.key === keyPrefix + current.id) renderPractice();
  });

  return { render };
})();
