import { useCalendar } from "./context";
import { cn } from "./utils";

export type WeekDaysProps = {
  className?: string;
  dayClassName?: string;
  labels?: string[];
};

export function WeekDays({ className, dayClassName, labels }: WeekDaysProps) {
  const { weekdayLabels, columns } = useCalendar();

  const displayLabels = labels
    ? Array.from({ length: columns }, (_, i) => labels[i % labels.length])
    : weekdayLabels;

  return (
    <div
      className={cn("grid gap-1.5 sm:gap-2 text-center mb-2", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {displayLabels.map((label, i) => (
        <div
          key={i}
          className={cn(
            "text-xs font-semibold uppercase tracking-wider py-1.5 text-slate-400",
            dayClassName
          )}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
