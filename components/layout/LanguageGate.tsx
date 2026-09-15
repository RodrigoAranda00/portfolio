"use client";

import { useEffect, useId, useState } from "react";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "language-chosen";
const CLOSE_DURATION = 200;

const ACCENT_STYLES: Record<"indigo" | "maroon", string> = {
  indigo:
    "border-indigo-glow/30 bg-indigo/15 hover:border-indigo-glow/60 hover:bg-indigo/25",
  maroon:
    "border-maroon-glow/30 bg-maroon/15 hover:border-maroon-glow/60 hover:bg-maroon/25",
};

const LOCALE_ACCENT: Record<Locale, keyof typeof ACCENT_STYLES> = {
  en: "indigo",
  es: "maroon",
};

function getPersistedChoice() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function persistLanguageChoice(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  writeLocaleCookie(locale);
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageGate({ children }: { children: React.ReactNode }) {
  const dialogId = useId();
  const [chosen, setChosen] = useState(getPersistedChoice);
  const [closing, setClosing] = useState(false);
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY && event.newValue === "1") {
        setChosen(true);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleChoose(locale: Locale) {
    persistLanguageChoice(locale);

    if (locale !== activeLocale) {
      router.replace(pathname, { locale });
      return;
    }

    setClosing(true);
    window.setTimeout(() => setChosen(true), CLOSE_DURATION);
  }

  return (
    <>
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label="Choose your language / Elige tu idioma"
        data-chosen={chosen}
        suppressHydrationWarning
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-canvas/70 backdrop-blur-2xl transition-opacity duration-200 data-[chosen=true]:hidden",
          closing ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="pointer-events-none absolute -top-24 -left-20 size-64 rounded-full bg-indigo-glow/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-24 size-64 rounded-full bg-maroon-glow/20 blur-3xl" />

        <div
          className={cn(
            "relative flex w-[calc(100%-2rem)] max-w-md flex-col items-center gap-6 rounded-3xl border border-fg/10 bg-base-elevated/70 p-6 shadow-2xl backdrop-blur-xl transition-all duration-200 sm:max-w-lg sm:p-8",
            closing ? "scale-95 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <Languages className="size-8 text-fg-muted" aria-hidden />

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            {routing.locales.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => handleChoose(locale)}
                className={cn(
                  "flex-1 cursor-pointer rounded-2xl border px-6 py-5 font-display text-base font-medium text-fg transition-colors",
                  ACCENT_STYLES[LOCALE_ACCENT[locale]],
                )}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})==="1"){document.getElementById(${JSON.stringify(dialogId)}).setAttribute("data-chosen","true")}}catch(e){}`,
        }}
      />
      {children}
    </>
  );
}
