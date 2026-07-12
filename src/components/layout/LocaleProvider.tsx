"use client";

import { useEffect, useState } from "react";
import { LocaleContext, TRANSLATIONS, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "sollen.locale";

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let saved: string | null = null;
    // localStorage can throw in Safari private mode — never let it break the app.
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = saved === "tr" || saved === "en" ? saved : "en";
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: TRANSLATIONS[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}
