import { useState } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import type {
  MonthView,
  AttendanceData,
  CalendarTheme,
} from "./AttendanceCalendar";

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0, // January
  });

  // Sample attendance data for January 2024
  const attendanceData: AttendanceData = {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([
      1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31,
    ]),
    absentDays: new Set([4, 11, 18, 25]),
  };

  // Custom theme - Modern colors
  const customTheme: CalendarTheme = {
    primaryColor: "#059669", // Emerald 600
    absentColor: "#d97706", // Amber 600
    textColor: "#0f172a", // Slate 900
    borderColor: "#e2e8f0", // Slate 200
    mutedTextColor: "#64748b", // Slate 500
    hoverColor: "#f1f5f9", // Slate 100
    backgroundColor: "#ffffff",
  };

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
              Custom Theme
            </h2>
            <AttendanceCalendar
              view={view}
              onChangeView={setView}
              attendanceData={attendanceData}
              theme={customTheme}
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

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Legend</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-600 text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="text-slate-600 text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
              <span className="text-slate-600 text-sm">No data</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-slate-500 text-sm">
              Click on any date to interact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
