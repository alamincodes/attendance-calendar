/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export type MonthTitlePosition = "left" | "center" | "right";

export type CalendarProps = {
  view?: MonthView;
  onChangeView: (next: MonthView) => void;
  attendanceData?: AttendanceData;
  onDateClick?: (day: number, month: number, year: number) => void;
  showNavigation?: boolean;
  showWeekdayHeaders?: boolean;
  className?: string;
  // Size customization props
  cellSize?: number;
  cellHeight?: number;
  cellWidth?: number;
  // Layout props
  monthTitlePosition?: MonthTitlePosition;
  // Full customization props
  cellClassName?: string;
  presentCellClassName?: string;
  absentCellClassName?: string;
  navigationButtonClassName?: string;
  weekdayHeaderClassName?: string;
  monthTitleClassName?: string;
  containerClassName?: string;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function getMonthMatrix({ year, monthIndex }: MonthView, columns: number) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();

  const cells: { day: number; inCurrentMonth: boolean }[] = [];

  for (let i = 0; i < startDay; i++) {
    cells.push({ day: prevMonthDays - startDay + 1 + i, inCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inCurrentMonth: true });
  }
  let nextDay = 1;
  while (cells.length % columns !== 0) {
    cells.push({ day: nextDay++, inCurrentMonth: false });
  }

  return cells;
}

function NavButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "size-9 rounded-xl border-2 border-slate-200 text-slate-600 grid place-items-center shrink-0",
        "transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95",
        className
      )}
      aria-label={direction === "prev" ? "Previous month" : "Next month"}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <polyline points="15,18 9,12 15,6" />
        ) : (
          <polyline points="9,18 15,12 9,6" />
        )}
      </svg>
    </button>
  );
}

export default function AttendanceCalendar({
  view = { year: new Date().getFullYear(), monthIndex: new Date().getMonth() },
  onChangeView,
  attendanceData,
  onDateClick,
  showNavigation = true,
  showWeekdayHeaders = true,
  className = "",
  cellSize,
  cellHeight,
  cellWidth,
  monthTitlePosition = "center",
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

  const today = useMemo(() => {
    const now = new Date();
    return { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      // Each cell needs ~48px min + gaps; 14 cols need more horizontal space
      setColumns(width >= 700 ? 14 : 7);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cells = useMemo(() => getMonthMatrix(view, columns), [view, columns]);

  const weekdayHeaders = useMemo(
    () => Array.from({ length: columns }).map((_, i) => WEEKDAY_LABELS[i % 7]),
    [columns]
  );

  const monthName = useMemo(
    () => new Date(view.year, view.monthIndex).toLocaleString("en-US", { month: "long" }),
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

  const getCurrentMonthData = (): MonthAttendanceData | undefined => {
    if (!attendanceData) return undefined;
    if (Array.isArray(attendanceData)) {
      return attendanceData.find(
        (d) => d.year === view.year && d.monthIndex === view.monthIndex
      );
    }
    return attendanceData.year === view.year && attendanceData.monthIndex === view.monthIndex
      ? attendanceData
      : undefined;
  };

  const currentMonthData = getCurrentMonthData();
  const isAttendanceMonth = currentMonthData !== undefined;

  // Compute cell inline style once, outside the render loop
  const cellInlineStyle = useMemo((): React.CSSProperties => {
    if (cellSize) return { width: `${cellSize}px`, height: `${cellSize}px` };
    if (cellHeight || cellWidth) {
      return {
        ...(cellWidth ? { width: `${cellWidth}px` } : {}),
        ...(cellHeight ? { height: `${cellHeight}px` } : {}),
      };
    }
    return {};
  }, [cellSize, cellHeight, cellWidth]);

  const hasFixedSize = !!(cellSize || cellHeight || cellWidth);

  // Font size for the cell based on sizing strategy
  const cellFontSize = useMemo(() => {
    if (cellSize) return cellSize > 40 ? "text-base" : "text-sm";
    if (cellHeight || cellWidth) {
      const ref = cellHeight ?? cellWidth ?? 0;
      return ref > 40 ? "text-base" : "text-sm";
    }
    return columns >= 14 ? "text-xs sm:text-sm" : "text-sm sm:text-base";
  }, [cellSize, cellHeight, cellWidth, columns]);

  const handleDateClick = (day: number) => {
    if (onDateClick && isAttendanceMonth) {
      onDateClick(day, view.monthIndex, view.year);
    }
  };

  const titleEl = (
    <h2
      className={cn(
        "text-xl sm:text-2xl font-bold text-slate-900 leading-tight",
        monthTitleClassName
      )}
    >
      {monthName}{" "}
      <span className="text-slate-500 font-semibold">{view.year}</span>
    </h2>
  );

  const renderHeader = () => {
    if (!showNavigation) return null;

    if (monthTitlePosition === "center") {
      return (
        <div className="flex items-center justify-between mb-6 gap-2">
          <NavButton direction="prev" onClick={goPrev} className={navigationButtonClassName} />
          {titleEl}
          <NavButton direction="next" onClick={goNext} className={navigationButtonClassName} />
        </div>
      );
    }

    if (monthTitlePosition === "left") {
      return (
        <div className="flex items-center justify-between mb-6 gap-2">
          {titleEl}
          <div className="flex items-center gap-2">
            <NavButton direction="prev" onClick={goPrev} className={navigationButtonClassName} />
            <NavButton direction="next" onClick={goNext} className={navigationButtonClassName} />
          </div>
        </div>
      );
    }

    // right
    return (
      <div className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-2">
          <NavButton direction="prev" onClick={goPrev} className={navigationButtonClassName} />
          <NavButton direction="next" onClick={goNext} className={navigationButtonClassName} />
        </div>
        {titleEl}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className, containerClassName)}>
      {renderHeader()}

      {showWeekdayHeaders && (
        <div
          className="grid gap-1.5 sm:gap-2 text-center mb-2"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {weekdayHeaders.map((label, i) => (
            <div
              key={i}
              className={cn(
                "text-xs font-semibold uppercase tracking-wider py-1.5",
                "text-slate-400",
                weekdayHeaderClassName
              )}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, idx) => {
          const isPresent =
            isAttendanceMonth && cell.inCurrentMonth && currentMonthData?.presentDays.has(cell.day);
          const isAbsent =
            isAttendanceMonth && cell.inCurrentMonth && currentMonthData?.absentDays.has(cell.day);
          const isToday =
            cell.inCurrentMonth &&
            cell.day === today.day &&
            view.monthIndex === today.month &&
            view.year === today.year;

          const isClickable = !!(onDateClick && cell.inCurrentMonth && isAttendanceMonth);

          const baseCell = cn(
            "grid place-items-center font-semibold rounded-2xl",
            "transition-all duration-200",
            // Responsive default: fill the grid column as a square
            !hasFixedSize && "w-full aspect-square",
            cellFontSize,
            isClickable && "cursor-pointer hover:scale-105 active:scale-95",
            !isClickable && cell.inCurrentMonth && "cursor-default",
            cellClassName
          );

          let stateClass = "";
          if (!cell.inCurrentMonth) {
            stateClass = "text-slate-300 border border-slate-100";
          } else if (isPresent) {
            stateClass = cn(
              "bg-emerald-500 text-white shadow-sm shadow-emerald-200",
              isToday && "ring-2 ring-offset-1 ring-emerald-400",
              presentCellClassName
            );
          } else if (isAbsent) {
            stateClass = cn(
              "bg-amber-500 text-white shadow-sm shadow-amber-200",
              isToday && "ring-2 ring-offset-1 ring-amber-400",
              absentCellClassName
            );
          } else if (isToday) {
            stateClass = "bg-slate-900 text-white";
          } else {
            stateClass = "text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50";
          }

          return (
            <div key={idx} className="flex items-center justify-center p-0.5">
              <div
                className={cn(baseCell, stateClass)}
                style={cellInlineStyle}
                onClick={() => isClickable && handleDateClick(cell.day)}
                title={isClickable ? `${cell.day} ${monthName} ${view.year}` : undefined}
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
