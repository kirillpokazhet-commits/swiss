const elements = Object.fromEntries(
  ["course-sections", "overview", "lesson-view", "polyglot-view", "grammar-view", "lessons", "percent", "due-count", "hero", "sections", "content", "storage-message", "audio-status"]
    .map(id => [id, document.getElementById(id)])
);
const labels = { practice: "Тренировка", grammar: "Грамматика", test: "Тест A1.1" };
const dialogueTitle = "Практика · Уцнах";
const lessonImages = { 1: "intro", 2: "family", 3: "bakery", 4: "apartment", 5: "station", 6: "leisure", 7: "school" };
const day = 86_400_000;
const minute = 60_000;
const ratings = { again: "Снова", hard: "Трудно", good: "Хорошо", easy: "Легко" };
const storageKey = "deutsch-a11.v2";
const cardKeys = new Map();
const mainDeck = buildMainDeck();
const reviewDeck = mainDeck.flatMap(card => [
  { ...card, key: `${card.key}:de`, reverse: false },
  { ...card, key: `${card.key}:translation`, reverse: true }
]);
const glosses = buildGlosses();
let saved = { theory: {}, cards: {}, practice: {}, bestTest: null, scenes: {} };
let view;
let study;
let reviewTimer;
const firstCardKey = "deutsch-a11.word-order.first.all";
let previousFirstCard;

try {
  const previous = localStorage.getItem(storageKey);
  if (previous) saved = { ...saved, ...JSON.parse(previous) };
  else {
    const oldProgress = JSON.parse(localStorage.getItem("deutsch-a11.v1") || "null");
    if (oldProgress?.cards) {
      for (const lesson of course) {
        for (const card of wordsFor(lesson)) {
          const oldCard = oldProgress.cards[card.legacyKey];
          if (oldCard) saved.cards[card.key] = oldCard;
        }
      }
    }
  }
  saved.cards = mergeCardSchedules(saved.cards);
} catch {
  elements["storage-message"].textContent = "Не удалось загрузить сохранённый прогресс.";
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch {
    elements["storage-message"].textContent = "Браузер не смог сохранить прогресс. Он доступен до закрытия страницы.";
  }
  renderNavigation();
}

const backupFormat = "deutsch-a11-progress";
const backupFile = document.getElementById("backup-file");
const backupStatus = document.getElementById("backup-status");
const backupConfirm = document.getElementById("backup-confirm");
let pendingBackup;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseBackup(contents) {
  const backup = JSON.parse(contents);
  if (backup?.format !== backupFormat || ![1, 2].includes(backup.version) || backup.course !== storageKey) {
    throw new Error("Несовместимый файл");
  }
  const progress = backup.progress;
  if (!isRecord(progress?.theory) || !isRecord(progress.cards) || !isRecord(progress.practice)) {
    throw new Error("Повреждённый прогресс");
  }
  const lessons = new Map(course.map(lesson => [String(lesson.id), lesson]));
  const isScore = (value, max) => Number.isInteger(value) && value >= 0 && value <= max;
  if (
    Object.entries(progress.theory).some(([id, read]) => !lessons.has(id) || typeof read !== "boolean") ||
    Object.entries(progress.practice).some(([id, score]) => !isScore(score, lessons.get(id)?.practice.length)) ||
    (progress.bestTest !== null && !isScore(progress.bestTest, finalTest.length))
  ) throw new Error("Неверные результаты");
  for (const [key, card] of Object.entries(progress.cards)) {
    if (!(cardKeys.has(key) && isLegacyWordSchedule(card) ||
      backup.version === 2 && canonicalReviewKey(key) && wordSchedule.isSchedule(card))) {
      throw new Error("Неверное расписание");
    }
  }
  const scenes = progress.scenes ?? {};
  if (!isRecord(scenes) || Object.entries(scenes).some(([id, done]) =>
    !uznachScenes.some(scene => scene.id === id) || done !== true
  )) throw new Error("Неверный прогресс прогулки");
  const guided = progress.guided ?? {};
  if (!isRecord(guided) || !validStageProgress(progress.school ?? {}, schoolRoute) ||
      Object.entries(guided).some(([id, steps]) => !validStageProgress(steps, lessonRoutes[id]))) {
    throw new Error("Неверный прогресс занятия");
  }
  return { theory: progress.theory, practice: progress.practice, cards: mergeCardSchedules(progress.cards), bestTest: progress.bestTest, scenes,
    guided: { ...guided, 7: guided[7] ?? progress.school ?? {} },
    resume: resumeStage(progress.resume) ? progress.resume : null };
}

function validStageProgress(steps, route) {
  return Array.isArray(route) && isRecord(steps) && Object.entries(steps).every(([id, step]) => {
    const stage = route.find(item => item.id === id);
    return stage && isRecord(step) && Number.isInteger(step.answered) && step.answered >= 0 &&
      step.answered <= stage.tasks.length && Number.isSafeInteger(step.due) && step.due >= 0;
  });
}

document.getElementById("export-progress").addEventListener("click", () => {
  const exportedAt = new Date().toISOString();
  const copy = { format: backupFormat, version: 2, course: storageKey, exportedAt, progress: saved };
  const url = URL.createObjectURL(new Blob([JSON.stringify(copy, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `deutsch-a11-progress-${exportedAt.slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

backupFile.addEventListener("change", async () => {
  pendingBackup = null;
  backupConfirm.hidden = true;
  backupStatus.textContent = "";
  const file = backupFile.files[0];
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error("Файл слишком большой");
    const progress = parseBackup(await file.text());
    if (backupFile.files[0] !== file) return;
    pendingBackup = progress;
    backupConfirm.hidden = false;
    backupStatus.textContent = `В копии есть данные по ${Object.keys(progress.cards).length} карточкам. Восстановление заменит прогресс в этом браузере.`;
  } catch {
    if (backupFile.files[0] !== file) return;
    backupStatus.textContent = "Не удалось прочитать копию. Выбери файл JSON, скачанный из этого курса.";
    backupFile.value = "";
  }
});

document.getElementById("restore-progress").addEventListener("click", () => {
  if (!pendingBackup) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(pendingBackup));
  } catch {
    backupStatus.textContent = "Браузер не смог сохранить копию. Текущий прогресс остался прежним.";
    return;
  }
  saved = pendingBackup;
  pendingBackup = null;
  backupFile.value = "";
  backupConfirm.hidden = true;
  elements["storage-message"].textContent = "";
  backupStatus.textContent = "Прогресс восстановлен.";
  renderNavigation();
});

function escapeHTML(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}

function audioButton(className = "") {
  return `<button class="audio${className ? ` ${className}` : ""}" type="button" data-action="speak">Слушать</button>`;
}

function germanWithHints(text, tag = "span") {
  const content = text.split(/(\p{Script=Latin}+(?:[-’']\p{Script=Latin}+)*)/u).map((part, index) =>
    index % 2 && glosses.has(part.toLowerCase())
      ? `<span class="hint-word"><button type="button" data-action="word-hint" aria-expanded="false">${escapeHTML(part)}</button></span>`
      : escapeHTML(part)
  ).join("");
  return `<${tag} lang="de-CH" data-speech="${escapeHTML(text).replace(/"/g, "&quot;")}">${content}</${tag}>`;
}

function buildGlosses() {
  const dictionary = new Map();
  for (const { front, plural, translation } of mainDeck) {
    for (const form of [front, plural]) {
      const word = form?.replace(/^(der|die|das) /iu, "");
      if (word && /^\p{Script=Latin}+$/u.test(word) && !dictionary.has(word.toLowerCase())) {
        dictionary.set(word.toLowerCase(), translation);
      }
    }
  }
  for (const [forms, russian, ukrainian] of wordGlosses) {
    for (const form of forms.split(" ")) dictionary.set(form, courseLanguage === "uk" ? ukrainian : russian);
  }
  return dictionary;
}

let activeWordHint;
function closeWordHint() {
  if (!activeWordHint) return;
  activeWordHint.setAttribute("aria-expanded", "false");
  activeWordHint.nextElementSibling?.remove();
  activeWordHint = null;
}

function toggleWordHint(button) {
  const wasOpen = activeWordHint === button;
  closeWordHint();
  if (wasOpen) return;
  const gloss = document.createElement("span");
  gloss.className = "word-gloss";
  gloss.setAttribute("role", "status");
  gloss.lang = courseLanguage;
  button.after(gloss);
  gloss.textContent = glosses.get(button.textContent.toLowerCase());
  button.setAttribute("aria-expanded", "true");
  activeWordHint = button;
}

document.addEventListener("click", event => {
  if (!event.target.closest(".hint-word")) closeWordHint();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeWordHint();
});

let activeSpeech;
let activeRecording;
function speak(button) {
  const source = button.previousElementSibling;
  const text = (source.dataset.speech ?? source.textContent).replace(/\s*·\s*/g, ". ").replace(/\s*\(Plural\)/g, "").trim();
  playGermanSpeech(text, document.getElementById("audio-status"));
}

function playGermanSpeech(text, status) {
  const synthesis = window.speechSynthesis;
  activeRecording?.pause();
  activeRecording = null;
  activeSpeech = null;
  if (synthesis?.speaking || synthesis?.pending) synthesis.cancel();
  status.textContent = "";
  if (/^grüezi[.!]?$/iu.test(text)) {
    const recording = new Audio("./gruezi.mp3");
    activeRecording = recording;
    recording.play().catch(() => {
      if (activeRecording !== recording) return;
      activeRecording = null;
      status.textContent = "Не удалось воспроизвести фразу. Попробуй ещё раз.";
    });
    return;
  }
  if (!synthesis || !window.SpeechSynthesisUtterance) {
    status.textContent = "Озвучка недоступна в этом браузере.";
    return;
  }
  const voices = synthesis.getVoices();
  const candidates = voices.filter(item => /^de(?:[-_]de)?$/i.test(item.lang));
  const voice = candidates.find(item => /premium|enhanced|neural/i.test(item.name))
    ?? candidates.find(item => item.default) ?? candidates[0];
  if (!voice && voices.length) {
    status.textContent = "Обычный немецкий голос недоступен.";
    return;
  }
  const speech = new SpeechSynthesisUtterance(text);
  if (voice) speech.voice = voice;
  speech.lang = "de-DE";
  speech.rate = 1;
  activeSpeech = speech;
  speech.onend = () => {
    if (activeSpeech === speech) activeSpeech = null;
  };
  speech.onerror = event => {
    if (activeSpeech !== speech) return;
    activeSpeech = null;
    if (event.error !== "canceled" && event.error !== "interrupted") {
      status.textContent = "Не удалось воспроизвести фразу. Попробуй ещё раз.";
    }
  };
  synthesis.speak(speech);
}

function wordsFor(lesson) {
  return lesson.words.map(([word, translation, legacyKey], index) => {
    const [front, plural] = word.split(" · ");
    return { key: `${lesson.id}:${index}`, word, front, plural, translation, legacyKey, lessonId: lesson.id };
  });
}

function buildMainDeck() {
  const separateMeanings = new Set(["3:20", "4:47"]); // machen (price), finden (opinion)
  const byWord = new Map();
  for (const card of course.flatMap(wordsFor)) {
    const identity = separateMeanings.has(card.key) ? card.key : card.word;
    if (!byWord.has(identity)) byWord.set(identity, { ...card, vocabulary: wordCardContent(card.translation) });
    cardKeys.set(card.key, byWord.get(identity).key);
  }
  return [...byWord.values()];
}

function canonicalReviewKey(source) {
  const match = /:(de|translation)$/u.exec(source);
  const base = match && cardKeys.get(source.slice(0, match.index));
  return base ? base + match[0] : null;
}

function isLegacyWordSchedule(card) {
  return Number.isSafeInteger(card?.due) && card.due >= 0 && typeof card.learned === "boolean" &&
    (Number.isSafeInteger(card.interval) && card.interval > 0 ||
      Number.isInteger(card.level) && card.level >= 0 && card.level <= 5);
}

function mergeCardSchedules(cards) {
  const legacy = {};
  const directional = {};
  for (const [source, card] of Object.entries(cards ?? {})) {
    const base = cardKeys.get(source);
    if (base && isLegacyWordSchedule(card)) {
      const migrated = wordSchedule.migrate(card);
      if (!legacy[base] || migrated.lastReview > legacy[base].lastReview) legacy[base] = migrated;
    }
    const key = canonicalReviewKey(source);
    if (key && wordSchedule.isSchedule(card) && (!directional[key] || card.lastReview > directional[key].lastReview)) {
      const { due, lastReview, stability, difficulty, phase, step } = card;
      directional[key] = { due, lastReview, stability, difficulty, phase, step };
    }
  }
  const migrated = Object.fromEntries(Object.entries(legacy).flatMap(([key, schedule]) => [
    [`${key}:de`, schedule], [`${key}:translation`, { ...schedule }]
  ]));
  return { ...migrated, ...directional };
}

function lessonProgress(lesson) {
  const route = requiredStages(lesson.id);
  const progress = guidedProgress(lesson.id);
  const guidedDone = route.reduce((sum, stage) => sum + (progress[stage.id]?.answered ?? 0), 0);
  const guidedTotal = route.reduce((sum, stage) => sum + stage.tasks.length, 0);
  return { done: guidedDone, total: guidedTotal };
}

function scheduledLessons() {
  return course.map(lesson => ({ lesson, due: guidedProgress(lesson.id).repeat?.due }))
    .filter(item => item.due && Number.isFinite(new Date(item.due).getTime()))
    .sort((first, second) => first.due - second.due);
}

function renderNavigation() {
  if (!view.school) return;
  const progress = course.map(lessonProgress);
  const count = progress.reduce((sum, item) => sum + item.done, 0);
  const max = progress.reduce((sum, item) => sum + item.total, 0);
  const due = reviewDeck.filter(card => saved.cards[card.key]?.due <= Date.now()).length;
  elements.percent.textContent = new Intl.NumberFormat(courseLanguage, { style: "percent", maximumFractionDigits: 1 }).format(count / max);
  elements["due-count"].textContent = due ? `К повторению: ${due}` : "Колода всех лекций";
  const resumed = resumeStage(saved.resume);
  const interrupted = resumed && course.find(lesson => lesson.id === saved.resume.lessonId && nextGuidedStage(lesson.id));
  const current = interrupted ?? course.find(lesson => nextGuidedStage(lesson.id));
  const upcoming = current && (interrupted && guidedProgress(current.id)[resumed.id]?.answered !== resumed.tasks.length
    ? resumed : nextGuidedStage(current.id));
  const continuing = interrupted || (current && lessonProgress(current).done > 0);
  document.getElementById("learn-link").href = upcoming
    ? continuing ? `#${current.id}/learn/${upcoming.id}` : `#${current.id}`
    : "#final/test";
  document.getElementById("learn-label").textContent = upcoming
    ? continuing ? "Продолжить урок" : count ? "Начать следующий урок" : "Начать курс"
    : "Перейти к итоговому тесту";
  document.getElementById("learn-summary").textContent = upcoming
    ? continuing ? `${current.title} · ${upcoming.title}` : `${current.title} · ${lessonRoutes[current.id].find(stage => stage.id === "call").title}`
    : "Все уроки пройдены";
  const dueCount = scheduledLessons().filter(item => item.due <= Date.now()).length;
  document.getElementById("repeat-summary").textContent = dueCount
    ? `К повторению: ${dueCount}` : "На сегодня заданий нет";
  const completedScenes = uznachScenes.filter(scene => saved.scenes[scene.id]).length;
  document.getElementById("uznach-count").textContent =
    completedScenes ? `Сцены пройдены: ${completedScenes} из ${uznachScenes.length}` : "Три разговора на немецком";
  document.getElementById("final-summary").textContent =
    saved.bestTest === null ? "Тест, грамматика и повторение" : `Лучший результат теста: ${saved.bestTest} из ${finalTest.length}`;
  elements.lessons.innerHTML = course.map((lesson, index) => {
    const { done, total } = progress[index];
    return `<a class="lesson" href="#${lesson.id}">
      ${lessonThumbnail(lesson.id)}
      <span class="lesson-info"><strong>${escapeHTML(lesson.title)}</strong></span>
      <small class="lesson-percent">${Math.round(done / total * 100)}%</small>
      <span class="menu-arrow" aria-hidden="true"></span>
    </a>`;
  }).join("");
}

function lessonPhoto(id, className, lazy = false) {
  return `<img class="${className}" src="./visuals/${lessonImages[id]}.webp" alt="" width="720" height="480" decoding="async"${lazy ? ' loading="lazy"' : ""}>`;
}

function lessonThumbnail(id) {
  return `<span class="lesson-photo">${lessonPhoto(id, "lesson-thumbnail", true)}
    <span class="lesson-photo-number" aria-hidden="true">${String(id).padStart(2, "0")}</span></span>`;
}

function pageNavigation(href, label, related) {
  return `<nav class="page-nav" aria-label="Навигация по странице">
    <a class="home-link" href="${href}">${label}</a>
    ${related ? `<a class="home-link page-nav-related" href="${related.href}">${related.label}</a>` : ""}
  </nav>`;
}

function readRoute() {
  clearTimeout(reviewTimer);
  closeWordHint();
  const [id, section, topic, context] = location.hash.slice(1).split("/");
  const lesson = course.find(item => String(item.id) === id);
  const globalWords = id === "words" || ((id === "final" || lesson) && section === "words");
  const final = id === "final" && !globalWords;
  const finalHub = final && !["practice", "grammar", "test"].includes(section);
  const uznach = id === "uznach";
  const repeat = id === "repeat";
  const school = id === "school";
  const isPolyglot = id === "polyglot";
  const isGrammarCourse = id === "grammar-course";
  const home = !school && !isPolyglot && !isGrammarCourse && !final && !lesson && !uznach && !globalWords && !repeat;
  const tabs = final ? ["practice", "grammar", "test"] : ["learn", "theory", "practice"];
  view = {
    id: globalWords ? "words" : final ? "final" : lesson ? String(lesson.id) : "home",
    section: tabs.includes(section) ? section : tabs[0],
    lesson, final, school, topic
  };
  elements["course-sections"].hidden = !home;
  elements.overview.hidden = !school;
  elements.hero.classList.toggle("home-hero", home);
  elements.hero.classList.toggle("school-hero", school);
  elements["lesson-view"].hidden = home || school || isPolyglot || isGrammarCourse;
  elements["polyglot-view"].hidden = !isPolyglot;
  if (!isGrammarCourse && !elements["grammar-view"].hidden) grammarCourse.close();
  elements["grammar-view"].hidden = !isGrammarCourse;
  elements.sections.hidden = !final || finalHub;
  elements["audio-status"].textContent = "";
  study = null;
  renderNavigation();
  if (home) {
    elements.hero.innerHTML = "<h1>Немецкий язык</h1>";
    return;
  }
  if (school) {
    elements.hero.innerHTML = pageNavigation("#home", "Все разделы") +
      `<h1>Языковая школа</h1><p>A1.1 · ${course.length} лекций и итоговый тест</p>`;
    return;
  }
  if (isPolyglot) {
    polyglot.render(elements.hero, section, topic, true, context);
    return;
  }
  if (isGrammarCourse) {
    grammarCourse.render(elements.hero, section, topic, context);
    return;
  }
  if (globalWords) {
    elements.hero.innerHTML = pageNavigation("#home", "Все разделы") + '<h1 id="section-title">Учить слова</h1>';
    openWords();
    return;
  }
  if (repeat) {
    elements.hero.innerHTML = pageNavigation("#school", "Языковая школа") + "<h1>Повторение</h1>";
    renderRepeatQueue();
    return;
  }
  if (finalHub) {
    const activities = [
      ["test", "Итоговый тест", `${finalTest.length} заданий · разбор в конце`],
      ["grammar", "Шпаргалка по грамматике", "Правила всех семи лекций"],
      ["practice", "Повторить упражнения", "По одной теме или все задания подряд"]
    ];
    elements.hero.innerHTML = pageNavigation("#school", "Языковая школа") + '<h1 id="section-title">Итоги A1.1</h1>';
    elements.content.innerHTML = `<nav class="hub-list" aria-label="Итоги курса">${activities.map(([id, title, description], index) => `
      <a class="destination${index === 0 ? " destination-main" : ""}" href="#final/${id}">
        <span><strong>${title}</strong><small>${description}</small></span>
        <span class="menu-arrow" aria-hidden="true"></span>
      </a>`).join("")}</nav>`;
    return;
  }
  if (uznach) {
    const scene = uznachScenes.find(item => item.id === section);
    elements.hero.innerHTML = pageNavigation(scene ? "#uznach" : "#school", scene ? dialogueTitle : "Языковая школа") +
      `<h1>${scene ? scene.title : dialogueTitle}</h1>`;
    if (scene) {
      study = { scene, answers: [], order: [], index: 0, streak: 0, bestStreak: 0 };
      openSceneStep("start");
    } else {
      show("Маршрут", "", `
        <ol class="scene-list scene-gallery" role="list">${uznachScenes.map(scene => `
          <li><a href="#uznach/${scene.id}">
            <img src="./visuals/${scene.id}.webp" alt="" width="720" height="480" decoding="async">
            <div><strong>${scene.title}</strong><p>${scene.goal}</p>
            ${saved.scenes[scene.id] ? "<small>Пройдено</small>" : ""}</div>
            <span class="menu-arrow" aria-hidden="true"></span>
          </a></li>`).join("")}</ol>`);
    }
    return;
  }
  const guidedStage = view.section === "learn" && lessonRoutes[view.id].find(stage => stage.id === topic);
  const related = guidedStage && (guidedStage.id === "repeat"
    ? { href: "#repeat", label: "К списку повторений" } : { href: `#${view.id}`, label: "Все шаги урока" });
  const back = final ? ["#final", "Итоги A1.1"] : view.section === "learn" ? ["#school", "Языковая школа"] : [`#${view.id}`, "К уроку"];
  elements.hero.innerHTML = `
    ${pageNavigation(...back, related)}
    ${final ? "" : `<p class="page-context" lang="de">Lektion ${lesson.id}</p>`}
    <h1>${final ? { practice: "Повторить упражнения", grammar: "Шпаргалка по грамматике", test: "Итоговый тест" }[view.section] : escapeHTML(lesson.title)}</h1>`;
  elements.sections.innerHTML = final ? tabs.map(tab => `
    <a href="#${view.id}/${tab}" ${view.section === tab ? 'aria-current="page"' : ""}>${labels[tab]}</a>`).join("")
    : "";
  if (view.section === "theory") renderTheory();
  if (view.section === "learn") renderGuidedRoute();
  if (view.section === "grammar") {
    const byLesson = `<details class="theory-index" open><summary>Полная грамматика по урокам</summary>
      <nav aria-label="Грамматика по урокам"><ul>${course.map(item =>
        `<li><a href="#${item.id}/theory">${escapeHTML(item.title)}</a></li>`).join("")}</ul></nav></details>`;
    show("Грамматика A1.1", "Правила по урокам и краткое повторение перед тестом",
      byLesson + theoryIndex(grammarReview, "#final/grammar") + theoryCards(grammarReview), true);
  }
  if (view.section === "practice" || view.section === "test") openPractice();
}

function show(title, subtitle, body, quietHeading = false) {
  elements.content.innerHTML = `
    ${title ? `<header class="section-head${quietHeading && !subtitle ? " sr-only" : ""}">
      <h2 id="section-title"${quietHeading ? ' class="sr-only"' : ""}>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}
    </header>` : ""}${body}`;
}

function sceneLine(scene, line) {
  return `<div class="scene-line"><small>${scene.speaker}</small>
    <div>${germanWithHints(line, "strong")}${audioButton()}</div></div>`;
}

function openSceneStep(id) {
  const scene = study.scene;
  const step = scene.steps[id];
  study.step = step;
  study.feedback = null;
  study.order = [];
  study.optionOrder = null;
  if (step.result) {
    saved.scenes[scene.id] = true;
    persist();
    show("Разговор завершён", step.result, `
      ${sceneLine(scene, step.line)}
      <div class="actions"><a class="button primary" href="#uznach">К маршруту</a>
        <button data-action="scene-restart">Сыграть ещё раз</button></div>`);
    focusContentControl("a");
    return;
  }
  study.questions = [step.task];
  renderQuestion();
}

function errorRule(question, rule = questionRules.get(question)) {
  const lesson = rule && course.find(item => item.theory.includes(rule));
  const reviewIndex = grammarReview.indexOf(rule);
  const ruleHref = lesson ? `#${lesson.id}/theory/${lesson.theory.indexOf(rule) + 1}`
    : reviewIndex >= 0 ? `#final/grammar/${reviewIndex + 1}` : "";
  return `<div class="error-rule">
    <strong>Правило</strong><p>${escapeHTML(question[2])}</p>
    ${rule ? `<details><summary>${escapeHTML(rule[0])}</summary>${theoryParagraphs(rule[1])}
      <div class="example">${study?.test ? `<span lang="de-CH">${escapeHTML(rule[2])}</span>` : germanWithHints(rule[2])}${audioButton()}</div>
      ${ruleHref ? `<a class="theory-link" href="${ruleHref}" target="_blank" rel="noopener">Открыть в теории (новая вкладка)</a>` : ""}</details>` : ""}
  </div>`;
}

function theoryIndex(items, href) {
  return `<details class="theory-index">
    <summary>Темы <small>${items.length}</small></summary>
    <nav aria-label="Темы">
      <ul>${items.map(([title], index) => `<li><a href="${href}/${index + 1}">${escapeHTML(title)}</a></li>`).join("")}</ul>
    </nav>
  </details>`;
}

function theoryParagraphs(description) {
  return description.split("\n\n").map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("");
}

function theoryCards(items) {
  return `<div class="stack">${items.map(([title, description, example, table, note, extra], index) => `
      <article class="panel theory-topic" id="topic-${index + 1}" aria-labelledby="topic-title-${index + 1}">
      <h3 id="topic-title-${index + 1}" tabindex="-1">${escapeHTML(title)}</h3>${theoryParagraphs(description)}
      <div class="example">${germanWithHints(example)}${audioButton()}
      ${extra?.translation ? `<p class="muted">${escapeHTML(extra.translation)}</p>` : ""}
      ${note ? `<p>${escapeHTML(note)}</p>` : ""}</div>
      ${table ? `<div class="grammar-wrap" tabindex="0" role="region" aria-labelledby="topic-title-${index + 1}"><table class="grammar">
        <thead><tr>${table[0].map(cell => `<th scope="col">${escapeHTML(cell)}</th>`).join("")}</tr></thead>
        <tbody>${table.slice(1).map(([pronoun, ...forms]) => `
          <tr><th scope="row">${escapeHTML(pronoun)}</th>${forms.map(form => `<td>${escapeHTML(form)}</td>`).join("")}</tr>
        `).join("")}</tbody>
      </table></div>` : ""}
      ${extra?.check ? `<details class="theory-check"><summary>Проверь себя</summary>
        <p>${escapeHTML(extra.check[0])}</p><details><summary>Показать ответ</summary><p>${escapeHTML(extra.check[1])}</p></details>
      </details>` : ""}</article>`).join("")}</div>`;
}

function renderTheory() {
  const { lesson } = view;
  const originalTopics = new Set(lesson.theory);
  const addedTopics = lessonRoutes[lesson.id].flatMap(stage => stage.theory ?? [])
    .filter(topic => !originalTopics.has(topic));
  const topics = [...lesson.theory, ...addedTopics];
  elements.content.innerHTML = `<h2 id="section-title" class="sr-only">Теория</h2>
    <p class="theory-reference"><span lang="de-CH">${escapeHTML(lesson.german)}</span> · Учебник, стр. ${escapeHTML(lesson.pages)}</p>
    ${theoryIndex(topics, `#${view.id}/theory`)}
    ${theoryCards(topics)}
    <div class="actions">
      <a class="button" href="#${view.id}">К уроку</a>
    </div>`;
}

function guidedProgress(id) {
  return saved.guided?.[id] ?? (String(id) === "7" ? saved.school : null) ?? {};
}

function requiredStages(id) {
  return lessonRoutes[id].filter(stage => stage.id !== "repeat");
}

function resumeStage(resume) {
  if (!course.some(lesson => lesson.id === resume?.lessonId)) return null;
  return requiredStages(resume.lessonId).find(stage => stage.id === resume.stageId);
}

function nextGuidedStage(id) {
  const progress = guidedProgress(id);
  return requiredStages(id).find(stage => (progress[stage.id]?.answered ?? 0) < stage.tasks.length);
}

function renderRepeatQueue() {
  const scheduled = scheduledLessons();
  const due = scheduled.filter(item => item.due <= Date.now());
  const next = scheduled.find(item => item.due > Date.now());
  const nextDate = next && new Intl.DateTimeFormat(courseLanguage, { dateStyle: "long" }).format(next.due);
  show(due.length ? "На сегодня" : "На сегодня заданий нет", "", `
    ${due.length ? `<ul class="scene-list" role="list">${due.map(({ lesson }) => `
      <li><a href="#${lesson.id}/learn/repeat">
        <span class="number" aria-hidden="true">${lesson.id}</span>
        <strong>${escapeHTML(lesson.title)}</strong><span class="menu-arrow" aria-hidden="true"></span>
      </a></li>`).join("")}</ul>` : ""}
    ${nextDate ? `<p class="repeat-date"><span>Ближайшее повторение</span> · <time datetime="${new Date(next.due).toISOString()}">${nextDate}</time></p>` : ""}
    <div class="actions"><a class="button" href="#final/practice">Свободная практика</a></div>`);
}

function renderGuidedRoute() {
  const route = lessonRoutes[view.id];
  const progress = guidedProgress(view.id);
  const stage = route.find(item => item.id === view.topic);
  const upcoming = nextGuidedStage(view.id);
  const due = progress.repeat?.due;
  const base = `#${view.id}/learn`;
  if (!stage) {
    const started = requiredStages(view.id).some(item => progress[item.id]?.answered) || saved.resume?.lessonId === Number(view.id);
    const last = saved.resume?.lessonId === Number(view.id) && resumeStage(saved.resume);
    const next = last && (progress[last.id]?.answered ?? 0) < last.tasks.length ? last : upcoming;
    show(upcoming ? "Цель урока" : "Урок пройден", route.find(item => item.id === "call").description, `
      <div class="actions">
        ${next ? `<a class="button primary" href="${base}/${next.id}">${started ? "Продолжить урок" : "Начать урок"}</a>`
          : `<a class="button primary" href="${Number(view.id) < course.length ? `#${Number(view.id) + 1}` : "#final/test"}">${Number(view.id) < course.length ? "Следующий урок" : "Перейти к итоговому тесту"}</a>`}
      </div>
      <nav class="lesson-shortcuts" aria-label="Материалы урока">
        <a href="#${view.id}/theory">Все правила урока</a><a href="#${view.id}/practice">Дополнительная тренировка</a>
      </nav>
      ${lessonPhoto(view.id, "lesson-cover")}
      <h3 class="lesson-steps-title">Шаги урока</h3>
      <ol class="scene-list" role="list">${requiredStages(view.id).map((item, index) => {
        const done = progress[item.id]?.answered === item.tasks.length;
        const status = done ? "Пройдено" : item === next ? "Следующий шаг" : "";
        return `<li><a href="${base}/${item.id}">
          <span class="number" aria-hidden="true">${index + 1}</span>
          <div><strong>${item.title}</strong><p>${item.description}</p>${status ? `<small>${status}</small>` : ""}</div>
          <span class="menu-arrow" aria-hidden="true"></span>
        </a></li>`;
      }).join("")}</ol>
      ${due ? `<div class="actions"><a class="button" href="#repeat">${due <= Date.now() ? "Пора повторить" : "Расписание повторений"}</a></div>` : ""}`);
    return;
  }
  const answered = progress[stage.id]?.answered ?? 0;
  if (answered < stage.tasks.length || stage.id === "repeat") {
    startGuidedStage(stage, answered === stage.tasks.length ? 0 : answered);
    return;
  }
  show(stage.title, stage.description, `
    <div class="actions"><button class="primary" data-action="start-guided">Пройти ещё раз</button></div>`);
}

function startGuidedStage(stage, index = 0) {
  if (stage.id !== "repeat" && (guidedProgress(view.id)[stage.id]?.answered ?? 0) < stage.tasks.length &&
      (saved.resume?.lessonId !== Number(view.id) || saved.resume.stageId !== stage.id)) {
    saved.resume = { lessonId: Number(view.id), stageId: stage.id };
    persist();
  }
  study = { stage, questions: stage.tasks, answers: [], index, order: [], streak: 0, bestStreak: 0 };
  renderQuestion();
}

function advanceGuidedStage() {
  if (!study.feedback.correct) {
    study.feedback = null;
    study.order = [];
    renderQuestion();
    return;
  }
  const { stage } = study;
  const guided = saved.guided ??= {};
  const progress = guided[view.id] ??= { ...guidedProgress(view.id) };
  const previous = progress[stage.id];
  study.index++;
  progress[stage.id] = { answered: Math.max(previous?.answered ?? 0, study.index), due: previous?.due ?? 0 };
  if (stage.id === "call" && study.index === stage.tasks.length) {
    progress.repeat = { answered: progress.repeat?.answered ?? 0, due: Date.now() + 2 * day };
  }
  if (stage.id === "repeat" && study.index === stage.tasks.length) progress.repeat.due = Date.now() + 2 * day;
  persist();
  study.feedback = null;
  study.order = [];
  study.optionOrder = null;
  if (study.index < stage.tasks.length) {
    renderQuestion();
    return;
  }
  const base = `#${view.id}/learn`;
  const next = nextGuidedStage(view.id);
  const lessonComplete = !next;
  const nextLesson = Number(view.id) < course.length;
  const repeat = stage.id === "repeat";
  const primary = repeat ? ["#repeat", "К списку повторений"]
    : lessonComplete ? [nextLesson ? `#${Number(view.id) + 1}` : "#final/test", nextLesson ? "Следующий урок" : "Перейти к итоговому тесту"]
    : [`${base}/${next.id}`, "Следующий шаг"];
  show(repeat ? "Повторение пройдено" : lessonComplete ? "Урок пройден" : "Шаг пройден",
    stage.id === "call" || repeat ? "Следующее повторение через два дня." : "", `
    <div class="actions"><a class="button primary" href="${primary[0]}">${primary[1]}</a>
      <a class="button" href="${base}">Все шаги урока</a></div>`);
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function avoidRepeatedFirst(cards) {
  if (!cards.length) return;
  if (previousFirstCard === undefined) {
    try { previousFirstCard = localStorage.getItem(firstCardKey); } catch {}
  }
  if (cards.length > 1 && cards[0].key === previousFirstCard) {
    [cards[0], cards[1]] = [cards[1], cards[0]];
  }
  previousFirstCard = cards[0].key;
  try { localStorage.setItem(firstCardKey, previousFirstCard); } catch {}
}

function openWords(reverse = study?.reverse ?? false) {
  clearTimeout(reviewTimer);
  const cards = reviewDeck.filter(card => card.reverse === reverse);
  const now = Date.now();
  const due = shuffle(cards.filter(card => saved.cards[card.key]?.due <= now));
  const fresh = shuffle(cards.filter(card => !saved.cards[card.key]));
  avoidRepeatedFirst(due.length ? due : fresh);
  study = {
    cards, queue: [...due, ...fresh.slice(0, 12)],
    reviewed: 0, flipped: false, reverse
  };
  renderWords();
}

const relativeTime = new Intl.RelativeTimeFormat(courseLanguage, { style: "short" });

function formatReviewDelay(delay) {
  const [unit, size] = delay >= day ? ["day", day] : delay >= 60 * minute ? ["hour", 60 * minute] : ["minute", minute];
  return relativeTime.format(Math.max(1, Math.ceil(delay / size)), unit);
}

function wordCardContent(translation) {
  const localized = courseText(translation);
  // Glosses sometimes end in a bilingual example or a German abbreviation.
  // Keep that material on the answer side and label each language separately.
  const example = /^(.+?)(?:; |\. |, (?:например|наприклад),? | \((?:сокращение|скорочення) )(?:в выражении )?((?:\d+ )?\p{Script=Latin}.*?)(?: — (.+)|\))$/u.exec(localized);
  if (!example) return { meaning: localized };
  const [, meaning, german, explanation] = example;
  return { meaning, german, explanation };
}

function wordCardNote({ german, explanation }) {
  if (!german) return "";
  return `<small class="card-note"><span lang="de-CH">${escapeHTML(german)}</span>${
    explanation ? `<br><span lang="${courseLanguage}">${escapeHTML(explanation)}</span>` : ""
  }</small>`;
}

function renderWords() {
  clearTimeout(reviewTimer);
  const card = study.queue[0];
  const now = Date.now();
  const newCount = study.cards.filter(item => !saved.cards[item.key]).length;
  const nextDue = Math.min(...study.cards.map(item => saved.cards[item.key]?.due ?? Infinity));
  if (!card && Number.isFinite(nextDue)) {
    reviewTimer = setTimeout(() => openWords(), Math.min(Math.max(nextDue - now, 0), 2_147_483_647));
  }
  const planned = card && wordSchedule.preview(saved.cards[card.key], now);
  const vocabulary = card?.vocabulary;
  const list = mainDeck.map(item => `
    <dt><span lang="de-CH">${escapeHTML(item.word)}</span>${audioButton()}</dt>
    <dd><span lang="${courseLanguage}">${escapeHTML(item.vocabulary.meaning)}</span>${wordCardNote(item.vocabulary)}</dd>`).join("");
  const example = card && cardExample(card.front, card.lessonId);
  const panel = card ? `
    <div class="panel card-study">
      <div class="spread card-toolbar"><small>В очереди ${study.queue.length}</small>
        <div id="card-audio"${card.reverse ? " hidden" : ""}><span hidden id="card-audio-text" lang="de-CH">${escapeHTML(card.front)}</span>${audioButton()}</div></div>
      <button class="flashcard" type="button" data-action="reveal" aria-expanded="false" aria-controls="card-back">
        <span class="card-rotator">
          <span class="card-face card-front">
            <strong lang="${card.reverse ? courseLanguage : "de-CH"}">${escapeHTML(card.reverse ? vocabulary.meaning : card.front)}</strong><small>Нажми, чтобы перевернуть</small>
          </span>
          <span class="card-face card-back" id="card-back" aria-hidden="true">
            <small lang="${card.reverse ? courseLanguage : "de-CH"}">${escapeHTML(card.reverse ? vocabulary.meaning : card.front)}</small>
            <strong class="translation" lang="${card.reverse ? "de-CH" : courseLanguage}">${escapeHTML(card.reverse ? card.front : vocabulary.meaning)}</strong>
            ${wordCardNote(vocabulary)}
            ${example && example !== vocabulary.german ? `<span class="card-example" lang="de-CH">${escapeHTML(example)}</span>` : ""}
            ${card.plural ? `<small lang="de-CH">${escapeHTML(card.plural)}</small>` : ""}
          </span>
        </span>
      </button>
      <div class="actions card-actions" hidden>
        <div class="ratings" role="group" aria-label="Оценка карточки">${Object.entries(ratings).map(([rating, label]) => `
          <button data-action="rate-card" data-rating="${rating}">
            <strong>${label}</strong><small>${formatReviewDelay(planned[rating].due - now)}</small>
          </button>`).join("")}</div></div>
    </div>` : `
    <div class="panel" tabindex="-1" data-words-status><h3>${newCount ? "Подход завершён" : "Сейчас очередь пуста"}</h3>
    ${study.reviewed ? `<p>Оценок за подход: ${study.reviewed}.</p>` : ""}
    ${newCount ? `<p>Новых карточек осталось: ${newCount}.</p>` : ""}
    ${Number.isFinite(nextDue) ? `<p>По расписанию: ${nextDue <= now ? "есть карточки к повторению" : formatReviewDelay(nextDue - now)}.</p>` : ""}
    ${newCount ? '<div class="actions"><button class="primary" data-action="scheduled-words">Следующая порция</button></div>' : ""}</div>`;
  const description = `Интервальное повторение · ${courseText("Слов и выражений: #1", mainDeck.length)}`;
  const direction = `<div class="words-language" role="group" aria-label="${courseText("Язык карточек")}">
    <button type="button" data-action="word-language" data-language-front="de" aria-pressed="${!study.reverse}">${courseText("На немецком")}</button>
    <button type="button" data-action="word-language" data-language-front="translation" aria-pressed="${study.reverse}">${courseLanguage === "uk" ? "Українською" : "На русском"}</button>
  </div>`;
  const dictionary = `<details class="panel"><summary>Список слов</summary><dl>${list}</dl></details>`;
  elements.content.innerHTML = `<p class="words-intro muted">${description}</p>${direction}${panel}${dictionary}`;
}

function showCardSide(button) {
  study.flipped = !study.flipped;
  button.classList.toggle("is-flipped", study.flipped);
  button.setAttribute("aria-expanded", String(study.flipped));
  button.querySelector(".card-front").setAttribute("aria-hidden", String(study.flipped));
  button.querySelector(".card-back").setAttribute("aria-hidden", String(!study.flipped));
  const card = study.queue[0];
  document.getElementById("card-audio").hidden = card.reverse && !study.flipped;
  const example = study.flipped && (card.vocabulary.german || cardExample(card.front, card.lessonId));
  document.getElementById("card-audio-text").textContent = example || card.front;
}

async function flipCard(button) {
  if (button.hasAttribute("aria-busy")) return;
  const rotator = button.querySelector(".card-rotator");
  if (!rotator.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showCardSide(button);
    elements.content.querySelector(".card-actions").hidden = false;
    return;
  }

  button.setAttribute("aria-busy", "true");
  const direction = study.flipped ? -1 : 1;
  const turn = angle => ({ transform: `perspective(720px) rotateY(${angle}deg)` });
  let closing;
  let changedSide = false;
  try {
    closing = rotator.animate([turn(0), turn(89 * direction)], {
      duration: 410, easing: "cubic-bezier(.42, 0, .7, .85)", fill: "forwards"
    });
    await closing.finished;
    if (!button.isConnected) return;
    showCardSide(button);
    changedSide = true;
    const opening = rotator.animate([turn(-89 * direction), turn(0)], {
      duration: 450, easing: "cubic-bezier(.2, .1, .4, 1)"
    });
    closing.cancel();
    await opening.finished;
  } catch {
    if (button.isConnected && !changedSide) showCardSide(button);
  } finally {
    closing?.cancel();
    button.removeAttribute("aria-busy");
    if (button.isConnected) elements.content.querySelector(".card-actions").hidden = false;
  }
}

function gradeCard(rating) {
  if (!study?.queue?.length || !Object.hasOwn(ratings, rating)) return;
  const card = study.queue.shift();
  const now = Date.now();
  saved.cards[card.key] = wordSchedule.preview(saved.cards[card.key], now)[rating];
  study.reviewed++;
  const pending = new Set(study.queue.map(item => item.key));
  const ready = study.cards.filter(item => !pending.has(item.key) && saved.cards[item.key]?.due <= now);
  study.queue.push(...shuffle(ready));
  study.flipped = false;
  persist();
  renderWords();
}

function openPractice() {
  const test = view.section === "test";
  const questions = shuffle(test ? finalTest : (view.final ? course : [view.lesson]).flatMap(lesson => lesson.practice));
  study = { test, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
  if (view.final && !test) {
    show("Тренировки всех лекций", "Выбери тему или реши все задания подряд.", `
      <div class="actions"><button class="primary" data-action="start">Все задания · ${questions.length}</button></div>
      <nav class="review-menu" aria-label="Тренировки по темам">${course.map(lesson => `
        <a class="lesson" href="#${lesson.id}/practice">${lessonThumbnail(lesson.id)}
        <span class="lesson-info"><strong>${escapeHTML(lesson.title)}</strong></span><span class="menu-arrow" aria-hidden="true"></span></a>`).join("")}</nav>`, true);
  } else if (test) {
    const best = saved.bestTest === null ? "" : ` Лучший результат — ${saved.bestTest} из ${questions.length}.`;
    show("Тест A1.1", `${questions.length} заданий. Ответы и разбор появятся в конце.${best}`, `
      <div class="actions"><button class="primary" data-action="start">Начать тест</button></div>`, true);
  } else {
    renderQuestion();
  }
}

function questionOptions(question) {
  const [, answer, , type = "translate", options] = question;
  if (type === "translate") {
    const words = answer.split(/\s+/u);
    const lengths = new Set([words.length]);
    const available = new Map();
    for (const word of words) {
      const key = normalize(word);
      available.set(key, (available.get(key) ?? 0) + 1);
    }
    for (const variant of acceptedTranslations.get(question) ?? []) {
      const tokens = variant.split(/\s+/u);
      lengths.add(tokens.length);
      const needed = new Map();
      for (const token of tokens) {
        const key = normalize(token);
        const occurrences = (needed.get(key) ?? 0) + 1;
        needed.set(key, occurrences);
        if (occurrences <= (available.get(key) ?? 0)) continue;
        words.push(token);
        available.set(key, occurrences);
      }
    }
    return { type: "order", options: words, lengths };
  }
  if (type === "order") return { type, options, lengths: new Set([options.length]) };
  return { type: type === "listen" ? "choice" : type, options };
}

function guidedRule(question, stage, index) {
  if (!stage.theory) return null;
  if (stage === schoolRoute[1]) return stage.theory[index === 1 || index === 2 ? 0 : 1];
  if (stage === schoolRoute[2]) return stage.theory[[1, 2, 0, 0][index]];
  return questionRules.get(question) ?? stage.theory[0];
}

function answerLanguage(value) {
  return /[А-Яа-яЁё]/u.test(value) ? courseLanguage : "de-CH";
}

function renderQuestion() {
  const { test, questions, index, feedback } = study;
  const question = questions[index];
  const [prompt, answer, , sourceType, , context] = question;
  const { type, options, lengths } = questionOptions(question);
  if (!study.optionOrder) {
    study.optionOrder = shuffle(options.map((_, index) => index));
    if (type === "order" && checkAnswer(question, study.optionOrder.map(position => options[position]).join(" ")).correct) {
      const other = study.optionOrder.findIndex(position => options[position] !== options[study.optionOrder[0]]);
      if (other > 0) [study.optionOrder[0], study.optionOrder[other]] = [study.optionOrder[other], study.optionOrder[0]];
    }
  }
  const scene = study.scene;
  const stage = study.stage;
  const stages = stage ? requiredStages(view.id) : [];
  const step = stages.indexOf(stage);
  const rule = stage && guidedRule(question, stage, index);
  const previousRule = document.getElementById("guided-rule");
  const sameQuestion = study.renderedQuestion === question;
  const ruleOpen = sameQuestion && previousRule?.open;
  const transcriptOpen = sameQuestion && document.querySelector(".exercise-transcript")?.open;
  study.renderedQuestion = question;
  const displayedAnswer = feedback?.answer && feedback.correct ? feedback.answer : answer;
  const ready = type === "order" && lengths.has(study.order.length);
  const submit = `<div class="actions"><button class="exercise-button" type="submit" ${ready ? "" : "disabled"}>${test ? "Далее" : "Проверить"}</button></div>`;
  const dictation = sourceType === "listen";
  const audioText = context?.audio ?? (dictation ? answer : "");
  const audio = audioText ? `<div class="exercise-audio">
    <span hidden lang="de-CH">${escapeHTML(audioText)}</span>${audioButton("audio-play")}
    ${test && dictation ? '<button class="audio-skip" type="button" data-action="skip-listening">Пропустить задание на слух</button>' : ""}
  </div>` : "";
  const transcript = audioText && !test ? `<details class="dictation-help exercise-transcript"${transcriptOpen ? " open" : ""}>
    <summary>${context ? "Текст и перевод" : "Показать текст, если звук недоступен"}</summary>
    <div class="transcript-body">
      <p>${germanWithHints(audioText)}</p>
      ${context ? `<p>${escapeHTML(context.translation)}</p>` : ""}
    </div>
  </details>` : "";
  const progress = scene || questions.length === 1 ? "" : `<div class="practice-progress">
    <span>${study.review ? "Работа над ошибками · " : ""}Задание ${index + 1} из ${questions.length}</span>
    ${!test && study.streak > 1 ? `<small aria-live="polite">Верных подряд: ${study.streak}</small>` : ""}
  </div>`;
  let fields;
  if (type === "choice") {
    fields = `<div class="choices">${study.optionOrder.map(position => `
      <label class="choice"><input type="radio" name="answer" value="${position}" required>
        <span lang="${answerLanguage(options[position])}">${escapeHTML(options[position])}</span></label>`).join("")}</div>`;
  }
  if (type === "order") {
    fields = `<div class="order-help muted">
      <p>Нажимай на слова по порядку. Повторное нажатие убирает слово из фразы.</p>
      ${lengths.size > 1 || !lengths.has(options.length) ? '<p>Для ответа могут понадобиться не все слова.</p>' : ""}
      </div>
      <div class="word-tray" aria-label="Собранная фраза">${study.order.map(position => `
        <button type="button" lang="de-CH" data-action="remove-word" data-position="${position}">${escapeHTML(options[position])}</button>
      `).join("") || '<span class="muted">Здесь появится фраза</span>'}</div>
      <div class="word-bank" aria-label="Доступные слова">${study.optionOrder.map(position => `
        <button type="button" lang="de-CH" data-action="add-word" data-position="${position}"
          ${study.order.includes(position) ? "disabled" : ""}>${escapeHTML(options[position])}</button>`).join("")}</div>`;
  }
  show(stage ? "" : scene?.title || (test ? "Тест A1.1" : study.review ? "Работа над ошибками" : "Тренировка"),
    "", `
    ${stage ? `<div class="stage-heading">
      <div class="stage-meta">
        <p class="muted">${step < 0 ? "Повторение" : `Шаг ${step + 1} из ${stages.length}`}</p>
        ${step < 0 ? "" : `<span class="stage-track" aria-hidden="true">${stages.map((_, index) =>
          `<span class="${index < step ? "stage-done" : index === step ? "stage-current" : ""}"></span>`).join("")}</span>`}
      </div>
      <h2 class="stage-title" id="section-title">${escapeHTML(stage.title)}</h2>
      ${progress}
    </div>` : progress}
    ${scene ? sceneLine(scene, study.step.line) : ""}
    ${rule ? `<aside class="stage-rule">
      <strong>${escapeHTML(rule[0])}</strong>
      <div class="example">${germanWithHints(rule[2])}${audioButton()}</div>
      <details id="guided-rule"${ruleOpen ? " open" : ""}>
        <summary>Посмотреть правило</summary>${theoryCards([rule])}
      </details>
    </aside>` : ""}
    <div class="panel exercise-panel">
      <h3 class="exercise-question" id="exercise-question" tabindex="-1">${escapeHTML(prompt)}</h3>
      ${audio}
      ${feedback ? `
        <div class="feedback${feedback.correct ? " feedback-correct" : ""}" role="status">
          <strong class="${feedback.correct ? "good" : "wrong"}">${feedback.correct ? "Верно" : "Проверь этот вариант"}</strong>
          ${!feedback.correct ? `<p>Твой ответ: <span lang="${answerLanguage(feedback.value)}">${escapeHTML(feedback.value)}</span></p>` : ""}
          <p><span lang="${answerLanguage(displayedAnswer)}">${escapeHTML(displayedAnswer)}</span>${answerLanguage(displayedAnswer) === "de-CH" ? audioButton() : ""}</p>
        </div>
        <div class="actions"><button class="${feedback.correct ? "success-button" : "exercise-button"}" data-action="next">${(scene || study.stage) && !feedback.correct ? "Попробовать ещё раз" : scene ? "Продолжить разговор" : index + 1 === questions.length ? "Результат" : "Следующее задание"}</button></div>
        ${feedback.correct ? "" : errorRule(question, scene ? study.step.rule : undefined)}`
        : `<form id="answer-form" aria-labelledby="exercise-question">${fields}${submit}</form>`}
      ${transcript}
    </div>`, true);
}

function tidyAnswer(value) {
  return value.normalize("NFC").trim().replace(/[.!?]+$/u, "").replace(/\s+/g, " ").trim();
}

function normalize(value) {
  return tidyAnswer(value).toLowerCase()
    .replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
}

function normalizeGermanWriting(value) {
  return value.normalize("NFC").trim().replace(/\s+/gu, " ")
    .replace(/[’‘]/gu, "'").replace(/ß/gu, "ss").replace(/ẞ/gu, "SS");
}

function checkAnswer(question, value, branches) {
  const [, expected] = question;
  if (branches) return { value, correct: Object.hasOwn(branches, value), answer: value };
  const variants = [expected, ...(acceptedTranslations.get(question) ?? [])];
  const matched = variants.find(variant => normalize(variant) === normalize(value));
  return { value, correct: Boolean(matched), answer: matched };
}

function focusContentControl(selector) {
  const control = elements.content.querySelector(selector);
  if (!control) return;
  control.classList.add("auto-focus");
  control.addEventListener("blur", () => control.classList.remove("auto-focus"), { once: true });
  control.focus();
}

function advance() {
  study.index++;
  study.feedback = null;
  study.order = [];
  study.optionOrder = null;
  if (study.index < study.questions.length) {
    renderQuestion();
    focusContentControl(".exercise-question");
    return;
  }
  const score = study.answers.filter(result => result.correct).length;
  if (study.test) saved.bestTest = Math.max(saved.bestTest ?? 0, score);
  else if (!study.review && view.final) {
    const correctQuestions = new Set(study.questions.filter((_, index) => study.answers[index].correct));
    for (const lesson of course) {
      const correct = lesson.practice.filter(question => correctQuestions.has(question)).length;
      saved.practice[lesson.id] = Math.max(saved.practice[lesson.id] ?? 0, correct);
    }
  } else if (!study.review) {
    saved.practice[view.lesson.id] = Math.max(saved.practice[view.lesson.id] ?? 0, score);
  }
  persist();
  const mistakes = study.answers.map((result, index) => {
    if (result.correct) return "";
    const question = study.questions[index];
    const [prompt, answer] = question;
    return `<article class="panel"><h3>${escapeHTML(prompt)}</h3>
      ${result.skipped ? "<p>Задание пропущено.</p>" : `<p>Твой ответ: <span lang="${answerLanguage(result.value)}">${escapeHTML(result.value)}</span></p>`}
      <p>Вариант ответа: <strong lang="${answerLanguage(answer)}">${escapeHTML(answer)}</strong>${answerLanguage(answer) === "de-CH" ? audioButton() : ""}</p>${errorRule(question)}</article>`;
  }).join("");
  const streak = study.test ? "" : ` · Лучшая серия: ${study.bestStreak}`;
  show("Результат", "", `
    <div class="result-summary">
      <p><strong>${score} <span>из ${study.questions.length}</span></strong></p>
      <p class="muted">Верные ответы${streak}</p>
      <div class="actions">
        ${mistakes && !study.test ? '<button class="primary" data-action="retry-mistakes">Повторить ошибки</button>' : ""}
        <button class="${mistakes && !study.test ? "" : "primary"}" data-action="retry">Пройти ещё раз</button>
      </div>
    </div>
    <div class="stack">${mistakes || '<p class="panel good">Все ответы верны.</p>'}</div>
    `);
  focusContentControl("button");
}

elements.content.addEventListener("submit", event => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  const question = study.questions[study.index];
  const { type, options, lengths } = questionOptions(question);
  const input = event.target.elements.namedItem("answer");
  let value;
  if (type === "order") {
    if (!lengths.has(study.order.length)) return;
    value = study.order.map(position => options[position]).join(" ");
  } else {
    if (!input?.value) return;
    value = options[Number(input.value)];
  }
  const branches = study.scene && study.step.branches;
  const result = checkAnswer(question, value, branches);
  study.answers.push(result);
  if (study.test) advance();
  else {
    study.streak = result.correct ? study.streak + 1 : 0;
    study.bestStreak = Math.max(study.bestStreak, study.streak);
    study.feedback = result;
    renderQuestion();
    focusContentControl("[data-action='next']");
  }
});

elements.content.addEventListener("input", event => {
  const input = event.target;
  if (input.form?.id !== "answer-form" || input.name !== "answer") return;
  input.form.querySelector('[type="submit"]').disabled = !input.checked;
});

elements.content.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  switch (button.dataset.action) {
    case "add-word":
    case "remove-word": {
      const position = Number(button.dataset.position);
      if (button.dataset.action === "add-word") study.order.push(position);
      else study.order = study.order.filter(item => item !== position);
      renderQuestion();
      const action = button.dataset.action === "add-word" ? "remove-word" : "add-word";
      focusContentControl(`[data-action="${action}"][data-position="${position}"]`);
      break;
    }
    case "speak": speak(button); break;
    case "word-hint": toggleWordHint(button); break;
    case "word-language": {
      const reverse = button.dataset.languageFront === "translation";
      if (study?.reverse === reverse) break;
      openWords(reverse);
      focusContentControl("[data-action='word-language'][aria-pressed='true']");
      break;
    }
    case "scheduled-words": openWords(); focusContentControl("[data-action='reveal'], [data-words-status]"); break;
    case "reveal": void flipCard(button); break;
    case "rate-card": gradeCard(button.dataset.rating); focusContentControl("[data-action='reveal'], [data-action='scheduled-words'], [data-words-status]"); break;
    case "start": renderQuestion(); focusContentControl(".exercise-question"); break;
    case "skip-listening":
      study.answers.push({ correct: false, skipped: true });
      advance();
      break;
    case "start-guided":
      startGuidedStage(lessonRoutes[view.id].find(item => item.id === view.topic));
      focusContentControl(".exercise-question");
      break;
    case "next":
      if (study.scene) {
        if (study.feedback.correct) {
          openSceneStep(study.step.branches?.[study.feedback.value] ?? study.step.next);
        } else {
          study.feedback = null;
          study.order = [];
          renderQuestion();
        }
        focusContentControl(".exercise-question, #content a");
      } else if (study.stage) {
        advanceGuidedStage();
        focusContentControl(".exercise-question, .actions a");
      } else advance();
      break;
    case "scene-restart":
      study.answers = [];
      openSceneStep("start");
      focusContentControl(".exercise-question");
      break;
    case "retry": openPractice(); break;
    case "retry-mistakes": {
      const questions = shuffle(study.questions.filter((_, index) => !study.answers[index].correct));
      study = { test: false, review: true, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
      renderQuestion();
      focusContentControl(".exercise-question");
      break;
    }
  }
});

function focusTheoryTopic() {
  if (!["theory", "grammar"].includes(view.section) || !/^\d+$/.test(view.topic || "")) return false;
  const heading = document.getElementById(`topic-title-${view.topic}`);
  if (!heading) return false;
  heading.closest("article").scrollIntoView({ block: "start" });
  heading.focus({ preventScroll: true, focusVisible: false });
  return true;
}

function navigate() {
  readRoute();
  if (focusTheoryTopic()) return;
  if (focusCourseDestination()) return;
  window.scrollTo(0, 0);
  const heading = elements.hero.querySelector("h1");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true, focusVisible: false });
}
function focusCourseDestination() {
  const destination = document.querySelector(":is(#grammar-view, #polyglot-view):not([hidden]) [data-route-focus]");
  if (!destination) return false;
  destination.focus({ preventScroll: true });
  destination.scrollIntoView({ block: "start" });
  return true;
}
window.addEventListener("hashchange", () => {
  if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(navigate);
  } else {
    navigate();
  }
});
readRoute();
focusTheoryTopic();
focusCourseDestination();
