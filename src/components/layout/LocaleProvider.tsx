"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { LocaleContext, TRANSLATIONS, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "sollen.locale";

function readLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "tr" ? "tr" : "en";
  } catch {
    return "en";
  }
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const storedLocale = useSyncExternalStore(subscribe, readLocale, () => "en" as Locale);
  const [selection, setLocaleState] = useState<Locale | null>(null);
  const locale = selection ?? storedLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
