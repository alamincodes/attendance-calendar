import { useState } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import type { MonthView, AttendanceData, MonthTitlePosition } from "./AttendanceCalendar";

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0, // January
  });

  // Sample attendance data for January 2024
  // Demo data for multiple months
  const attendanceData: AttendanceData = [
    // January 2024
    {
      year: 2024,
      monthIndex: 0,
      presentDays: new Set([
        1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31,
      ]),
      absentDays: new Set([4, 11, 18, 25]),
    },
    // February 2025
    {
      year: 2025,
      monthIndex: 1,
      presentDays: new Set([
        1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28,
      ]),
      absentDays: new Set([3, 10, 17, 24]),
    },
  ];

  const [titlePosition, setTitlePosition] = useState<MonthTitlePosition>("center");

  const handleDateClick = (day: number, month: number, year: number) => {
    console.log(`Clicked on ${day}/${month + 1}/${year}`);
    alert(`You clicked on ${day}/${month + 1}/${year}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Attendance Calendar
          </h1>
          <p className="text-base text-slate-500">
            Modern, customizable, and developer-friendly
          </p>
        </div>

        {/* Default */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="text-base font-semibold text-slate-800">Default</h2>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 mr-1">Month title position:</span>
              {(["left", "center", "right"] as MonthTitlePosition[]).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setTitlePosition(pos)}
                  className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                    titlePosition === pos
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          <AttendanceCalendar
            view={view}
            onChangeView={setView}
            attendanceData={attendanceData}
            onDateClick={handleDateClick}
            monthTitlePosition={titlePosition}
          />
        </div>

        {/* Variants */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Circle */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Circle Cells</h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              monthTitlePosition="center"
              cellClassName="rounded-full"
              presentCellClassName="shadow-md"
              absentCellClassName="border-0"
              navigationButtonClassName="rounded-full bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
              monthTitleClassName="text-purple-600"
            />
          </div>

          {/* Square */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Square Cells</h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              monthTitlePosition="left"
              cellClassName="rounded-none"
              presentCellClassName="rounded-none bg-green-600"
              absentCellClassName="rounded-none bg-red-500"
              navigationButtonClassName="rounded-none bg-gray-800 border-gray-800 text-white"
              weekdayHeaderClassName="rounded-none"
              monthTitleClassName="text-gray-800"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Custom Size */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Custom Size (50px)</h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              monthTitlePosition="right"
              cellSize={50}
              cellClassName="rounded-xl"
              presentCellClassName="bg-emerald-500"
              absentCellClassName="bg-orange-500"
              navigationButtonClassName="rounded-xl bg-indigo-500 border-indigo-500 text-white"
              monthTitleClassName="text-indigo-700"
            />
          </div>

          {/* Compact */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Compact (32px)</h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              monthTitlePosition="center"
              cellSize={32}
              cellClassName="rounded-full text-xs"
              presentCellClassName="bg-green-500"
              absentCellClassName="bg-red-500"
              navigationButtonClassName="rounded-full bg-gray-600 border-gray-600 text-white size-8"
              monthTitleClassName="text-base text-gray-800"
            />
          </div>
        </div>

        {/* Props reference */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Available Props</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                ["monthTitlePosition", "'left' | 'center' | 'right'"],
                ["cellSize", "Size in px (square)"],
                ["cellWidth / cellHeight", "Custom dimensions"],
                ["cellClassName", "All cells"],
                ["presentCellClassName", "Present day cells"],
                ["absentCellClassName", "Absent day cells"],
                ["navigationButtonClassName", "Prev / Next buttons"],
                ["weekdayHeaderClassName", "Weekday labels"],
                ["monthTitleClassName", "Month title text"],
                ["containerClassName", "Outer wrapper"],
              ].map(([prop, desc]) => (
                <li key={prop} className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">
                    {prop}
                  </code>
                  <span className="text-slate-400">{desc}</span>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">Cell shapes</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Circle", cls: "rounded-full" },
                  { label: "Rounded", cls: "rounded-lg" },
                  { label: "Square", cls: "rounded-none" },
                ].map(({ label, cls }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-emerald-500 ${cls}`} />
                    <span className="text-slate-500 text-xs">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-slate-600 text-xs leading-relaxed">
                  <strong className="text-slate-700">Pro Tip:</strong> Use any Tailwind CSS
                  classes for complete customization. Cells are responsive by default — they
                  fill available space and scale perfectly on all screen sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
