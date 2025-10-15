# React Attendance Calendar

A modern, customizable attendance calendar component for React with TypeScript support.

## ✨ Features

- 📅 Responsive design (7-14 columns based on width)
- 🎨 Fully customizable with Tailwind CSS classes
- 🖱️ Interactive date clicks with callbacks
- 📱 Mobile-friendly
- 🔧 TypeScript support
- 🎭 Beautiful default styling included

## 📦 Installation

```bash
npm install react-attendance-calendar
```

### 🎨 CSS Setup

**Simply import the CSS in your app:**

```tsx
// In your main app file (e.g., App.tsx, main.tsx, or _app.tsx)
import "react-attendance-calendar/styles.css";
```

**That's it!** The component will render with beautiful default styling.

> **Note:** No additional setup required. The package includes pre-compiled CSS. If you're using Tailwind CSS v4 in your project, you can customize the component further using the `className` props.

## 🚀 Usage

### Basic Example

```tsx
import { useState } from "react";
import { AttendanceCalendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

function App() {
  const [view, setView] = useState({ year: 2024, monthIndex: 0 });

  return <AttendanceCalendar view={view} onChangeView={setView} />;
}
```

### With Attendance Data

```tsx
import { AttendanceCalendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

const attendanceData = {
  year: 2024,
  monthIndex: 0,
  presentDays: new Set([1, 2, 3, 5, 8, 9, 10]),
  absentDays: new Set([4, 11]),
};

<AttendanceCalendar
  view={view}
  onChangeView={setView}
  attendanceData={attendanceData}
  onDateClick={(day, month, year) => console.log(day, month, year)}
/>;
```

### Custom Styling

```tsx
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  presentCellClassName="bg-blue-500 text-white"
  absentCellClassName="bg-red-500 text-white"
  cellClassName="rounded-full"
/>
```

### Complete Example with Custom Styling

```tsx
import { useState } from "react";
import {
  AttendanceCalendar,
  type MonthView,
  type AttendanceData,
} from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

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

export default App;
```

## 📚 Props

| Prop                        | Type                         | Required | Description                            |
| --------------------------- | ---------------------------- | -------- | -------------------------------------- |
| `view`                      | `MonthView`                  | ✅       | Current month and year                 |
| `onChangeView`              | `(view: MonthView) => void`  | ✅       | Month navigation callback              |
| `attendanceData`            | `AttendanceData`             | ❌       | Present/absent days data               |
| `onDateClick`               | `(day, month, year) => void` | ❌       | Date click callback                    |
| `showNavigation`            | `boolean`                    | ❌       | Show nav arrows (default: `true`)      |
| `showWeekdayHeaders`        | `boolean`                    | ❌       | Show weekday headers (default: `true`) |
| `className`                 | `string`                     | ❌       | Additional classes for root element    |
| `cellClassName`             | `string`                     | ❌       | Custom classes for all cells           |
| `presentCellClassName`      | `string`                     | ❌       | Custom classes for present days        |
| `absentCellClassName`       | `string`                     | ❌       | Custom classes for absent days         |
| `navigationButtonClassName` | `string`                     | ❌       | Custom classes for nav buttons         |
| `monthTitleClassName`       | `string`                     | ❌       | Custom classes for month title         |
| `weekdayHeaderClassName`    | `string`                     | ❌       | Custom classes for weekday headers     |
| `containerClassName`        | `string`                     | ❌       | Custom classes for main container      |

### TypeScript

```typescript
type MonthView = {
  year: number; // e.g., 2024
  monthIndex: number; // 0-11 (0 = January)
};

type AttendanceData = {
  year: number;
  monthIndex: number;
  presentDays: Set<number>; // Day numbers 1-31
  absentDays: Set<number>; // Day numbers 1-31
};
```

## 🎨 Styling

The component uses Tailwind CSS classes. Default theme includes:

- Present days: Green (`emerald-500`)
- Absent days: Orange (`amber-500`)

Customize with any Tailwind classes via the `className` props.

## 📝 License

MIT © [Alamin](https://github.com/alamincodes)

---

<div align="center">
  <a href="https://github.com/alamincodes/attendance-calendar">GitHub</a> • 
  <a href="https://www.npmjs.com/package/react-attendance-calendar">npm</a>
</div>
