import { type AstroGlobal } from "astro";

export type Locale = "en" | "fr";
export const DEFAULT_LOCALE: Locale = "en";
export const locales: Locale[] = ["en", "fr"];

export function localizePath<T extends string>(
  astro: AstroGlobal,
  path: T
): `${Locale}/${T}` {
  const locale: Locale = (astro.currentLocale ?? DEFAULT_LOCALE) as Locale;
  return `${locale}/${path}`;
}

export function getLocaleFilter(astro: AstroGlobal) {
  return ({ id }: { id: string }) =>
    id.startsWith(astro.currentLocale ?? DEFAULT_LOCALE);
}
