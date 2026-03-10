# React Attendance Calendar

A modern, responsive, and highly customizable attendance calendar component for React with full TypeScript support. Perfect for tracking employee attendance, student presence, or any date-based status system.

## ✨ Features

- 📅 **Responsive design** - Automatically switches between 7-14 columns based on container width
- 🎨 **Fully customizable** - Complete control with Tailwind CSS classes
- 🖱️ **Interactive** - Date click callbacks with hover effects
- 📱 **Mobile-friendly** - Fluid cells scale with container — no overflow on any screen size
- 🔧 **TypeScript support** - Full type safety and IntelliSense
- 🎭 **Beautiful defaults** - Modern design with emerald/amber color scheme
- 📊 **Multi-month support** - Provide attendance data for multiple months at once
- 🔄 **Flexible data format** - Support both single month and array of months
- ⚡ **Auto-initialization** - Defaults to current month if no view provided
- 🎯 **Smart navigation** - Seamless month/year transitions
- 🗓️ **Today highlight** - Current date is automatically highlighted
- 📐 **Flexible header** - Position month title left, center, or right

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

### Minimal Example (Auto-initialize to current month)

```tsx
import { AttendanceCalendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

function App() {
  const [view, setView] = useState();

  return <AttendanceCalendar onChangeView={setView} />;
}
```

### With Single Month Attendance Data

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

### With Multiple Months Attendance Data

```tsx
import { AttendanceCalendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

// Provide data for multiple months at once
const attendanceData = [
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

<AttendanceCalendar
  view={view}
  onChangeView={setView}
  attendanceData={attendanceData}
  onDateClick={(day, month, year) => console.log(day, month, year)}
/>;
```

### Custom Month Title Position

```tsx
// Center (default) — [←]  January 2024  [→]
<AttendanceCalendar view={view} onChangeView={setView} monthTitlePosition="center" />

// Left — January 2024  [← →]
<AttendanceCalendar view={view} onChangeView={setView} monthTitlePosition="left" />

// Right — [← →]  January 2024
<AttendanceCalendar view={view} onChangeView={setView} monthTitlePosition="right" />
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

### Custom Cell Sizes

```tsx
// Square cells with custom size
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  cellSize={60} // 60px x 60px cells
/>

// Custom width and height
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  cellWidth={80}  // 80px wide
  cellHeight={50} // 50px tall
/>

// Small compact calendar
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  cellSize={32} // 32px x 32px cells
  cellClassName="text-xs"
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

  // Sample attendance data for multiple months
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

| Prop                        | Type                         | Required | Description                                        |
| --------------------------- | ---------------------------- | -------- | -------------------------------------------------- |
| `view`                      | `MonthView`                  | ❌       | Current month and year (defaults to current month) |
| `onChangeView`              | `(view: MonthView) => void`  | ✅       | Month navigation callback                          |
| `attendanceData`            | `AttendanceData`             | ❌       | Present/absent days data (single month or array)   |
| `onDateClick`               | `(day, month, year) => void` | ❌       | Date click callback                                |
| `monthTitlePosition`        | `'left' \| 'center' \| 'right'` | ❌    | Position of the month title (default: `'center'`)  |
| `showNavigation`            | `boolean`                    | ❌       | Show nav arrows (default: `true`)                  |
| `showWeekdayHeaders`        | `boolean`                    | ❌       | Show weekday headers (default: `true`)             |
| `cellSize`                  | `number`                     | ❌       | Size in pixels for all calendar cells (square)     |
| `cellHeight`                | `number`                     | ❌       | Height in pixels for calendar cells                |
| `cellWidth`                 | `number`                     | ❌       | Width in pixels for calendar cells                 |
| `className`                 | `string`                     | ❌       | Additional classes for root element                |
| `cellClassName`             | `string`                     | ❌       | Custom classes for all cells                       |
| `presentCellClassName`      | `string`                     | ❌       | Custom classes for present days                    |
| `absentCellClassName`       | `string`                     | ❌       | Custom classes for absent days                     |
| `navigationButtonClassName` | `string`                     | ❌       | Custom classes for nav buttons                     |
| `monthTitleClassName`       | `string`                     | ❌       | Custom classes for month title                     |
| `weekdayHeaderClassName`    | `string`                     | ❌       | Custom classes for weekday headers                 |
| `containerClassName`        | `string`                     | ❌       | Custom classes for main container                  |

### TypeScript

```typescript
type MonthView = {
  year: number; // e.g., 2024
  monthIndex: number; // 0-11 (0 = January)
};

type MonthAttendanceData = {
  year: number;
  monthIndex: number;
  presentDays: Set<number>; // Day numbers 1-31
  absentDays: Set<number>; // Day numbers 1-31
};

// Support both single month and multiple months
type AttendanceData = MonthAttendanceData | MonthAttendanceData[];

type MonthTitlePosition = "left" | "center" | "right";
```

## 🎨 Styling

The component uses Tailwind CSS classes with a modern design system:

### Default Theme

- **Present days**: Emerald green (`emerald-500`) with white text
- **Absent days**: Amber orange (`amber-500`) with white text
- **Regular days**: Slate gray (`slate-700`) with light border
- **Navigation**: Rounded buttons with hover effects
- **Typography**: Clean, readable fonts with proper hierarchy

### Responsive Behavior

- **All screens**: Cells use `w-full aspect-square` by default — they fluidly fill the grid column with no overflow
- **Desktop (≥700px container)**: Switches to 14-column layout
- **Narrow containers / mobile**: 7-column layout with touch-friendly sizing
- **Fixed size mode**: Use `cellSize`, `cellWidth`, or `cellHeight` for explicit pixel dimensions

### Customization

Override any styling using the `className` props and size controls:

#### Size Control

- **`cellSize`** - Set both width and height for square cells
- **`cellWidth`** - Set only the width of cells
- **`cellHeight`** - Set only the height of cells
- **Automatic font sizing** - Text size adjusts based on cell dimensions

#### Styling Options

All Tailwind classes are supported:

- Colors, spacing, borders, shadows
- Hover effects, transitions, animations
- Responsive breakpoints and utilities

## 🔄 Multi-Month Data Format

The `attendanceData` prop supports two formats:

### Single Month (Legacy Format)

```typescript
const attendanceData: AttendanceData = {
  year: 2024,
  monthIndex: 0,
  presentDays: new Set([1, 2, 3, 5, 8]),
  absentDays: new Set([4, 6, 7]),
};
```

### Multiple Months (New Format)

```typescript
const attendanceData: AttendanceData = [
  {
    year: 2024,
    monthIndex: 0, // January
    presentDays: new Set([1, 2, 3, 5, 8]),
    absentDays: new Set([4, 6, 7]),
  },
  {
    year: 2024,
    monthIndex: 1, // February
    presentDays: new Set([1, 2, 5, 6, 7]),
    absentDays: new Set([3, 4, 8]),
  },
  // ... add more months as needed
];
```

**Benefits of Multi-Month Format:**

- ✅ **Batch loading** - Load attendance data for multiple months at once
- ✅ **Better performance** - No need to fetch data when navigating between months
- ✅ **Seamless navigation** - Smooth transitions between months with data
- ✅ **Backward compatible** - Works with existing single month format
- ✅ **Memory efficient** - Store data in memory for instant access
- ✅ **Offline ready** - Pre-load data for offline calendar browsing

## 📝 License

MIT © [Alamin](https://github.com/alamincodes)

---

<div align="center">
  <a href="https://github.com/alamincodes/attendance-calendar">GitHub</a> • 
  <a href="https://www.npmjs.com/package/react-attendance-calendar">npm</a>
</div>
