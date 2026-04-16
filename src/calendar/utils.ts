import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AttendanceData, MonthAttendanceData, MonthView } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WEEKDAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export function getMonthMatrix(view: MonthView, columns: number) {
  const firstOfMonth = new Date(view.year, view.monthIndex, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(view.year, view.monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(view.year, view.monthIndex, 0).getDate();

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
  let nextDay = 1;
  while (cells.length % columns !== 0) {
    cells.push({ day: nextDay++, inCurrentMonth: false });
  }

  return cells;
}

export function getMonthName(year: number, monthIndex: number) {
  return new Date(year, monthIndex).toLocaleString("en-US", { month: "long" });
}

export function getToday() {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };
}

export function navigateMonth(
  view: MonthView,
  direction: "prev" | "next"
): MonthView {
  if (direction === "prev") {
    return view.monthIndex === 0
      ? { year: view.year - 1, monthIndex: 11 }
      : { year: view.year, monthIndex: view.monthIndex - 1 };
  }
  return view.monthIndex === 11
    ? { year: view.year + 1, monthIndex: 0 }
    : { year: view.year, monthIndex: view.monthIndex + 1 };
}

export function findMonthData(
  data: AttendanceData | undefined,
  view: MonthView
): MonthAttendanceData | undefined {
  if (!data) return undefined;
  if (Array.isArray(data)) {
    return data.find(
      (d) => d.year === view.year && d.monthIndex === view.monthIndex
    );
  }
  return data.year === view.year && data.monthIndex === view.monthIndex
    ? data
    : undefined;
}
