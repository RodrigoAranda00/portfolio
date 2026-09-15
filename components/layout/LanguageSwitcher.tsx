"use client";

import { useState } from "react";
import { Check, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeLocale = useLocale();
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("changeLanguage")}
            className={cn("cursor-pointer", className)}
          />
        }
      >
        <Languages />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-1">
        {routing.locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => {
              router.replace(pathname, { locale });
              setOpen(false);
            }}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-fg/5",
              locale === activeLocale ? "text-fg" : "text-fg-muted",
            )}
          >
            {localeNames[locale]}
            {locale === activeLocale && <Check className="size-4" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
