import { Badge } from "@/components/ui/badge";
import { skillIcons } from "@/lib/skill-icons";

export function StackBadges({ stack }: { stack: string[] }) {
  return (
    <>
      {stack.map((tech) => {
        const Icon = skillIcons[tech];
        return (
          <Badge
            key={tech}
            variant="secondary"
            className="h-6 gap-1.5 px-2.5 text-sm"
          >
            {Icon && <Icon />}
            {tech}
          </Badge>
        );
      })}
    </>
  );
}
