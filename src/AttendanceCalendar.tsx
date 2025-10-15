/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes with conflict resolution
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MonthView = {
  year: number;
  monthIndex: number; // 0-11
};

export type MonthAttendanceData = {
  year: number;
  monthIndex: number; // 0-11
  presentDays: Set<number>;
  absentDays: Set<number>;
};

export type AttendanceData = MonthAttendanceData | MonthAttendanceData[];

export type CalendarProps = {
  view?: MonthView;
  onChangeView: (next: MonthView) => void;
  attendanceData?: AttendanceData;
  onDateClick?: (day: number, month: number, year: number) => void;
  showNavigation?: boolean;
  showWeekdayHeaders?: boolean;
  className?: string;
  // Full customization props
  cellClassName?: string;
  presentCellClassName?: string;
  absentCellClassName?: string;
  navigationButtonClassName?: string;
  weekdayHeaderClassName?: string;
  monthTitleClassName?: string;
  containerClassName?: string;
};

const WEEKDAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

function getMonthMatrix({ year, monthIndex }: MonthView, columns: number) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const prevMonthDays = new Date(year, monthIndex, 0).getDate();

  const cells: { day: number; inCurrentMonth: boolean }[] = [];

  for (let i = 0; i < startDay; i++) {
    cells.push({
      day: prevMonthDays - startDay + 1 + i,
      inCurrentMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inCurrentMonth: true });
  }
  let nextMonthDay = 1;
  while (cells.length % columns !== 0) {
    cells.push({ day: nextMonthDay, inCurrentMonth: false });
    nextMonthDay++;
  }

  return cells;
}

export default function AttendanceCalendar({
  view = { year: new Date().getFullYear(), monthIndex: new Date().getMonth() },
  onChangeView,
  attendanceData,
  onDateClick,
  showNavigation = true,
  showWeekdayHeaders = true,
  className = "",
  // Customization props
  cellClassName = "",
  presentCellClassName = "",
  absentCellClassName = "",
  navigationButtonClassName = "",
  weekdayHeaderClassName = "",
  monthTitleClassName = "",
  containerClassName = "",
}: CalendarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState<number>(7);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      const minCellWidth = 64;
      const minGaps = (14 - 1) * 12; // gap-3
      const canFit14 = width >= 8 * minCellWidth + minGaps;
      setColumns(canFit14 ? 14 : 7);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cells = useMemo(() => getMonthMatrix(view, columns), [view, columns]);

  // Generate weekday headers that match the calendar grid structure
  const weekdayHeaders = useMemo(() => {
    return Array.from({ length: columns }).map((_, i) => {
      // Always use standard week order for headers
      return WEEKDAY_LABELS[i % 7];
    });
  }, [columns]);

  const monthName = useMemo(
    () =>
      new Date(view.year, view.monthIndex).toLocaleString("en-US", {
        month: "long",
      }),
    [view]
  );

  const goPrev = () => {
    const m = view.monthIndex - 1;
    if (m < 0) onChangeView({ year: view.year - 1, monthIndex: 11 });
    else onChangeView({ ...view, monthIndex: m });
  };

  const goNext = () => {
    const m = view.monthIndex + 1;
    if (m > 11) onChangeView({ year: view.year + 1, monthIndex: 0 });
    else onChangeView({ ...view, monthIndex: m });
  };

  // Helper function to get attendance data for current month
  const getCurrentMonthData = (): MonthAttendanceData | undefined => {
    if (!attendanceData) return undefined;

    if (Array.isArray(attendanceData)) {
      return attendanceData.find(
        (data) => data.year === view.year && data.monthIndex === view.monthIndex
      );
    } else {
      return attendanceData.year === view.year &&
        attendanceData.monthIndex === view.monthIndex
        ? attendanceData
        : undefined;
    }
  };

  const currentMonthData = getCurrentMonthData();
  const isAttendanceMonth = currentMonthData !== undefined;

  const handleDateClick = (day: number) => {
    if (onDateClick && isAttendanceMonth) {
      onDateClick(day, view.monthIndex, view.year);
    }
  };

  return (
    <div className={cn("w-full", className, containerClassName)}>
      {/* Month header */}
      {showNavigation && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className={cn(
                "size-10 rounded-xl border-2 border-slate-200 text-slate-700 grid place-items-center",
                "transition-colors duration-200 hover:bg-slate-50",
                navigationButtonClassName
              )}
              aria-label="Previous month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button
              onClick={goNext}
              className={cn(
                "size-10 rounded-xl border-2 border-slate-200 text-slate-700 grid place-items-center",
                "transition-colors duration-200 hover:bg-slate-50",
                navigationButtonClassName
              )}
              aria-label="Next month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          <h2
            className={cn(
              "text-2xl font-bold text-slate-900",
              monthTitleClassName
            )}
          >
            {monthName} {view.year}
          </h2>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      )}

      {/* Weekday headers */}
      {showWeekdayHeaders && (
        <div
          className={cn("grid gap-4 text-center mb-6")}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {weekdayHeaders.map((weekday, i) => (
            <div
              key={i}
              className={cn(
                "text-sm font-semibold uppercase tracking-wide py-2",
                "text-slate-500 bg-transparent rounded-xl",
                weekdayHeaderClassName
              )}
            >
              {weekday}
            </div>
          ))}
        </div>
      )}

      {/* Calendar grid */}
      <div
        ref={containerRef}
        className={cn("grid gap-4")}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, idx) => {
          const isPresent =
            isAttendanceMonth &&
            cell.inCurrentMonth &&
            currentMonthData?.presentDays.has(cell.day);
          const isAbsent =
            isAttendanceMonth &&
            cell.inCurrentMonth &&
            currentMonthData?.absentDays.has(cell.day);

          const baseCircle = cn(
            "rounded-2xl grid place-items-center font-semibold cursor-pointer",
            "transition-all duration-200",
            columns >= 14
              ? "size-8 sm:size-12 text-sm"
              : "size-12 sm:size-14 text-base",
            cellClassName
          );

          const isClickable =
            onDateClick && cell.inCurrentMonth && isAttendanceMonth;

          let finalCellClassName = baseCircle;

          if (!cell.inCurrentMonth) {
            finalCellClassName = cn(
              baseCircle,
              "text-slate-400 border-2 border-slate-200"
            );
          } else if (isPresent) {
            finalCellClassName = cn(
              baseCircle,
              "bg-emerald-500 text-white border-2 border-emerald-500",
              presentCellClassName
            );
          } else if (isAbsent) {
            finalCellClassName = cn(
              baseCircle,
              "bg-amber-500 text-white border-2 border-amber-500",
              absentCellClassName
            );
          } else {
            finalCellClassName = cn(
              baseCircle,
              "text-slate-700 border-2 border-slate-200"
            );
          }

          return (
            <div key={idx} className={cn("flex items-center justify-center")}>
              <div
                className={finalCellClassName}
                onClick={() => isClickable && handleDateClick(cell.day)}
                title={
                  isClickable ? `Click to interact with ${cell.day}` : undefined
                }
              >
                {cell.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
