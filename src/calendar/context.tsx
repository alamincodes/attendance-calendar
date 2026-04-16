import { createContext, useContext } from "react";
import type { MonthAttendanceData, MonthView } from "./types";

export type CalendarContextValue = {
  view: MonthView;
  monthName: string;
  today: { day: number; month: number; year: number };
  currentMonthData: MonthAttendanceData | undefined;
  columns: number;
  cells: { day: number; inCurrentMonth: boolean }[];
  weekdayLabels: string[];
  goPrev: () => void;
  goNext: () => void;
  onDateClick?: (day: number, month: number, year: number) => void;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendar must be used within <Calendar.Root>");
  }
  return ctx;
}
