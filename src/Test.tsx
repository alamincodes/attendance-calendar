import React, { useState } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import type { MonthView } from "./AttendanceCalendar";

export default function Test() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0, // January
  });
  return (
    <div className="max-w-4xl mx-auto p-4">
      <AttendanceCalendar view={view} onChangeView={setView} />
    </div>
  );
}
