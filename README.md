# React Attendance Calendar

A highly customizable and developer-friendly React attendance calendar component with TypeScript support. This component provides a clean, modern interface for displaying attendance data with interactive features and complete styling control through Tailwind CSS classes.

## ✨ Features

- 📅 **Responsive Design**: Automatically adjusts between 7 and 14 columns based on container width
- 🎨 **Complete Styling Control**: Use any Tailwind CSS classes for full customization
- 🖱️ **Interactive Dates**: Click on dates to trigger custom actions
- 📱 **Mobile Friendly**: Responsive design that works on all screen sizes
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Lightweight**: Minimal dependencies, only requires React
- 🎯 **Accessible**: Includes proper ARIA labels and semantic HTML
- 🎛️ **Developer Friendly**: Granular className props for every element
- 🎭 **Pure Tailwind CSS**: No external CSS dependencies, uses `clsx` and `tailwind-merge`

## Installation

```bash
npm install react-attendance-calendar
```

## Usage

### Basic Usage

```tsx
import React, { useState } from "react";
import { AttendanceCalendar, MonthView } from "react-attendance-calendar";

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

### With Attendance Data & Custom Styling

```tsx
import React, { useState } from "react";
import {
  AttendanceCalendar,
  MonthView,
  AttendanceData,
} from "react-attendance-calendar";

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
        onDateClick={handleDateClick}
        showNavigation={true}
        showWeekdayHeaders={true}
        // Custom styling with className props
        cellClassName="rounded-full"
        presentCellClassName="bg-green-500 text-white shadow-lg"
        absentCellClassName="bg-red-500 text-white border-2 border-red-300"
        navigationButtonClassName="bg-blue-500 text-white hover:bg-blue-600"
        monthTitleClassName="text-3xl text-purple-600"
        containerClassName="border border-gray-200 rounded-lg p-4"
      />
    </div>
  );
}
```

## Props

### AttendanceCalendar

| Prop                        | Type                                                 | Required | Description                                     |
| --------------------------- | ---------------------------------------------------- | -------- | ----------------------------------------------- |
| `view`                      | `MonthView`                                          | ✅       | Current month view with year and month index    |
| `onChangeView`              | `(view: MonthView) => void`                          | ✅       | Callback when user navigates to different month |
| `attendanceData`            | `AttendanceData`                                     | ❌       | Optional attendance data to display             |
| `onDateClick`               | `(day: number, month: number, year: number) => void` | ❌       | Callback when a date is clicked                 |
| `showNavigation`            | `boolean`                                            | ❌       | Show/hide month navigation (default: true)      |
| `showWeekdayHeaders`        | `boolean`                                            | ❌       | Show/hide weekday headers (default: true)       |
| `className`                 | `string`                                             | ❌       | Additional CSS classes for main container       |
| `cellClassName`             | `string`                                             | ❌       | CSS classes for all calendar cells              |
| `presentCellClassName`      | `string`                                             | ❌       | CSS classes for present day cells               |
| `absentCellClassName`       | `string`                                             | ❌       | CSS classes for absent day cells                |
| `navigationButtonClassName` | `string`                                             | ❌       | CSS classes for prev/next buttons               |
| `weekdayHeaderClassName`    | `string`                                             | ❌       | CSS classes for weekday headers                 |
| `monthTitleClassName`       | `string`                                             | ❌       | CSS classes for month title                     |
| `containerClassName`        | `string`                                             | ❌       | CSS classes for main container                  |

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
```

## Styling

The component uses Tailwind CSS classes with the `cn` utility function (combining `clsx` and `tailwind-merge`) for optimal class merging. Make sure you have Tailwind CSS installed and configured in your project.

### Default Styling

The component comes with modern, clean default styles:

- **Present days**: `bg-emerald-500 text-white`
- **Absent days**: `bg-amber-500 text-white`
- **Regular days**: `text-slate-700 border-2 border-slate-200`
- **Navigation buttons**: `border-2 border-slate-200 text-slate-700`

### Custom Styling with className Props

You have complete control over styling using the granular className props:

```tsx
// Example with complete customization
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  attendanceData={attendanceData}
  // Shape customization
  cellClassName="rounded-full"
  presentCellClassName="bg-green-500 text-white shadow-lg"
  absentCellClassName="bg-red-500 text-white border-4 border-red-300"
  // Navigation styling
  navigationButtonClassName="bg-blue-500 text-white hover:bg-blue-600"
  weekdayHeaderClassName="bg-gray-100 rounded-lg"
  monthTitleClassName="text-3xl text-purple-600"
  // Container styling
  containerClassName="border border-gray-200 rounded-lg p-4"
/>
```

### Available Styling Options

- **Shapes**: `rounded-full`, `rounded-lg`, `rounded-none`, `rounded-2xl`
- **Colors**: Any Tailwind color classes (`bg-blue-500`, `text-red-600`, etc.)
- **Effects**: `shadow-lg`, `hover:scale-105`, `transition-all`
- **Gradients**: `bg-gradient-to-r from-blue-500 to-purple-500`
- **Borders**: `border-2`, `border-4`, `border-dashed`

### Pro Tips

- Use `cn()` utility for conditional classes: `cn("base-class", condition && "conditional-class")`
- Combine multiple effects: `"bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg"`
- Override default colors completely with your own Tailwind classes

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
