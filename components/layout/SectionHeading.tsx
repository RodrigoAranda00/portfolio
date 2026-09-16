import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-center font-display text-4xl font-bold text-fg">
      <Icon className="mr-3 inline-block size-8 -translate-y-1 align-middle text-white" />
      {children}
    </h2>
  );
}
