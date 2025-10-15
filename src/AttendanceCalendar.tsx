import { useEffect, useMemo, useRef, useState } from "react";

export type MonthView = {
  year: number;
  monthIndex: number; // 0-11
};

export type DemoAttendance = {
  year: number;
  monthIndex: number; // 0-11
  presentDays: Set<number>;
  absentDays: Set<number>;
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

type Props = {
  view: MonthView;
  onChangeView: (next: MonthView) => void;
  demoData?: DemoAttendance;
};

export default function AttendanceCalendar({
  view,
  onChangeView,
  demoData,
}: Props) {
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

  const isDemoMonth =
    demoData !== undefined &&
    view.year === demoData.year &&
    view.monthIndex === demoData.monthIndex;

  return (
    <div className="w-full">
      {/* Month header */}
      <div className="flex items-center gap-2 mt-6 mb-4">
        <button
          onClick={goPrev}
          className="size-8 rounded-md border border-border text-dashboard-text grid place-items-center hover:bg-accent"
          aria-label="Previous month"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="size-8 rounded-md border border-border text-dashboard-text grid place-items-center hover:bg-accent"
          aria-label="Next month"
        >
          ›
        </button>
        <h4 className="ml-2 text-lg font-semibold text-dashboard-text">
          {monthName}, {view.year}
        </h4>
      </div>

      {/* Weekday headers */}
      <div
        className="grid gap-3 text-center mb-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {weekdayHeaders.map((weekday, i) => (
          <div key={i} className="text-sm text-muted-foreground">
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        ref={containerRef}
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, idx) => {
          const isPresent =
            isDemoMonth &&
            cell.inCurrentMonth &&
            demoData?.presentDays.has(cell.day);
          const isAbsent =
            isDemoMonth &&
            cell.inCurrentMonth &&
            demoData?.absentDays.has(cell.day);
          const baseCircle =
            columns >= 14
              ? "size-6 sm:size-10 rounded-full grid place-items-center text-md"
              : "size-9 sm:size-10 rounded-full grid place-items-center text-sm";
          const mutedCircle = "text-muted-foreground/60 border border-border";
          const presentCircle = "bg-primary text-white";
          const absentCircle = "bg-red-500 text-white";

          return (
            <div key={idx} className="flex items-center justify-center">
              <div
                className={[
                  baseCircle,
                  cell.inCurrentMonth ? "" : mutedCircle,
                  isPresent ? presentCircle : "",
                  isAbsent ? absentCircle : "",
                ].join(" ")}
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
