import type { LocalVars } from "../types/index.js";

/**
 * Variables for `{{ name }}` placeholders from `<template name="name">` children
 */
export const parseTemplateVars = (el: HTMLElement): LocalVars => {
  const vars: LocalVars = {};
  el.querySelectorAll<HTMLTemplateElement>("template").forEach((template) => {
    const name = template.getAttribute("name");
    if (name !== null) {
      vars[name] = template.innerHTML.trim();
    }
  });
  return vars;
};

/**
 * Inline translations from `<template lang="de">` children, keyed by langcode.
 * `<template lang="default">` is the fallback when no key translates.
 */
export const parseInlineTranslations = (
  el: HTMLElement,
): Record<string, string> => {
  const translations: Record<string, string> = {};
  el.querySelectorAll<HTMLTemplateElement>("template").forEach((template) => {
    const lang = template.getAttribute("lang");
    if (lang !== null) {
      translations[lang] = template.innerHTML.trim();
    }
  });
  return translations;
};
