"use strict";

const languagePreference = "deutsch-a11.language";
const languageURL = new URL(location.href);
let preferredLanguage;
try { preferredLanguage = localStorage.getItem(languagePreference); } catch {}
const courseLanguage = (languageURL.searchParams.get("lang") ?? preferredLanguage) === "uk" ? "uk" : "ru";

for (const link of document.querySelectorAll("[data-language]")) {
  const language = link.dataset.language;
  const target = new URL(languageURL);
  target.searchParams.set("lang", language);
  link.href = target.href;
  if (language === courseLanguage) link.setAttribute("aria-current", "true");
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    try { localStorage.setItem(languagePreference, language); } catch {}
    if (language !== courseLanguage) {
      target.hash = location.hash;
      location.assign(target);
    }
  });
}

function lookupUkrainian(phrase) {
  if (Object.hasOwn(ukrainianMessages, phrase)) return ukrainianMessages[phrase];
  if (typeof ukrainianCourseMessages !== "undefined" && Object.hasOwn(ukrainianCourseMessages, phrase)) {
    return ukrainianCourseMessages[phrase];
  }
  return null;
}

function courseText(value, ...values) {
  if (values.length) return courseText(value).replace(/#(\d+)/gu, (match, index) => values[index - 1] ?? match);
  if (courseLanguage !== "uk" || !/[А-Яа-яЁё]/u.test(value)) return value;
  const phrase = value.trim();
  const exact = lookupUkrainian(phrase);
  if (exact) return value.replace(phrase, () => exact);
  const numbers = [];
  const template = phrase.replace(/\d+(?:[.,]\d+)?/gu, number => {
    numbers.push(number);
    return "#" + numbers.length;
  });
  const format = lookupUkrainian(template);
  if (format) return value.replace(phrase, () => format.replace(/#(\d+)/gu, (match, index) => numbers[index - 1] ?? match));
  if (phrase.startsWith("Повторить ") && /\d/u.test(phrase)) {
    return value.replace("Повторить ", "Повторити ");
  }
  if (phrase.startsWith("По расписанию: ")) {
    const timing = phrase.slice("По расписанию: ".length).replace(/\.$/u, "");
    return value.replace(phrase, () => `За розкладом: ${lookupUkrainian(timing) ?? timing}.`);
  }
  const numbered = /^(\d+\.\s+)([\s\S]+)/u.exec(value);
  if (numbered) return numbered[1] + courseText(numbered[2]);
  const parts = value.split(/(\s*·\s*|\n\n)/u);
  return parts.length > 1 ? parts.map(part => courseText(part)).join("") : value;
}

if (courseLanguage === "uk") {
  document.documentElement.lang = "uk";
  const translatedNodes = new WeakMap();

  function localizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest("script, style, textarea, [data-language], [data-user-text]") ||
          translatedNodes.get(node) === node.data) return;
      const translated = courseText(node.data);
      if (translated !== node.data) {
        translatedNodes.set(node, translated);
        node.data = translated;
        const parent = node.parentElement;
        if (parent?.lang === "ru" || (parent?.lang.startsWith("de") && !/[a-z]/iu.test(translated))) {
          parent.lang = "uk";
        }
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    for (const attribute of ["aria-label", "title", "placeholder"]) {
      const value = node.getAttribute(attribute);
      if (value) {
        const translated = courseText(value);
        if (translated !== value) node.setAttribute(attribute, translated);
      }
    }
    for (const child of node.childNodes) localizeNode(child);
  }

  localizeNode(document.querySelector("title"));
  localizeNode(document.body);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "characterData") localizeNode(record.target);
      else for (const node of record.addedNodes) localizeNode(node);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
}
