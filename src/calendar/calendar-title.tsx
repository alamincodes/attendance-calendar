import { useCalendar } from "./context";
import { cn } from "./utils";

export type TitleProps = {
  className?: string;
  /** Classes for the year span only (overrides default `text-slate-500`) */
  yearClassName?: string;
  format?: (monthName: string, year: number) => React.ReactNode;
};

export function Title({ className, yearClassName, format }: TitleProps) {
  const { monthName, view } = useCalendar();

  if (format) return <>{format(monthName, view.year)}</>;

  return (
    <h2
      className={cn(
        "text-xl sm:text-2xl font-bold text-slate-900 leading-tight",
        className
      )}
    >
      {monthName}{" "}
      <span className={cn("font-semibold text-slate-500", yearClassName)}>
        {view.year}
      </span>
    </h2>
  );
}
