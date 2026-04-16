export type MonthView = {
  year: number;
  monthIndex: number;
};

export type MonthAttendanceData = {
  year: number;
  monthIndex: number;
  presentDays: Set<number>;
  absentDays: Set<number>;
};

export type AttendanceData = MonthAttendanceData | MonthAttendanceData[];

export type CellData = {
  day: number;
  date: Date;
  inCurrentMonth: boolean;
  isPresent: boolean;
  isAbsent: boolean;
  isToday: boolean;
  isClickable: boolean;
};

export type GridClassNames = {
  cell?: string;
  present?: string;
  absent?: string;
  today?: string;
  outside?: string;
};
