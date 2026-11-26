"use strict";

const grammarCourse = (() => {
  const base = "#grammar-course";
  const storageKey = "deutsch-grammar.v1";
  const view = document.getElementById("grammar-view");
  const showOriginals = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const questionsByLesson = grammarLessons.map((lesson, index) => {
    const [prompt, answer] = grammarTranslations[index];
    return [...lesson.questions, { type: "translate", prompt, answers: [answer], note: lesson.rule }];
  });
  const moduleTopics = [
    [[3], [4, 5], [6], [7], [8]],
    [[11, 17], [13, 14, 16], [12, 15, 18]],
    [[19, 24], [20, 21, 22], [23, 25]],
    [[26, 27, 28, 29, 33, 34, 35], [31, 32], [30]],
    [[36, 42], [37, 46], [43, 44], [41, 45], [38, 39, 42], [37, 39]]
  ];
  const banks = new Map();
  const governmentTopics = ["Базовые сочетания и прямое дополнение", "Работа, эмоции и планы", "Общение, просьбы и заявления", "Состояния и признаки"];
  let state = { practice: {}, completed: {}, tests: {}, resume: null };
  let storageUnavailable = false;
  let screen;
  let confirmTest = false;
  let searchQuery = "";
  let searchResult = "";
  let confirmRestart = false;

  let storedProgress;
  try {
    storedProgress = localStorage.getItem(storageKey);
  } catch {
    storageUnavailable = true;
  }
  if (storedProgress) {
    try {
      const saved = JSON.parse(storedProgress);
      if (saved?.practice && saved.completed && saved.tests) state = saved;
    } catch {
      // An unreadable saved value can be replaced by a fresh attempt.
    }
  }

  function save() {
    if (!storageUnavailable) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        storageUnavailable = true;
      }
    }
    const warning = view.querySelector(".grammar-storage");
    if (warning) warning.hidden = !storageUnavailable;
  }

  function route(section, topic, context) {
    return [base, section, topic, context].filter(Boolean).join("/");
  }

  function attr(value) {
    return escapeHTML(String(value)).replace(/"/g, "&quot;");
  }

  function sourceURL(path) {
    return "./" + path.split("/").map(encodeURIComponent).join("/");
  }

  function sourceLink(path, label) {
    return `<a class="theory-link" href="${attr(sourceURL(path))}" target="_blank" rel="noopener">${escapeHTML(label)}</a>`;
  }

  function internalLink(href, title, primary = false) {
    return `<a class="button${primary ? " primary" : ""}" href="${href}">${escapeHTML(title)}</a>`;
  }

  function title(hero, text, parent, context = "") {
    hero.innerHTML = pageNavigation(
      parent ? base : "#home",
      parent ? "Оглавление курса" : "Все разделы"
    ) + (context ? `<p class="page-context">${escapeHTML(context)}</p>` : "") +
      `<h1 id="grammar-title">${escapeHTML(text)}</h1>`;
  }

  function setContent(html) {
    view.innerHTML = html + `<p class="grammar-storage muted" role="status" ${storageUnavailable ? "" : "hidden"}>
      Браузер не сохраняет прогресс. Текущая попытка доступна до закрытия страницы.</p>`;
  }

  function focus(selector) {
    view.querySelector(selector)?.focus({ preventScroll: true });
  }

  function resumeLink() {
    const item = state.resume;
    if (item?.test && grammarModules[item.test - 1]) {
      const draft = state.tests[item.test];
      const label = draft?.submitted ? "Открыть разбор" :
        draft?.started || draft?.index || Object.keys(draft?.values ?? {}).length ? "Продолжить тест" : "Начать тест";
      return [route("test", item.test), `${label} · ${grammarModules[item.test - 1].test}`];
    }
    const lesson = grammarLessons[item?.lesson - 1];
    if (lesson) {
      const result = lessonResult(lesson.id);
      const draft = state.practice[lesson.id];
      if (draft && draft.index < (draft.queue?.length ?? questionsByLesson[lesson.id - 1].length) &&
          (draft.index || draft.value || draft.selected.length)) {
        return [route(lesson.id, "practice"), `Продолжить практику · урок ${lesson.id}`];
      }
      if (result) {
        if (result.correct < result.total) return [route(lesson.id, "practice"), `Повторить · урок ${lesson.id}`];
        return nextLesson(lesson.id);
      }
      return [route(lesson.id, item.mode), `Продолжить · урок ${lesson.id}`];
    }
    return [route(1), "Начать с урока 1"];
  }

  function lessonResult(id) {
    const draft = state.practice[id];
    return state.lessonResults?.[id] ?? (draft?.index === questionsByLesson[id - 1].length
      ? { correct: draft.correct, total: draft.index } : null);
  }

  function renderHub() {
    const [href, label] = resumeLink();
    const done = grammarLessons.filter(lesson => {
      const result = lessonResult(lesson.id);
      return result && result.correct === result.total;
    }).length;
    setContent(`<div class="grammar-hub-actions">
      ${internalLink(href, label, true)}
    </div>
    <label for="grammar-search">Поиск по курсу</label>
    <input id="grammar-search" type="search" value="${attr(searchQuery)}" placeholder="Например, Perfekt или падежи" autocomplete="off">
    <p id="grammar-search-status" class="muted grammar-search-status" role="status" hidden></p>
    <div id="grammar-search-results" class="panel grammar-module" hidden></div>
    <div class="course-progress"><span>Уроков закреплено</span><strong>${done} из ${grammarLessons.length}</strong></div>
    <div class="grammar-modules">${grammarModules.map((module, index) => {
      const open = state.resume?.test === index + 1 ||
        (state.resume?.lesson >= module.first && state.resume.lesson <= module.last) ||
        (!state.resume && index === 0);
      const lessons = grammarLessons.slice(module.first - 1, module.last);
      const checkpoint = state.tests[index + 1];
      return `<details class="grammar-module panel" ${open ? "open" : ""} data-default-open="${open}">
        <summary><span>${escapeHTML(module.title)}</span><small>Уроки ${module.first}–${module.last}</small></summary>
        <div>${lessons.map(lesson => {
          const result = lessonResult(lesson.id);
          const status = result ? result.correct === result.total ? "Закреплён" : `${result.correct} из ${result.total} · повторить`
            : state.practice[lesson.id]?.index ? "Начат" : state.completed[lesson.id] ? "Практика выполнена" : "";
          return `<a class="grammar-row" href="${route(lesson.id)}" data-lesson="${lesson.id}"
          data-title="${attr(courseText(lesson.title))}" data-search="${attr([String(lesson.id), lesson.title, lesson.rule, lesson.example, module.title].map(part => courseText(part)).join(" "))}">
          <span class="grammar-number">${lesson.id}</span><span>${escapeHTML(lesson.title)}</span>
          ${status ? `<small class="grammar-complete">${status}</small>` : ""}</a>`; }).join("")}
          <a class="grammar-row grammar-checkpoint" data-search="${attr(courseText(module.test))}" href="${route("test", index + 1)}">
            <span class="grammar-test-dot ${module.color}" aria-hidden="true"></span><strong>${escapeHTML(module.test)}</strong>
            ${checkpoint?.submitted || checkpoint?.started || Object.keys(checkpoint?.values ?? {}).length
              ? `<small>${checkpoint.submitted ? "Есть разбор" : "Начат"}</small>` : ""}</a>
        </div>
      </details>`;
    }).join("")}</div><section class="grammar-subnav grammar-resources" aria-label="Справочники">
    <h2>Справочники</h2><div class="actions">${internalLink(route("verbs"), "Неправильные глаголы")}
    ${internalLink(route("government"), "Управление глаголов")}</div></section>
    ${showOriginals ? recordings(grammarSources.tracks[0], "Введение и организационные записи") : ""}`);
    filterLessons(searchQuery);
    if (searchQuery && searchResult) {
      view.querySelector(`#grammar-search-results [data-lesson="${searchResult}"]`)?.setAttribute("data-route-focus", "");
      searchResult = "";
    }
  }

  function recordings(tracks, heading) {
    return `<details class="panel grammar-recordings">
      <summary>${escapeHTML(heading)} <small>${tracks.length} аудио</small></summary>
      <ol>${tracks.map(([number, name, path]) => `<li value="${number}">
        <span id="grammar-track-${number}">${escapeHTML(name)}</span>
        <audio controls preload="none" aria-labelledby="grammar-track-${number}" src="${attr(sourceURL(path))}"></audio>
      </li>`).join("")}</ol>
    </details>`;
  }

  function lessonOriginals(lesson) {
    const [pdf, key] = grammarSources.lessons[lesson.id - 1];
    return `<details class="panel grammar-originals"><summary>Исходные материалы</summary>
      ${sourceLink(pdf, "Открыть конспект и задания PDF")}
      ${key ? sourceLink(key, "Открыть ключ к исходным заданиям") : ""}
    </details>`;
  }

  function lessonTabs(lesson, mode) {
    const tabs = [["theory", "Теория"], ["practice", "Практика"]];
    if (showOriginals && lesson.id <= 5) tabs.push(["audio", "Аудиозаписи"]);
    return `<nav class="tabs grammar-tabs" aria-label="Разделы урока">${tabs.map(([id, label]) =>
      `<a href="${route(lesson.id, id, screen.reviewRef)}"${id === mode ? ' aria-current="page"' : ""}>${label}</a>`
    ).join("")}</nav>`;
  }

  function lessonLinks(lesson) {
    if (lesson.id === 38) return internalLink(route("government"), "Тренажёр управления");
    if ([27, 28, 29].includes(lesson.id)) return internalLink(route("verbs"), "Справочник глаголов");
    return "";
  }

  function renderLesson() {
    const { lesson, mode } = screen;
    const review = reviewReference(screen.reviewRef);
    const back = review ? `<div class="grammar-subnav">${internalLink(route("test", review.test, review.context), "Вернуться к ответу в тесте")}</div>` : "";
    const defaultActions = `<div class="actions">
      ${internalLink(route(lesson.id, "practice", screen.reviewRef), "Потренировать тему", true)}${lessonLinks(lesson)}
    </div>`;
    const tracks = grammarSources.tracks[lesson.id];
    const translations = grammarExampleTranslations[lesson.id - 1];
    const examples = lesson.example.split(/ · |(?<=[.!?]) /u);
    let content = `<article class="panel grammar-theory"><h2>Правило</h2>
      <p>${escapeHTML(lesson.rule)}</p>
      <h3 class="grammar-example-heading">Примеры</h3>
      <dl class="example grammar-example-pairs">${examples.map((example, index) =>
        `<div><dt lang="de">${escapeHTML(example)}</dt><dd>${escapeHTML(translations[index])}</dd></div>`).join("")}</dl>
      ${lesson.id <= 5 ? '<p class="muted grammar-audio-note">В практике есть задание с голосом браузера и текстом фразы.</p>' : ""}
      ${defaultActions}</article>
      ${showOriginals ? lessonOriginals(lesson) : ""}`;
    if (mode === "practice") content = renderPractice();
    if (mode === "audio") content = recordings(tracks, "Записи к уроку");
    setContent(back + lessonTabs(lesson, mode) + content);
    if (mode === "audio") view.querySelector(".grammar-recordings").open = true;
  }

  function makePractice() {
    return { index: 0, value: "", selected: [], verdict: "", correct: 0 };
  }

  function practice() {
    if (screen.lesson) {
      return {
        id: String(screen.lesson.id),
        questions: state.practice[screen.lesson.id]?.queue?.map(index => questionsByLesson[screen.lesson.id - 1][index]) ??
          questionsByLesson[screen.lesson.id - 1],
        next: nextLesson(screen.lesson.id)
      };
    }
    return {
      id: `government-${screen.part}`, questions: grammarGovernment[screen.part - 1],
      next: screen.part < grammarGovernment.length
        ? [route("government", screen.part + 1), `Перейти к части ${screen.part + 1}`]
        : [route("government"), "К списку частей"]
    };
  }

  function nextLesson(id) {
    const checkpoint = grammarModules.findIndex(module => module.last === id);
    return checkpoint >= 0
      ? [route("test", checkpoint + 1), `Пройти ${grammarModules[checkpoint].test.toLowerCase()}`]
      : [route(id + 1), "К следующему уроку"];
  }

  function practiceDraft(id) {
    return state.practice[id] ??= makePractice();
  }

  function tokens(question) {
    if (!banks.has(question)) {
      const words = question.answers[0].split(/\s+/);
      const ordered = words.map((word, id) => ({ word, id }));
      const bank = shuffle(ordered);
      if (bank.every((item, index) => item.word === ordered[index].word)) bank.push(bank.shift());
      banks.set(question, bank);
    }
    return banks.get(question);
  }

  function lookupToken(question, id) {
    return tokens(question).find(token => token.id === id);
  }

  function orderForm(question, draft) {
    const selected = draft.selected.map(id => lookupToken(question, id)).filter(Boolean);
    return `<div class="word-tray" aria-label="Собранное предложение">
        ${selected.map(({ id, word }) => `<button type="button" data-g-action="remove" data-index="${id}" lang="de" aria-label="${attr(courseText("Убрать #1", word))}">${escapeHTML(word)}</button>`).join("") ||
        '<small>Нажимай на слова в нужном порядке.</small>'}</div>
      <div class="word-bank" aria-label="Слова для сборки">
        ${tokens(question).map(({ id, word }) => `<button type="button" data-g-action="add" data-index="${id}" lang="de"
          ${draft.selected.includes(id) ? "disabled" : ""}>${escapeHTML(word)}</button>`).join("")}
      </div>`;
  }

  function practiceField(question, draft) {
    if (question.type === "order") return orderForm(question, draft);
    if (question.type === "listen") {
      return `<div class="exercise-audio">
        <button type="button" class="audio-play" data-g-action="listen">Воспроизвести</button>
        <button type="button" class="audio-skip" data-g-action="transcript" aria-expanded="${Boolean(draft.transcript)}">${draft.transcript ? "Скрыть фразу" : "Показать фразу"}</button>
        <p class="muted" id="grammar-audio-status" role="status"></p>
        ${draft.transcript ? `<p lang="de">${escapeHTML(question.audio)}</p>` : ""}
      </div>
      <div class="choices" role="group" aria-label="Варианты ответа">${question.options.map(option => `<label class="choice"><input
        type="radio" name="grammar-answer" value="${attr(option)}" ${draft.value === option ? "checked" : ""} required>
        <span>${escapeHTML(option)}</span></label>`).join("")}</div>`;
    }
    const field = 'id="grammar-answer" name="grammar-answer" lang="de" autocomplete="off" spellcheck="false" required';
    return `<label for="grammar-answer" class="sr-only">Ответ по-немецки</label>${question.type === "translate"
      ? `<p class="muted" id="grammar-writing-tip">Проверь заглавные буквы и знаки препинания.</p><textarea ${field} aria-describedby="grammar-writing-tip" rows="3">${escapeHTML(draft.value)}</textarea>`
      : `<input ${field} type="text" value="${attr(draft.value)}">`}`;
  }

  function renderPractice() {
    const { id, questions, next } = practice();
    const draft = practiceDraft(id);
    const progress = `<div class="practice-progress"><span>Задание ${Math.min(draft.index + 1, questions.length)} из ${questions.length}</span>
      <progress max="${questions.length}" value="${Math.min(draft.index, questions.length)}" aria-label="Прогресс практики"></progress></div>`;
    if (draft.index >= questions.length) {
      const result = screen.lesson ? lessonResult(screen.lesson.id) : null;
      const needsReview = result ? result.correct < result.total : draft.correct < questions.length;
      const retry = `<button type="button"${needsReview ? ' class="primary"' : ""} data-g-action="restart-practice">${needsReview ? "Повторить ошибки" : "Повторить практику"}</button>`;
      return `<section class="panel grammar-finish"><h2 tabindex="-1">Практика завершена</h2>
        <p>Зачтено ${result?.correct ?? draft.correct} из ${result?.total ?? questions.length}.</p>
        <div class="actions">${needsReview ? retry : ""}${internalLink(next[0], next[1], !needsReview)}${needsReview ? "" : retry}</div>
      </section>`;
    }
    const question = questions[draft.index];
    const promptLabels = { gap: "Впиши ответ", order: "Собери предложение", translate: "Напиши по-немецки", listen: "Аудирование" };
    const feedback = renderPracticeFeedback(question, draft);
    return `${progress}<section class="panel exercise-panel grammar-exercise">
      <div><p class="muted">${promptLabels[question.type]}</p>
      <h2 class="exercise-question" id="grammar-question" tabindex="-1">${escapeHTML(question.prompt)}</h2></div>
      ${feedback || `<form data-g-form="practice" aria-labelledby="grammar-question">
        ${practiceField(question, draft)}
        <div class="actions"><button type="submit" class="primary"
        ${question.type === "order" && draft.selected.length !== tokens(question).length ? "disabled" : ""}>
          ${question.type === "translate" ? "Открыть образец" : "Проверить"}
        </button></div>
      </form>`}
    </section>`;
  }

  function renderPracticeFeedback(question, draft) {
    if (!draft.verdict) return "";
    const isWrong = draft.verdict === "retry";
    const compare = draft.verdict === "compare";
    const revealed = draft.verdict === "revealed";
    const status = isWrong ? "Попробуй ещё раз" : compare ? "Сравни с образцом" : revealed ? "Образец ответа" : "Верно";
    const note = question.note ?? (isWrong ? screen.lesson.rule : "");
    return `<div class="grammar-feedback ${draft.verdict}" tabindex="-1" role="status">
      <strong>${status}</strong>
      <p>Твой ответ <span ${question.type === "listen" ? `lang="${courseLanguage}"` : 'lang="de" data-user-text'}>${escapeHTML(draft.value)}</span></p>
      ${isWrong ? "" : `<p>Образец <span lang="${question.type === "listen" ? courseLanguage : "de"}">${question.answers.map(answer => escapeHTML(courseText(answer))).join(" / ")}</span></p>`}
      ${note ? `<p>${escapeHTML(note)}</p>` : ""}
    </div>
    <div class="actions">${isWrong
      ? '<button type="button" class="primary" data-g-action="retry">Исправить ответ</button><button type="button" data-g-action="reveal">Показать ответ</button>'
      : compare
        ? '<button type="button" class="primary" data-g-action="accept">Мой ответ подходит</button><button type="button" data-g-action="retry">Исправить ответ</button><button type="button" data-g-action="next-practice">Дальше</button>'
        : '<button type="button" class="primary" data-g-action="next-practice">Дальше</button>'}
    </div>`;
  }

  function renderGovernment() {
    if (screen.part) {
      const original = grammarSources.government[screen.part - 1];
      const links = showOriginals ? `<details class="panel grammar-originals"><summary>Исходные задания</summary>
        ${sourceLink(original[0], "Открыть задания DOCX")}${sourceLink(original[1], "Открыть ключ DOCX")}</details>` : "";
      setContent(`<div class="grammar-subnav"><a class="home-link" href="${route("government")}">Все части</a></div>${renderPractice()}${links}`);
      return;
    }
    setContent(`<p class="muted">Подставь предлог, артикль или местоимение в нужном падеже.</p>
      <div class="stack grammar-government">${grammarGovernment.map((questions, index) => {
        const draft = state.practice[`government-${index + 1}`];
        return `<a class="destination" href="${route("government", index + 1)}">
          <span><strong>${governmentTopics[index]}</strong><small>${questions.length} заданий</small></span>
          ${draft?.index >= questions.length ? `<small>${draft.correct} из ${questions.length}</small>` :
            draft?.index ? `<small>Задание ${draft.index + 1}</small>` : '<span class="menu-arrow" aria-hidden="true"></span>'}
        </a>`;
      }).join("")}</div>
      <a class="theory-link" href="${route(38)}">Правило из урока 38</a>`);
  }

  function renderVerbs() {
    setContent(`<div class="grammar-verb-filters">
      <div><label for="grammar-verb-search">Найти глагол или форму</label>
      <input id="grammar-verb-search" type="search" placeholder="Например, gehen или шёл" autocomplete="off"></div>
      <div><label for="grammar-verb-list">Список</label>
      <select id="grammar-verb-list"><option value="all">Все глаголы</option><option value="basic">Основные</option></select></div>
    </div>
    <p class="muted grammar-search-status" id="grammar-verb-count" role="status"></p>
    <div class="grammar-wrap" tabindex="0" aria-label="Таблица неправильных глаголов">
      <table class="grammar grammar-verbs"><thead><tr>
        <th scope="col">Infinitiv</th><th scope="col">Präteritum</th><th scope="col">Partizip II</th><th scope="col">Перевод</th>
      </tr></thead><tbody></tbody></table>
    </div>
    <ul class="grammar-verb-cards"></ul>
    <div class="actions">${[27, 28, 29].map(id => internalLink(route(id), `Урок ${id}`)).join("")}</div>
    ${showOriginals ? `<details class="panel grammar-originals"><summary>Исходные списки</summary>
      ${sourceLink(grammarSources.verbs[1], "Основной список PDF")}
      ${sourceLink(grammarSources.verbs[0], "Расширенный список PDF")}</details>` : ""}`);
    filterVerbs();
  }

  function searchForm(value) {
    return normalize(value).replace(/ё/g, "е");
  }

  function filterVerbs() {
    const words = searchForm(view.querySelector("#grammar-verb-search").value).split(" ").filter(Boolean);
    const basic = view.querySelector("#grammar-verb-list").value === "basic";
    const rows = grammarIrregular.filter(([infinitive, past, participle, translation, isBasic]) => {
      const search = searchForm([infinitive, past, participle, courseText(translation)].join(" "));
      return (!basic || isBasic) && words.every(word => search.includes(word));
    });
    view.querySelector("#grammar-verb-count").textContent = `Найдено ${rows.length} форм`;
    view.querySelector("tbody").innerHTML = rows.map(([infinitive, past, participle, translation]) =>
      `<tr><th scope="row" lang="de">${escapeHTML(infinitive)}</th><td lang="de">${escapeHTML(past)}</td>
        <td lang="de">${escapeHTML(participle)}</td><td>${escapeHTML(translation)}</td></tr>`
    ).join("");
    view.querySelector(".grammar-verb-cards").innerHTML = rows.map(([infinitive, past, participle, translation]) =>
      `<li class="panel"><h2 lang="de">${escapeHTML(infinitive)}</h2><p>${escapeHTML(translation)}</p>
      <dl><div><dt>Präteritum</dt><dd lang="de">${escapeHTML(past)}</dd></div>
      <div><dt>Partizip II</dt><dd lang="de">${escapeHTML(participle)}</dd></div></dl></li>`
    ).join("");
  }

  function filterLessons(value) {
    const words = searchForm(value).split(" ").filter(Boolean);
    const searching = words.length > 0;
    const modules = view.querySelector(".grammar-modules");
    const matches = searching ? [...modules.querySelectorAll("[data-search]")]
      .filter(row => words.every(word => searchForm(row.dataset.search).includes(word)))
      .map(row => ({ row, titleMatch: words.every(word => searchForm(row.dataset.title ?? row.dataset.search).includes(word)) }))
      .sort((left, right) => Number(right.titleMatch) - Number(left.titleMatch)) : [];
    const results = view.querySelector("#grammar-search-results");
    modules.hidden = searching;
    view.querySelector(".course-progress").hidden = searching;
    results.hidden = !matches.length;
    results.replaceChildren(...matches.map(({ row, titleMatch }) => {
      const result = row.cloneNode(true);
      if (row.dataset.lesson) {
        result.href = route(row.dataset.lesson, "theory", "lookup");
        result.querySelector("small")?.remove();
        const detail = document.createElement("small");
        detail.textContent = titleMatch ? "Тема урока" : "Упоминается в уроке";
        result.append(detail);
      }
      return result;
    }));
    const status = view.querySelector("#grammar-search-status");
    status.hidden = !searching;
    status.textContent = matches.length ? `Найдено ${matches.length}` : "Ничего не найдено. Попробуй другое слово.";
  }

  function makeAttempt() {
    return { index: 0, values: {}, marks: {}, submitted: false };
  }

  function attempt() {
    return state.tests[screen.test] ??= makeAttempt();
  }

  function testHistory() {
    const history = state.testHistory?.[screen.test] ?? [];
    if (!history.length) return "";
    return `<details class="panel grammar-history"><summary>Предыдущие попытки</summary><ul>${
      history.map((entry, index) => `<li><a class="theory-link" href="${route("test", screen.test, `history-${index + 1}`)}">
        Попытка ${index + 1} · ${escapeHTML(new Date(entry.savedAt).toLocaleDateString(courseLanguage === "uk" ? "uk-UA" : "ru-RU"))}</a></li>`).reverse().join("")
    }</ul></details>`;
  }

  function reviewReference(value) {
    const match = /^([1-5])\.(\d+)\.(\d+)$/.exec(value ?? "");
    if (!match) return null;
    const [, test, archive, index] = match.map(Number);
    if (index < 1 || index > grammarTests[test - 1].length) return null;
    return { test, context: archive ? `history-${archive}-${index}` : `review-${index}` };
  }

  function testTopics(group, index) {
    const ref = `${screen.test}.${screen.archive ?? 0}.${index + 1}`;
    return moduleTopics[screen.test - 1][group - 1].map(id =>
      `<a href="${route(id, "theory", ref)}">${escapeHTML(grammarLessons[id - 1].title)}</a>`
    ).join(", ");
  }

  function testResult(index, answers, draft) {
    if (!draft.values[index]?.trim()) return "blank";
    if (Object.hasOwn(draft.marks, index)) return draft.marks[index] ? "accepted" : "review";
    return answers.some(answer => normalizeGermanWriting(answer) === normalizeGermanWriting(draft.values[index])) ? "matched" : "compare";
  }

  function renderTest() {
    const tasks = grammarTests[screen.test - 1];
    const draft = attempt();
    if (screen.archive) {
      renderTestResults(tasks, state.testHistory[screen.test][screen.archive - 1].draft);
      return;
    }
    const count = tasks.filter((_, index) => draft.values[index]?.trim()).length;
    if (draft.submitted) {
      renderTestResults(tasks, draft);
      return;
    }
    if (!draft.started && !count && !draft.index) {
      setContent(`<section class="panel grammar-result"><h2>Перед началом</h2>
        <p>${tasks.length} заданий на перевод. Можно отвечать в любом порядке и делать перерывы. Черновик сохраняется в этом браузере.</p>
        <p>После сдачи сайт покажет образцы. Переводы, которые отличаются от образца, можно сверить самостоятельно.</p>
        <div class="actions"><button type="button" class="primary" data-g-action="start-test">Начать тест</button></div></section>${testHistory()}`);
      return;
    }
    const [group, prompt] = tasks[draft.index];
    const timeInstruction = screen.test === 2 && group === 2 && draft.index < 24
      ? "<p>Для времени используй Viertel, nach или vor, где это подходит. Числа пиши словами.</p>" : "";
    setContent(`<div class="practice-progress grammar-test-progress">
      <span id="grammar-answer-count">Ответов ${count} из ${tasks.length}</span>
      <div class="grammar-test-jump"><label for="grammar-test-question">Задание</label>
      <select id="grammar-test-question">${tasks.map((_, index) => `<option value="${index}"
        ${index === draft.index ? "selected" : ""}>${index + 1} из ${tasks.length} · ${draft.values[index]?.trim() ? "отвечено" : "без ответа"}</option>`).join("")}</select></div>
    </div>
    <section class="panel exercise-panel grammar-exercise">
      <div><p class="muted">Переведи на немецкий</p><h2 id="grammar-question" class="exercise-question" tabindex="-1">${escapeHTML(prompt)}</h2>${timeInstruction}</div>
      <div><p class="muted" id="grammar-test-writing-tip">Проверь заглавные буквы и знаки препинания.</p>
        <label class="sr-only" for="grammar-test-answer">Твой перевод</label>
        <textarea id="grammar-test-answer" rows="4" lang="de" spellcheck="false" aria-describedby="grammar-test-writing-tip">${escapeHTML(draft.values[draft.index] ?? "")}</textarea></div>
      <div class="actions">
        <button type="button" data-g-action="test-previous" ${draft.index === 0 ? "disabled" : ""}>Назад</button>
        <button type="button" class="primary" data-g-action="test-next" ${draft.index + 1 === tasks.length ? "disabled" : ""}>Следующее</button>
      </div>
    </section>
    <p class="muted grammar-autosave">${storageUnavailable ? "Ответы сохраняются до закрытия страницы." : "Ответы сохраняются автоматически в этом браузере."}</p>
    <div class="actions"><button type="button" data-g-action="submit-test">Сдать тест</button>
      <button type="button" data-g-action="next-blank" ${count === tasks.length ? "hidden" : ""}>К заданию без ответа</button></div>
    ${confirmTest ? `<section class="panel grammar-confirm" aria-label="Подтверждение сдачи">
      <p>Осталось без ответа ${tasks.length - count}. Сдать тест с пропусками?</p>
      <div class="actions"><button type="button" class="primary" data-g-action="finish-test">Сдать с пропусками</button>
      <button type="button" data-g-action="keep-test">Продолжить тест</button></div></section>` : ""}${testHistory()}`);
  }

  function renderTestResults(tasks, draft) {
    const states = tasks.map(([, , answers], index) => testResult(index, answers, draft));
    const matched = states.filter(result => ["matched", "accepted"].includes(result)).length;
    const pending = states.filter(result => result === "compare").length;
    const review = states.filter(result => result === "review").length;
    const blanks = states.filter(result => result === "blank").length;
    const filter = screen.filter ?? (screen.reviewIndex >= 0 ? "all" : pending ? "compare" : review ? "review" : blanks ? "blank" : "all");
    screen.filter = filter;
    const topics = new Map();
    if (filter === "review") {
      states.forEach((result, index) => {
        if (result !== "review") return;
        for (const lesson of moduleTopics[screen.test - 1][tasks[index][0] - 1]) {
          if (!topics.has(lesson)) topics.set(lesson, index + 1);
        }
      });
    }
    const labels = { blank: "Пропущено", matched: "Совпадает с образцом", accepted: "Зачтено", review: "Повторить", compare: "Сверить с образцом" };
    const next = grammarModules[screen.test];
    const [original, key] = grammarSources.tests[screen.test - 1];
    setContent(`<section class="panel grammar-result">
      <h2 tabindex="-1">Разбор теста</h2>
      <p id="grammar-result-score" role="status">Зачтено ${matched} из ${tasks.length} · Сверить ${pending} · Повторить ${review} · Пропущено ${blanks}</p>
      <p>${screen.archive ? "Сохранённая попытка." : "Сравни свой ответ с образцом и отметь темы, которые нужно повторить."}</p>
      <div class="actions">
        ${screen.archive ? internalLink(route("test", screen.test), "К текущей попытке") : `
          ${pending || review || blanks ? `<button type="button" class="primary" data-g-action="review-filter"
            data-filter="${pending ? "compare" : review ? "review" : "blank"}">${pending || review ? "Разобрать ответы" : "Посмотреть пропуски"}</button>` : ""}
          ${next ? internalLink(route(next.first), "К следующему модулю", !pending && !review && !blanks) :
            internalLink(base, "К курсу", !pending && !review && !blanks)}
          <button type="button" data-g-action="restart-test">Новая попытка</button>`}
      </div>
    </section>
    ${confirmRestart ? '<section class="panel grammar-confirm"><p>Предыдущий результат останется в истории. Начать новую попытку?</p><div class="actions"><button type="button" class="primary" data-g-action="confirm-restart">Начать новую попытку</button><button type="button" data-g-action="cancel-restart">Отмена</button></div></section>' : ""}
    <div class="grammar-result-filters">
      ${[["compare", "Сверить", pending], ["review", "Повторить", review], ["blank", "Пропущено", blanks], ["all", "Все", tasks.length]].map(([id, label, count]) =>
        `<button type="button" data-g-action="review-filter" data-filter="${id}" aria-pressed="${filter === id}">${label} · ${count}</button>`).join("")}
    </div>
    ${topics.size ? `<section class="panel grammar-repeat-topics"><h2>Темы для повторения</h2><div class="actions">${
      [...topics].map(([lesson, index]) => internalLink(route(lesson, "theory", `${screen.test}.${screen.archive ?? 0}.${index}`),
        grammarLessons[lesson - 1].title)).join("")
    }</div></section>` : ""}
    <div class="grammar-review-list">${tasks.map(([group, prompt, answers], index) => filter !== "all" && filter !== states[index] ? "" : `<details class="panel grammar-review" id="grammar-review-${index}" ${screen.reviewIndex === index ? "open" : ""}>
      <summary ${screen.reviewIndex === index ? "data-route-focus" : ""}><span>${index + 1}. ${escapeHTML(prompt)}</span><small>${labels[states[index]]}</small></summary>
      <p><strong>Твой ответ</strong> <span lang="de" data-user-text>${escapeHTML(draft.values[index] || "—")}</span></p>
      <p><strong>Образец</strong> ${answers.map(answer => `<span lang="de">${escapeHTML(answer)}</span>`).join(" / ")}</p>
      ${screen.archive || ["matched", "blank"].includes(states[index]) ? "" : `<div class="actions">
        <button type="button" data-g-action="mark-test" data-index="${index}" data-verdict="accept" aria-pressed="${states[index] === "accepted"}">Мой вариант подходит</button>
        <button type="button" data-g-action="mark-test" data-index="${index}" data-verdict="review" aria-pressed="${states[index] === "review"}">Хочу повторить</button>
      </div>`}
      <p class="grammar-review-topics">Повторить тему · ${testTopics(group, index)}</p>
    </details>`).join("") || '<p class="muted">В этой группе пока нет заданий.</p>'}</div>${testHistory()}
    ${showOriginals ? `<details class="panel grammar-originals"><summary>Исходный тест и ключ</summary>
      ${sourceLink(original, "Открыть задания PDF")}${sourceLink(key, "Открыть исходный ключ")}</details>` : ""}`);
  }

  function renderCurrent() {
    if (screen.lesson) renderLesson();
    else if (screen.test) renderTest();
    else if (screen.government) renderGovernment();
    else if (screen.verbs) renderVerbs();
    else renderHub();
  }

  function close() {
    for (const audio of view.querySelectorAll("audio")) audio.pause();
    if (view.querySelector("#grammar-audio-status")) window.speechSynthesis?.cancel();
  }

  function render(hero, section, topic, context) {
    close();
    confirmTest = false;
    confirmRestart = false;
    const lesson = grammarLessons.find(row => String(row.id) === section);
    if (lesson) {
      const mode = topic === "practice" || (topic === "audio" && showOriginals && lesson.id <= 5) ? topic : "theory";
      screen = { lesson, mode, reviewRef: reviewReference(context) ? context : "" };
      const defaultMode = mode === "theory" ? "" : mode;
      if (context !== "lookup" && !screen.reviewRef) state.resume = { lesson: lesson.id, mode: defaultMode };
      title(hero, lesson.title, true, `Урок ${lesson.id} из ${grammarLessons.length}`);
      if (context === "lookup") hero.querySelector(".home-link").textContent = "К результатам поиска";
    } else if (section === "test" && ["1", "2", "3", "4", "5"].includes(topic)) {
      const test = Number(topic);
      const archiveMatch = /^history-(\d+)(?:-(\d+))?$/.exec(context ?? "");
      const archive = Number(archiveMatch?.[1]) || 0;
      const reviewIndex = Number(archiveMatch?.[2] ?? /^review-(\d+)$/.exec(context ?? "")?.[1] ?? 0) - 1;
      screen = { test, archive: state.testHistory?.[test]?.[archive - 1] ? archive : 0, reviewIndex };
      const module = grammarModules[test - 1];
      if (!screen.archive) state.resume = { test };
      title(hero, module.test, true, `После урока ${module.last}`);
    } else if (section === "government") {
      const part = ["1", "2", "3", "4"].includes(topic) ? Number(topic) : 0;
      screen = { government: true, part };
      title(hero, "Управление глаголов", true, part ? `Часть ${part}` : "");
    } else if (section === "verbs") {
      screen = { verbs: true };
      title(hero, "Неправильные глаголы", true);
    } else {
      screen = {};
      title(hero, "Грамматика с нуля", false);
    }
    renderCurrent();
    save();
  }

  view.addEventListener("play", event => {
    if (event.target.tagName !== "AUDIO") return;
    for (const audio of view.querySelectorAll("audio")) if (audio !== event.target) audio.pause();
  }, true);

  view.addEventListener("input", event => {
    const field = event.target;
    if (field.id === "grammar-search") {
      searchQuery = field.value;
      searchResult = "";
      return filterLessons(searchQuery);
    }
    if (field.id === "grammar-verb-search") return filterVerbs();
    if (field.id === "grammar-test-answer") {
      const draft = attempt();
      draft.values[draft.index] = field.value;
      const count = Object.values(draft.values).filter(value => value.trim()).length;
      view.querySelector("#grammar-answer-count").textContent = `Ответов ${count} из ${grammarTests[screen.test - 1].length}`;
      const option = view.querySelector("#grammar-test-question").options[draft.index];
      option.textContent = `${draft.index + 1} из ${grammarTests[screen.test - 1].length} · ${field.value.trim() ? "отвечено" : "без ответа"}`;
      view.querySelector('[data-g-action="next-blank"]').hidden = count === grammarTests[screen.test - 1].length;
      if (confirmTest) {
        confirmTest = false;
        view.querySelector(".grammar-confirm")?.remove();
      }
    } else if (field.name === "grammar-answer") {
      practiceDraft(practice().id).value = field.value;
    } else {
      return;
    }
    save();
  });

  view.addEventListener("change", event => {
    if (event.target.id === "grammar-verb-list") filterVerbs();
    if (event.target.id === "grammar-test-question") moveTest(Number(event.target.value));
  });

  function moveTest(index) {
    attempt().index = index;
    confirmTest = false;
    renderTest();
    save();
    focus("#grammar-question");
  }

  view.addEventListener("submit", event => {
    if (event.target.dataset.gForm !== "practice") return;
    event.preventDefault();
    const { id, questions } = practice();
    const draft = practiceDraft(id);
    const question = questions[draft.index];
    const value = question.type === "order" ? draft.selected.map(token => lookupToken(question, token)?.word).join(" ") : draft.value;
    if (!value.trim() || (question.type === "order" && draft.selected.length !== tokens(question).length)) return;
    draft.value = value;
    const matched = question.answers.some(answer => normalizeGermanWriting(answer) === normalizeGermanWriting(value));
    draft.verdict = matched ? "correct" : question.type === "translate" ? "compare" : "retry";
    renderCurrent();
    save();
    focus(".grammar-feedback");
  });

  function advancePractice(draft, id, questions, accepted = false) {
    if (draft.verdict === "correct" || accepted) draft.correct++;
    else (draft.missed ??= []).push(draft.queue?.[draft.index] ?? draft.index);
    draft.index++;
    draft.value = "";
    draft.selected = [];
    draft.transcript = false;
    draft.verdict = "";
    if (draft.index !== questions.length || !screen.lesson) return;
    state.lessonResults ??= {};
    const total = questionsByLesson[screen.lesson.id - 1].length;
    const previous = state.lessonResults[id];
    const missed = draft.queue ? [...(previous?.missed ?? []).filter(index => !draft.queue.includes(index)), ...(draft.missed ?? [])] : draft.missed;
    const correct = draft.queue ? total - missed.length : draft.correct;
    state.lessonResults[id] = { correct, total, missed };
    state.completed[id] = correct === total;
  }

  function handlePracticeAction(action, button) {
    const { id, questions } = practice();
    const draft = practiceDraft(id);
    const question = questions[draft.index];
    let target = "#grammar-question, .grammar-finish h2";
    switch (action) {
      case "listen":
        playGermanSpeech(question.audio, view.querySelector("#grammar-audio-status"));
        return;
      case "transcript":
        draft.transcript = !draft.transcript;
        target = '[data-g-action="transcript"]';
        break;
      case "add":
      case "remove": {
        const token = Number(button.dataset.index);
        if (action === "add") {
          draft.selected.push(token);
          target = draft.selected.length === tokens(question).length
            ? 'button[type="submit"]' : '.word-bank button:not(:disabled)';
        } else {
          draft.selected = draft.selected.filter(key => key !== token);
          target = `[data-g-action="add"][data-index="${token}"]`;
        }
        break;
      }
      case "retry":
        draft.verdict = "";
        target = '#grammar-answer, .word-tray button, [data-g-action="listen"]';
        break;
      case "reveal":
        draft.verdict = "revealed";
        target = ".grammar-feedback";
        break;
      case "accept":
      case "next-practice":
        advancePractice(draft, id, questions, action === "accept");
        break;
      case "restart-practice": {
        const missed = screen.lesson ? lessonResult(screen.lesson.id)?.missed : null;
        const fresh = makePractice();
        if (missed?.length) fresh.queue = [...missed];
        state.practice[id] = fresh;
        break;
      }
      default:
        return;
    }
    renderCurrent();
    save();
    focus(target);
  }

  function finishTest() {
    attempt().submitted = true;
    confirmTest = false;
    renderTest();
    save();
    focus(".grammar-result h2");
  }

  function handleTestAction(action, button) {
    const draft = attempt();
    const tasks = grammarTests[screen.test - 1];
    switch (action) {
      case "start-test":
        draft.started = true;
        moveTest(draft.index);
        break;
      case "next-blank": {
        for (let offset = 1; offset <= tasks.length; offset++) {
          const index = (draft.index + offset) % tasks.length;
          if (!draft.values[index]?.trim()) {
            moveTest(index);
            break;
          }
        }
        break;
      }
      case "test-previous":
        moveTest(draft.index - 1);
        break;
      case "test-next":
        moveTest(draft.index + 1);
        break;
      case "submit-test":
        if (tasks.every((_, index) => draft.values[index]?.trim())) {
          finishTest();
        } else {
          confirmTest = true;
          renderTest();
          focus('[data-g-action="finish-test"]');
        }
        break;
      case "finish-test":
        finishTest();
        break;
      case "keep-test":
        confirmTest = false;
        renderTest();
        focus("#grammar-test-answer");
        break;
      case "restart-test":
        confirmRestart = true;
        renderTest();
        focus('[data-g-action="confirm-restart"]');
        break;
      case "cancel-restart":
        confirmRestart = false;
        renderTest();
        focus('[data-g-action="restart-test"]');
        break;
      case "confirm-restart":
        if (!confirmRestart || !draft.submitted || screen.archive) return;
        state.testHistory ??= {};
        (state.testHistory[screen.test] ??= []).push({ draft, savedAt: Date.now() });
        state.tests[screen.test] = makeAttempt();
        confirmRestart = false;
        screen.reviewIndex = -1;
        history.replaceState(history.state, "", route("test", screen.test));
        renderTest();
        save();
        focus('[data-g-action="start-test"]');
        break;
      case "review-filter":
        screen.filter = button.dataset.filter;
        screen.reviewIndex = -1;
        renderTest();
        focus(`.grammar-result-filters [data-filter="${screen.filter}"]`);
        break;
      case "mark-test": {
        const index = Number(button.dataset.index);
        const accepted = button.dataset.verdict === "accept";
        const open = Array.from(view.querySelectorAll(".grammar-review[open]"), detail => detail.id);
        draft.marks[index] = accepted;
        renderTest();
        for (const key of open) {
          const detail = view.querySelector(`#${key}`);
          if (detail) detail.open = true;
        }
        save();
        focus(view.querySelector(`#grammar-review-${index}`)
          ? `#grammar-review-${index} [data-verdict="${button.dataset.verdict}"]`
          : `.grammar-result-filters [data-filter="${screen.filter}"]`);
        break;
      }
    }
  }

  view.addEventListener("click", event => {
    const result = event.target.closest("#grammar-search-results [data-lesson]");
    if (result) searchResult = result.dataset.lesson;
    const reviewLink = event.target.closest(".grammar-review-topics a, .grammar-repeat-topics a");
    if (reviewLink && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      const ref = reviewReference(reviewLink.getAttribute("href").split("/").at(-1));
      if (ref) history.replaceState(history.state, "", route("test", ref.test, ref.context));
    }
    const button = event.target.closest("[data-g-action]");
    if (!button || button.disabled) return;
    const { gAction } = button.dataset;
    if (screen.test) handleTestAction(gAction, button);
    else handlePracticeAction(gAction, button);
  });

  return { render, close };
})();
