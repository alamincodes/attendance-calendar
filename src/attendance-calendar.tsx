import { Calendar } from "./calendar";
import type {
  AttendanceData,
  CellData,
  GridClassNames,
  MonthView,
} from "./calendar/types";

export type AttendanceCalendarProps = {
  view?: MonthView;
  onChangeView: (next: MonthView) => void;
  attendanceData?: AttendanceData;
  onDateClick?: (day: number, month: number, year: number) => void;
  showNavigation?: boolean;
  showWeekDays?: boolean;
  className?: string;
  classNames?: GridClassNames;
  cellSize?: number;
  cellHeight?: number;
  cellWidth?: number;
  renderCell?: (state: CellData) => React.ReactNode;
};

export default function AttendanceCalendar({
  view,
  onChangeView,
  attendanceData,
  onDateClick,
  showNavigation = true,
  showWeekDays = true,
  className,
  classNames,
  cellSize,
  cellHeight,
  cellWidth,
  renderCell,
}: AttendanceCalendarProps) {
  return (
    <Calendar.Root
      view={view}
      onChangeView={onChangeView}
      attendanceData={attendanceData}
      onDateClick={onDateClick}
      className={className}
    >
      {showNavigation && (
        <Calendar.Header>
          <Calendar.PrevTrigger />
          <Calendar.Title />
          <Calendar.NextTrigger />
        </Calendar.Header>
      )}
      {showWeekDays && <Calendar.WeekDays />}
      <Calendar.Grid
        classNames={classNames}
        cellSize={cellSize}
        cellHeight={cellHeight}
        cellWidth={cellWidth}
        renderCell={renderCell}
      />
    </Calendar.Root>
  );
}
