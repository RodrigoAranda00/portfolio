export { cn } from "cn";

export function formatMonth(value: string, locale: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1));
}
