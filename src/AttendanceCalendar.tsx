import { useEffect, useMemo, useRef, useState } from "react";

export type MonthView = {
  year: number;
  monthIndex: number; // 0-11
};

export type AttendanceData = {
  year: number;
  monthIndex: number; // 0-11
  presentDays: Set<number>;
  absentDays: Set<number>;
};

export type CalendarTheme = {
  primaryColor?: string;
  absentColor?: string;
  textColor?: string;
  borderColor?: string;
  mutedTextColor?: string;
  hoverColor?: string;
  backgroundColor?: string;
};

export type CalendarProps = {
  view: MonthView;
  onChangeView: (next: MonthView) => void;
  attendanceData?: AttendanceData;
  theme?: CalendarTheme;
  onDateClick?: (day: number, month: number, year: number) => void;
  showNavigation?: boolean;
  showWeekdayHeaders?: boolean;
  className?: string;
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
  view,
  onChangeView,
  attendanceData,
  theme = {},
  onDateClick,
  showNavigation = true,
  showWeekdayHeaders = true,
  className = "",
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

  const isAttendanceMonth =
    attendanceData !== undefined &&
    view.year === attendanceData.year &&
    view.monthIndex === attendanceData.monthIndex;

  // Default theme colors - Modern design
  const defaultTheme: Required<CalendarTheme> = {
    primaryColor: "#10b981", // Modern emerald
    absentColor: "#f59e0b", // Modern amber
    textColor: "#0f172a", // Slate 900
    borderColor: "#e2e8f0", // Slate 200
    mutedTextColor: "#64748b", // Slate 500
    hoverColor: "#f1f5f9", // Slate 100
    backgroundColor: "#ffffff",
  };

  const finalTheme = { ...defaultTheme, ...theme };

  const handleDateClick = (day: number) => {
    if (onDateClick && isAttendanceMonth) {
      onDateClick(day, view.monthIndex, view.year);
    }
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{ backgroundColor: finalTheme.backgroundColor }}
    >
      {/* Month header */}
      {showNavigation && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="size-10 rounded-xl border-2 grid place-items-center"
              style={{
                borderColor: finalTheme.borderColor,
                color: finalTheme.textColor,
                backgroundColor: finalTheme.hoverColor,
              }}
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
              className="size-10 rounded-xl border-2 grid place-items-center"
              style={{
                borderColor: finalTheme.borderColor,
                color: finalTheme.textColor,
                backgroundColor: finalTheme.hoverColor,
              }}
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
            className="text-2xl font-bold"
            style={{ color: finalTheme.textColor }}
          >
            {monthName} {view.year}
          </h2>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      )}

      {/* Weekday headers */}
      {showWeekdayHeaders && (
        <div
          className="grid gap-4 text-center mb-6"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {weekdayHeaders.map((weekday, i) => (
            <div
              key={i}
              className="text-sm font-semibold uppercase tracking-wide py-2"
              style={{
                color: finalTheme.mutedTextColor,
                backgroundColor: finalTheme.hoverColor,
                borderRadius: "12px",
              }}
            >
              {weekday}
            </div>
          ))}
        </div>
      )}

      {/* Calendar grid */}
      <div
        ref={containerRef}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, idx) => {
          const isPresent =
            isAttendanceMonth &&
            cell.inCurrentMonth &&
            attendanceData?.presentDays.has(cell.day);
          const isAbsent =
            isAttendanceMonth &&
            cell.inCurrentMonth &&
            attendanceData?.absentDays.has(cell.day);

          const baseCircle =
            columns >= 14
              ? "size-8 sm:size-12 rounded-2xl grid place-items-center text-sm font-semibold cursor-pointer"
              : "size-12 sm:size-14 rounded-2xl grid place-items-center text-base font-semibold cursor-pointer";

          const isClickable =
            onDateClick && cell.inCurrentMonth && isAttendanceMonth;

          let cellStyle: React.CSSProperties = {};
          let cellClassName = baseCircle;

          if (!cell.inCurrentMonth) {
            cellStyle = {
              color: finalTheme.mutedTextColor,
              backgroundColor: finalTheme.hoverColor,
              border: `2px solid ${finalTheme.borderColor}`,
            };
          } else if (isPresent) {
            cellStyle = {
              backgroundColor: finalTheme.primaryColor,
              color: "#ffffff",
              border: `2px solid ${finalTheme.primaryColor}`,
            };
          } else if (isAbsent) {
            cellStyle = {
              backgroundColor: finalTheme.absentColor,
              color: "#ffffff",
              border: `2px solid ${finalTheme.absentColor}`,
            };
          } else {
            cellStyle = {
              color: finalTheme.textColor,
              backgroundColor: "transparent",
              border: `2px solid ${finalTheme.borderColor}`,
            };
          }

          return (
            <div key={idx} className="flex items-center justify-center">
              <div
                className={cellClassName}
                style={cellStyle}
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
