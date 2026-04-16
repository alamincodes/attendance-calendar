import { useState } from "react";
import AttendanceCalendar from "./attendance-calendar";
import { Calendar, useCalendar } from "./calendar";
import type { MonthView, AttendanceData } from "./calendar/types";

const DEMO_DATA: AttendanceData = [
  {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([
      1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31,
    ]),
    absentDays: new Set([4, 11, 18, 25]),
  },
  {
    year: 2025,
    monthIndex: 1,
    presentDays: new Set([
      1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27,
      28,
    ]),
    absentDays: new Set([3, 10, 17, 24]),
  },
];

function CustomCellDemo() {
  const { monthName, view } = useCalendar();

  return (
    <Calendar.Grid
      renderCell={(cell) => {
        if (!cell.inCurrentMonth) {
          return (
            <div className="w-full aspect-square grid place-items-center text-xs text-slate-200">
              {cell.day}
            </div>
          );
        }

        return (
          <div
            className={`w-full aspect-square grid place-items-center rounded-xl text-sm font-medium transition-all ${
              cell.isPresent
                ? "bg-green-100 text-green-700 border border-green-200"
                : cell.isAbsent
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : cell.isToday
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
            }`}
            title={`${cell.day} ${monthName} ${view.year}`}
          >
            <span>{cell.day}</span>
            {cell.isPresent && <span className="text-[10px]">✓</span>}
            {cell.isAbsent && <span className="text-[10px]">✗</span>}
          </div>
        );
      }}
    />
  );
}

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0,
  });

  const handleDateClick = (day: number, month: number, year: number) => {
    alert(`Clicked: ${day}/${month + 1}/${year}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Attendance Calendar
          </h1>
          <p className="text-base text-slate-500">
            Compound component architecture — compose your own calendar
          </p>
        </div>

        {/* 1. Simple pre-composed usage */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-5">
            Simple Usage (pre-composed)
          </h2>
          <AttendanceCalendar
            view={view}
            onChangeView={setView}
            attendanceData={DEMO_DATA}
            onDateClick={handleDateClick}
          />
        </section>

        {/* 2. Compound: custom classNames */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Circle + classNames
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={DEMO_DATA}
              onDateClick={handleDateClick}
              classNames={{
                cell: "rounded-full",
                present: "shadow-md bg-teal-500",
                absent: "bg-rose-500",
                today: "ring-2 ring-blue-400",
              }}
            />
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Square + classNames
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={DEMO_DATA}
              onDateClick={handleDateClick}
              classNames={{
                cell: "rounded-none",
                present: "bg-green-600 rounded-none",
                absent: "bg-red-500 rounded-none",
              }}
            />
          </section>
        </div>

        {/* 3. Compound components: full control */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-5">
            Compound Components — custom nav buttons
          </h2>
          <Calendar.Root
            view={view}
            onChangeView={setView}
            attendanceData={DEMO_DATA}
            onDateClick={handleDateClick}
          >
            <Calendar.Header>
              <Calendar.Title className="text-indigo-700" />
              <div className="flex items-center gap-2">
                <Calendar.PrevTrigger className="rounded-full bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600">
                  ←
                </Calendar.PrevTrigger>
                <Calendar.NextTrigger className="rounded-full bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600">
                  →
                </Calendar.NextTrigger>
              </div>
            </Calendar.Header>
            <Calendar.WeekDays dayClassName="text-indigo-400" />
            <Calendar.Grid
              classNames={{
                present: "bg-indigo-500",
                absent: "bg-pink-500",
                today: "ring-2 ring-indigo-300",
              }}
            />
          </Calendar.Root>
        </section>

        {/* 4. Custom cell rendering */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-5">
            Custom Cell Rendering (renderCell)
          </h2>
          <Calendar.Root
            view={view}
            onChangeView={setView}
            attendanceData={DEMO_DATA}
            onDateClick={handleDateClick}
          >
            <Calendar.Header className="mb-4">
              <Calendar.Title
                format={(month, year) => (
                  <span className="text-lg font-medium text-slate-700">
                    {month} {year}
                  </span>
                )}
              />
              <div className="flex gap-1">
                <Calendar.PrevTrigger className="size-8 rounded-lg border border-slate-200 text-slate-500" />
                <Calendar.NextTrigger className="size-8 rounded-lg border border-slate-200 text-slate-500" />
              </div>
            </Calendar.Header>
            <Calendar.WeekDays />
            <CustomCellDemo />
          </Calendar.Root>
        </section>

        {/* 5. Compact fixed-size */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Compact (32px)
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={DEMO_DATA}
              onDateClick={handleDateClick}
              cellSize={32}
              classNames={{ cell: "rounded-full text-xs" }}
            />
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              Large (50px)
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={DEMO_DATA}
              onDateClick={handleDateClick}
              cellSize={50}
              classNames={{ cell: "rounded-xl" }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
