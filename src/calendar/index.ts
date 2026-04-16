import { Root } from "./calendar-root";
import { Header } from "./calendar-header";
import { Title } from "./calendar-title";
import { PrevTrigger, NextTrigger } from "./calendar-nav";
import { WeekDays } from "./calendar-weekdays";
import { Grid } from "./calendar-grid";

export const Calendar = {
  Root,
  Header,
  Title,
  PrevTrigger,
  NextTrigger,
  WeekDays,
  Grid,
} as const;

export { useCalendar } from "./context";
export { cn } from "./utils";

export type { CalendarContextValue } from "./context";
export type { RootProps } from "./calendar-root";
export type { HeaderProps } from "./calendar-header";
export type { TitleProps } from "./calendar-title";
export type { WeekDaysProps } from "./calendar-weekdays";
export type { GridProps } from "./calendar-grid";
export type {
  MonthView,
  MonthAttendanceData,
  AttendanceData,
  CellData,
  GridClassNames,
} from "./types";
