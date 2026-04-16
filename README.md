# React Attendance Calendar

A modern, responsive React attendance calendar with a **compound component** architecture. Style it with classes, swap out navigation buttons, render custom cells — or just drop in the pre-composed version and go.

## Features

- **Compound components** — compose `Calendar.Root`, `Header`, `Title`, `PrevTrigger`, `NextTrigger`, `WeekDays`, and `Grid` any way you like
- **Pre-composed default** — `AttendanceCalendar` works out of the box with zero config
- **`renderCell`** — full control over every cell's markup and style
- **`useCalendar()` hook** — headless access to all calendar state for completely custom UIs
- **`classNames` object** — one clean prop for `cell`, `present`, `absent`, `today`, `outside` styles
- **Responsive** — auto-switches between 7 and 14 columns based on container width
- **TypeScript** — full type safety and IntelliSense
- **Multi-month data** — provide attendance for multiple months at once

## Installation

```bash
npm install react-attendance-calendar
```

Import the CSS once in your app entry:

```tsx
import "react-attendance-calendar/styles.css";
```

> The package ships pre-compiled CSS. If you use Tailwind CSS v4, you can further customize via `className` and `classNames` props.

## Quick Start

```tsx
import { useState } from "react";
import { AttendanceCalendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

function App() {
  const [view, setView] = useState({ year: 2024, monthIndex: 0 });

  const data = {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([1, 2, 3, 5, 8, 9, 10]),
    absentDays: new Set([4, 11]),
  };

  return (
    <AttendanceCalendar
      view={view}
      onChangeView={setView}
      attendanceData={data}
      onDateClick={(day, month, year) => console.log(day, month, year)}
    />
  );
}
```

## Usage

### Pre-composed (simple)

The `AttendanceCalendar` component is a ready-to-use calendar with sensible defaults. Pass a `classNames` object to customize cell styles without touching the layout.

```tsx
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  attendanceData={data}
  classNames={{
    cell: "rounded-full",
    present: "bg-teal-500 shadow-md",
    absent: "bg-rose-500",
    today: "ring-2 ring-blue-400",
    outside: "opacity-20",
  }}
/>
```

### Compound components (full control)

Build your own layout with `Calendar.*` components. Place the title, navigation buttons, weekday headers, and grid wherever you want.

```tsx
import { Calendar } from "react-attendance-calendar";
import "react-attendance-calendar/styles.css";

function MyCalendar() {
  const [view, setView] = useState({ year: 2024, monthIndex: 0 });

  return (
    <Calendar.Root
      view={view}
      onChangeView={setView}
      attendanceData={data}
      onDateClick={(day, month, year) => console.log(day, month, year)}
    >
      <Calendar.Header>
        <Calendar.Title className="text-indigo-700" />
        <div className="flex gap-2">
          <Calendar.PrevTrigger className="rounded-full bg-indigo-500 text-white">
            ←
          </Calendar.PrevTrigger>
          <Calendar.NextTrigger className="rounded-full bg-indigo-500 text-white">
            →
          </Calendar.NextTrigger>
        </div>
      </Calendar.Header>
      <Calendar.WeekDays dayClassName="text-indigo-400" />
      <Calendar.Grid
        classNames={{
          present: "bg-indigo-500",
          absent: "bg-pink-500",
        }}
      />
    </Calendar.Root>
  );
}
```

### Custom title format

```tsx
<Calendar.Title
  format={(monthName, year) => (
    <span className="text-lg font-medium">
      {monthName} / {year}
    </span>
  )}
/>
```

### Custom cell rendering

Use `renderCell` on `Calendar.Grid` (or the pre-composed `AttendanceCalendar`) for complete control over each cell's markup. The callback receives a `CellData` object with all the state you need.

```tsx
<Calendar.Grid
  renderCell={(cell) => (
    <div
      className={`w-full aspect-square grid place-items-center rounded-xl text-sm ${
        cell.isPresent
          ? "bg-green-100 text-green-700"
          : cell.isAbsent
            ? "bg-red-100 text-red-700"
            : cell.isToday
              ? "bg-blue-600 text-white"
              : "text-slate-600"
      }`}
    >
      {cell.day}
      {cell.isPresent && <span className="text-[10px]">✓</span>}
      {cell.isAbsent && <span className="text-[10px]">✗</span>}
    </div>
  )}
/>
```

### Headless with `useCalendar()`

For a completely custom UI, use the hook inside a `Calendar.Root`:

```tsx
import { Calendar, useCalendar } from "react-attendance-calendar";

function HeadlessCalendar() {
  const { view, monthName, goPrev, goNext, cells, currentMonthData, today, columns } =
    useCalendar();

  // Build any UI you want with full access to calendar state
  return <div>{/* your custom markup */}</div>;
}

function App() {
  const [view, setView] = useState({ year: 2024, monthIndex: 0 });

  return (
    <Calendar.Root view={view} onChangeView={setView} attendanceData={data}>
      <HeadlessCalendar />
    </Calendar.Root>
  );
}
```

### Custom cell sizes

```tsx
// Square cells
<AttendanceCalendar view={view} onChangeView={setView} cellSize={50} />

// Custom width and height
<AttendanceCalendar view={view} onChangeView={setView} cellWidth={80} cellHeight={50} />

// Compact
<AttendanceCalendar
  view={view}
  onChangeView={setView}
  cellSize={32}
  classNames={{ cell: "rounded-full text-xs" }}
/>
```

### Multi-month data

Pass an array to `attendanceData` to pre-load multiple months. Navigation between loaded months is instant.

```tsx
const data: AttendanceData = [
  {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([1, 2, 3, 5, 8, 9, 10]),
    absentDays: new Set([4, 11]),
  },
  {
    year: 2024,
    monthIndex: 1,
    presentDays: new Set([1, 2, 5, 6, 7]),
    absentDays: new Set([3, 4, 8]),
  },
];

<AttendanceCalendar view={view} onChangeView={setView} attendanceData={data} />;
```

## API Reference

### `AttendanceCalendar` (pre-composed)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `view` | `MonthView` | current month | Current month and year |
| `onChangeView` | `(view: MonthView) => void` | **required** | Month navigation callback |
| `attendanceData` | `AttendanceData` | — | Present/absent days (single or array) |
| `onDateClick` | `(day, month, year) => void` | — | Date click callback |
| `showNavigation` | `boolean` | `true` | Show header with nav buttons |
| `showWeekDays` | `boolean` | `true` | Show weekday labels |
| `className` | `string` | — | Root container class |
| `classNames` | `GridClassNames` | — | Cell style overrides (see below) |
| `cellSize` | `number` | — | Square cell size in px |
| `cellWidth` | `number` | — | Cell width in px |
| `cellHeight` | `number` | — | Cell height in px |
| `renderCell` | `(state: CellData) => ReactNode` | — | Custom cell renderer |

### `GridClassNames`

```typescript
type GridClassNames = {
  cell?: string;    // Base class for all cells
  present?: string; // Present-day cells
  absent?: string;  // Absent-day cells
  today?: string;   // Today's cell (merged last, wins over present/absent)
  outside?: string; // Days outside current month
};
```

### `CellData`

Passed to `renderCell`:

```typescript
type CellData = {
  day: number;
  date: Date;
  inCurrentMonth: boolean;
  isPresent: boolean;
  isAbsent: boolean;
  isToday: boolean;
  isClickable: boolean;
};
```

### Compound Components

| Component | Props | Description |
| --- | --- | --- |
| `Calendar.Root` | `view`, `onChangeView`, `attendanceData`, `onDateClick`, `className`, `children` | Context provider and container |
| `Calendar.Header` | `className`, `children` | Flex wrapper for title + nav |
| `Calendar.Title` | `className`, `format?` | Month/year heading |
| `Calendar.PrevTrigger` | all `<button>` props | Previous month button |
| `Calendar.NextTrigger` | all `<button>` props | Next month button |
| `Calendar.WeekDays` | `className`, `dayClassName`, `labels?` | Weekday labels row |
| `Calendar.Grid` | `className`, `classNames`, `cellSize`, `cellHeight`, `cellWidth`, `renderCell` | Date grid |

### `useCalendar()` Hook

Returns all calendar state when used inside `Calendar.Root`:

```typescript
const {
  view,            // MonthView — current month/year
  monthName,       // string — e.g. "January"
  today,           // { day, month, year }
  currentMonthData,// MonthAttendanceData | undefined
  columns,         // number — 7 or 14 (responsive)
  cells,           // { day, inCurrentMonth }[]
  weekdayLabels,   // string[]
  goPrev,          // () => void
  goNext,          // () => void
  onDateClick,     // ((day, month, year) => void) | undefined
} = useCalendar();
```

### Types

```typescript
type MonthView = {
  year: number;
  monthIndex: number; // 0-11
};

type MonthAttendanceData = {
  year: number;
  monthIndex: number;
  presentDays: Set<number>;
  absentDays: Set<number>;
};

type AttendanceData = MonthAttendanceData | MonthAttendanceData[];
```

## Default Theme

- **Present** — emerald green (`emerald-500`) with white text
- **Absent** — amber orange (`amber-500`) with white text
- **Today** (no data) — dark slate (`slate-900`) with white text
- **Today** (present/absent) — status color + ring highlight
- **Outside month** — faded with light border
- **Navigation** — rounded buttons with hover/active effects

## Responsive Behavior

- Cells use `w-full aspect-square` by default — fluid with no overflow
- Container >= 700px: switches to 14-column layout
- Narrow / mobile: 7-column layout with touch-friendly sizing
- Use `cellSize`, `cellWidth`, or `cellHeight` for fixed pixel dimensions

## License

MIT © [Alamin](https://github.com/alamincodes)

---

<div align="center">
  <a href="https://github.com/alamincodes/attendance-calendar">GitHub</a> •
  <a href="https://www.npmjs.com/package/react-attendance-calendar">npm</a>
</div>
