import { useState } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import type { MonthView, AttendanceData } from "./AttendanceCalendar";

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
    // February 2024
    {
      year: 2024,
      monthIndex: 1,
      presentDays: new Set([
        1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28,
        29,
      ]),
      absentDays: new Set([3, 10, 17, 24]),
    },
    // March 2024
    {
      year: 2024,
      monthIndex: 2,
      presentDays: new Set([
        1, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 25, 26, 27,
        28, 29,
      ]),
      absentDays: new Set([2, 9, 16, 23, 30]),
    },
    // December 2023
    {
      year: 2023,
      monthIndex: 11,
      presentDays: new Set([
        1, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 26, 27, 28,
        29,
      ]),
      absentDays: new Set([2, 9, 16, 23, 25, 30]),
    },
  ];

  const handleDateClick = (day: number, month: number, year: number) => {
    console.log(`Clicked on ${day}/${month + 1}/${year}`);
    alert(`You clicked on ${day}/${month + 1}/${year}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Attendance Calendar
          </h1>
          <p className="text-lg text-slate-600">
            Modern, customizable, and developer-friendly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Basic Example
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Default Theme
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
            />
          </div>
        </div>

        {/* Customization Examples */}
        <div className="grid lg:grid-cols-1 gap-8 mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Circle Cells
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              cellClassName="rounded-full"
              presentCellClassName="rounded-full shadow-lg"
              absentCellClassName="rounded-full border-4 border-red-300"
              navigationButtonClassName="rounded-full bg-blue-500 text-white hover:bg-blue-600"
              weekdayHeaderClassName="rounded-full bg-gray-100"
              monthTitleClassName="text-3xl text-purple-600"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Square Cells
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              cellClassName="rounded-none"
              presentCellClassName="rounded-none bg-green-600 hover:scale-105"
              absentCellClassName="rounded-none bg-red-600 hover:scale-105"
              navigationButtonClassName="rounded-none bg-gray-800 text-white"
              weekdayHeaderClassName="rounded-none bg-gray-200"
              monthTitleClassName="text-2xl text-gray-800"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Less Rounded
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              cellClassName="rounded-lg"
              presentCellClassName="rounded-lg bg-emerald-500 hover:scale-110"
              absentCellClassName="rounded-lg bg-orange-500 hover:scale-110"
              navigationButtonClassName="rounded-lg bg-indigo-500 text-white"
              weekdayHeaderClassName="rounded-lg bg-indigo-50"
              monthTitleClassName="text-2xl text-indigo-700"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Gradient Background
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              onDateClick={handleDateClick}
              containerClassName="p-8 bg-gradient-to-r from-blue-50 to-purple-50"
              cellClassName="rounded-2xl"
              presentCellClassName="rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white"
              absentCellClassName="rounded-2xl bg-gradient-to-r from-red-400 to-red-600 text-white"
              navigationButtonClassName="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              weekdayHeaderClassName="rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"
              monthTitleClassName="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Customization Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">
                Available Props:
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    cellClassName
                  </code>{" "}
                  - All calendar cells
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    presentCellClassName
                  </code>{" "}
                  - Present day cells
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    absentCellClassName
                  </code>{" "}
                  - Absent day cells
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    navigationButtonClassName
                  </code>{" "}
                  - Prev/Next buttons
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    weekdayHeaderClassName
                  </code>{" "}
                  - Weekday headers
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    monthTitleClassName
                  </code>{" "}
                  - Month title
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    containerClassName
                  </code>{" "}
                  - Main container
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">
                Shape Examples:
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">
                    Circle (rounded-full)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 rounded-lg"></div>
                  <span className="text-slate-600 text-sm">
                    Rounded (rounded-lg)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 rounded-none"></div>
                  <span className="text-slate-600 text-sm">
                    Square (rounded-none)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <p className="text-slate-600 text-sm">
              💡 <strong>Pro Tip:</strong> Use any Tailwind CSS classes for
              complete customization freedom!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
