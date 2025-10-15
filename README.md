# Attendance Calendar

A highly customizable and developer-friendly React attendance calendar component with TypeScript support. This component provides a clean, modern interface for displaying attendance data with interactive features and full theme customization.

## ✨ Features

- 📅 **Responsive Design**: Automatically adjusts between 7 and 14 columns based on container width
- 🎨 **Full Theme Customization**: Customize all colors, borders, and styling
- 🖱️ **Interactive Dates**: Click on dates to trigger custom actions
- 📱 **Mobile Friendly**: Responsive design that works on all screen sizes
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Lightweight**: Minimal dependencies, only requires React
- 🎯 **Accessible**: Includes proper ARIA labels and semantic HTML
- 🎛️ **Developer Friendly**: Extensive props for customization
- 🎭 **Pure Tailwind CSS**: No external CSS dependencies

## Installation

```bash
npm install attendance-calendar
```

## Usage

### Basic Usage

```tsx
import React, { useState } from "react";
import { AttendanceCalendar, MonthView } from "attendance-calendar";

function App() {
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
```

### With Attendance Data & Custom Theme

```tsx
import React, { useState } from "react";
import {
  AttendanceCalendar,
  MonthView,
  AttendanceData,
  CalendarTheme,
} from "attendance-calendar";

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0, // January
  });

  // Sample attendance data
  const attendanceData: AttendanceData = {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([
      1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31,
    ]),
    absentDays: new Set([4, 11, 18, 25]),
  };

  // Custom theme
  const customTheme: CalendarTheme = {
    primaryColor: "#10b981", // Green for present
    absentColor: "#f59e0b", // Orange for absent
    textColor: "#1f2937",
    borderColor: "#d1d5db",
    mutedTextColor: "#9ca3af",
    hoverColor: "#f3f4f6",
    backgroundColor: "#ffffff",
  };

  const handleDateClick = (day: number, month: number, year: number) => {
    console.log(`Clicked on ${day}/${month + 1}/${year}`);
    // Your custom logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AttendanceCalendar
        view={view}
        onChangeView={setView}
        attendanceData={attendanceData}
        theme={customTheme}
        onDateClick={handleDateClick}
        showNavigation={true}
        showWeekdayHeaders={true}
        className="border border-gray-200 rounded-lg p-4"
      />
    </div>
  );
}
```

## Props

### AttendanceCalendar

| Prop                 | Type                                                 | Required | Description                                     |
| -------------------- | ---------------------------------------------------- | -------- | ----------------------------------------------- |
| `view`               | `MonthView`                                          | ✅       | Current month view with year and month index    |
| `onChangeView`       | `(view: MonthView) => void`                          | ✅       | Callback when user navigates to different month |
| `attendanceData`     | `AttendanceData`                                     | ❌       | Optional attendance data to display             |
| `theme`              | `CalendarTheme`                                      | ❌       | Custom theme colors and styling                 |
| `onDateClick`        | `(day: number, month: number, year: number) => void` | ❌       | Callback when a date is clicked                 |
| `showNavigation`     | `boolean`                                            | ❌       | Show/hide month navigation (default: true)      |
| `showWeekdayHeaders` | `boolean`                                            | ❌       | Show/hide weekday headers (default: true)       |
| `className`          | `string`                                             | ❌       | Additional CSS classes                          |

### Types

```tsx
type MonthView = {
  year: number;
  monthIndex: number; // 0-11 (0 = January, 11 = December)
};

type AttendanceData = {
  year: number;
  monthIndex: number; // 0-11
  presentDays: Set<number>; // Set of day numbers (1-31)
  absentDays: Set<number>; // Set of day numbers (1-31)
};

type CalendarTheme = {
  primaryColor?: string; // Color for present days (default: "#3b82f6")
  absentColor?: string; // Color for absent days (default: "#ef4444")
  textColor?: string; // Main text color (default: "#1f2937")
  borderColor?: string; // Border color (default: "#e5e7eb")
  mutedTextColor?: string; // Muted text color (default: "#6b7280")
  hoverColor?: string; // Hover background color (default: "#f3f4f6")
  backgroundColor?: string; // Background color (default: "#ffffff")
};
```

## Styling

The component uses Tailwind CSS classes. Make sure you have Tailwind CSS installed and configured in your project. The component uses these standard Tailwind classes:

- Layout: `w-full`, `flex`, `grid`, `gap-3`, `gap-4`, `items-center`, `justify-center`
- Sizing: `size-8`, `size-10`, `size-12`, `size-14`
- Colors: `bg-emerald-500`, `bg-amber-500`, `text-slate-900`, `text-slate-600`
- Borders: `border`, `border-slate-200`, `rounded-xl`, `rounded-2xl`
- Spacing: `mb-4`, `mb-6`, `mb-8`, `p-6`, `p-8`
- Typography: `text-xl`, `text-2xl`, `font-semibold`, `font-bold`

### Custom Styling

You can customize the appearance using the `theme` prop or by adding custom CSS classes:

```tsx
// Example with custom styling
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  attendanceData={attendanceData}
  theme={{
    primaryColor: "#3b82f6",
    absentColor: "#ef4444",
    textColor: "#1f2937",
  }}
  className="my-custom-calendar"
/>
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
