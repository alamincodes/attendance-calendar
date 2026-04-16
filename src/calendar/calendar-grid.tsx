import { useMemo } from "react";
import { useCalendar } from "./context";
import type { CellData, GridClassNames } from "./types";
import { cn } from "./utils";

export type GridProps = {
  className?: string;
  classNames?: GridClassNames;
  cellSize?: number;
  cellHeight?: number;
  cellWidth?: number;
  renderCell?: (state: CellData) => React.ReactNode;
};

function getDefaultCellClasses(
  state: CellData,
  classNames: GridClassNames | undefined,
  hasFixedSize: boolean,
  cellFontSize: string
) {
  const { inCurrentMonth, isPresent, isAbsent, isToday, isClickable } = state;

  const base = cn(
    "grid place-items-center font-semibold rounded-2xl transition-all duration-200",
    !hasFixedSize && "w-full aspect-square",
    cellFontSize,
    isClickable && "cursor-pointer hover:scale-105 active:scale-95",
    !isClickable && inCurrentMonth && "cursor-default",
    classNames?.cell
  );

  let stateClass = "";
  if (!inCurrentMonth) {
    stateClass = cn(
      "text-slate-300 border border-slate-100",
      classNames?.outside
    );
  } else if (isPresent) {
    stateClass = cn(
      "bg-emerald-500 text-white",
      isToday && "ring-2 ring-offset-1 ring-emerald-400",
      classNames?.present
    );
  } else if (isAbsent) {
    stateClass = cn(
      "bg-amber-500 text-white",
      isToday && "ring-2 ring-offset-1 ring-amber-400",
      classNames?.absent
    );
  } else if (isToday) {
    stateClass = "bg-slate-900 text-white";
  } else {
    stateClass =
      "text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50";
  }

  return cn(base, stateClass, isToday && classNames?.today);
}

export function Grid({
  className,
  classNames,
  cellSize,
  cellHeight,
  cellWidth,
  renderCell,
}: GridProps) {
  const {
    cells,
    columns,
    currentMonthData,
    today,
    view,
    monthName,
    onDateClick,
  } = useCalendar();

  const isAttendanceMonth = currentMonthData !== undefined;

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

  const cellFontSize = useMemo(() => {
    if (cellSize) return cellSize > 40 ? "text-base" : "text-sm";
    if (cellHeight || cellWidth) {
      const ref = cellHeight ?? cellWidth ?? 0;
      return ref > 40 ? "text-base" : "text-sm";
    }
    return columns >= 14 ? "text-xs sm:text-sm" : "text-sm sm:text-base";
  }, [cellSize, cellHeight, cellWidth, columns]);

  return (
    <div
      className={cn("grid gap-1.5 sm:gap-2", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((cell, idx) => {
        const isPresent =
          isAttendanceMonth &&
          cell.inCurrentMonth &&
          !!currentMonthData?.presentDays.has(cell.day);
        const isAbsent =
          isAttendanceMonth &&
          cell.inCurrentMonth &&
          !!currentMonthData?.absentDays.has(cell.day);
        const isToday =
          cell.inCurrentMonth &&
          cell.day === today.day &&
          view.monthIndex === today.month &&
          view.year === today.year;
        const isClickable = !!(
          onDateClick &&
          cell.inCurrentMonth &&
          isAttendanceMonth
        );

        const cellData: CellData = {
          day: cell.day,
          date: new Date(view.year, view.monthIndex, cell.day),
          inCurrentMonth: cell.inCurrentMonth,
          isPresent,
          isAbsent,
          isToday,
          isClickable,
        };

        const handleClick = () => {
          if (isClickable) onDateClick!(cell.day, view.monthIndex, view.year);
        };

        if (renderCell) {
          return (
            <div
              key={idx}
              className="flex items-center justify-center p-0.5"
              onClick={handleClick}
            >
              {renderCell(cellData)}
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="flex items-center justify-center p-0.5"
            onClick={handleClick}
          >
            <div
              className={getDefaultCellClasses(
                cellData,
                classNames,
                hasFixedSize,
                cellFontSize
              )}
              style={cellInlineStyle}
              title={
                isClickable
                  ? `${cell.day} ${monthName} ${view.year}`
                  : undefined
              }
            >
              {cell.day}
            </div>
          </div>
        );
      })}
    </div>
  );
}
