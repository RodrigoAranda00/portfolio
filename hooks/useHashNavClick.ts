"use client";

import { usePathname } from "@/i18n/navigation";

export function useHashNavClick() {
  const pathname = usePathname();

  return function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    if (pathname !== "/") return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };
}
