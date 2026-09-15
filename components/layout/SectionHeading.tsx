import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center justify-center gap-3 text-center font-display text-4xl font-bold text-fg">
      <Icon className="size-8 text-white" />
      {children}
    </h2>
  );
}
