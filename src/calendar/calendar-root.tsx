import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarContext, type CalendarContextValue } from "./context";
import type { AttendanceData, MonthView } from "./types";
import {
  cn,
  findMonthData,
  getMonthMatrix,
  getMonthName,
  getToday,
  navigateMonth,
  WEEKDAY_LABELS,
} from "./utils";

export type RootProps = {
  view?: MonthView;
  onChangeView: (next: MonthView) => void;
  attendanceData?: AttendanceData;
  onDateClick?: (day: number, month: number, year: number) => void;
  children: React.ReactNode;
  className?: string;
};

const DEFAULT_VIEW: MonthView = {
  year: new Date().getFullYear(),
  monthIndex: new Date().getMonth(),
};

export function Root({
  view = DEFAULT_VIEW,
  onChangeView,
  attendanceData,
  onDateClick,
  children,
  className,
}: RootProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(7);

  const today = useMemo(getToday, []);

  const monthName = useMemo(
    () => getMonthName(view.year, view.monthIndex),
    [view.year, view.monthIndex]
  );

  const cells = useMemo(
    () => getMonthMatrix(view, columns),
    [view, columns]
  );

  const currentMonthData = useMemo(
    () => findMonthData(attendanceData, view),
    [attendanceData, view]
  );

  const weekdayLabels = useMemo(
    () => Array.from({ length: columns }, (_, i) => WEEKDAY_LABELS[i % 7]),
    [columns]
  );

  const goPrev = useCallback(
    () => onChangeView(navigateMonth(view, "prev")),
    [onChangeView, view]
  );

  const goNext = useCallback(
    () => onChangeView(navigateMonth(view, "next")),
    [onChangeView, view]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      setColumns(width >= 700 ? 14 : 7);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const value = useMemo<CalendarContextValue>(
    () => ({
      view,
      monthName,
      today,
      currentMonthData,
      columns,
      cells,
      weekdayLabels,
      goPrev,
      goNext,
      onDateClick,
    }),
    [
      view,
      monthName,
      today,
      currentMonthData,
      columns,
      cells,
      weekdayLabels,
      goPrev,
      goNext,
      onDateClick,
    ]
  );

  return (
    <CalendarContext.Provider value={value}>
      <div ref={containerRef} className={cn("w-full", className)}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
}
