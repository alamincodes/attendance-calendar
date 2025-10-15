# Attendance Calendar

A responsive React attendance calendar component with TypeScript support. This component provides a clean, modern interface for displaying attendance data with present/absent indicators.

## Features

- 📅 **Responsive Design**: Automatically adjusts between 7 and 14 columns based on container width
- 🎨 **Customizable Styling**: Uses Tailwind CSS classes for easy customization
- 📱 **Mobile Friendly**: Responsive design that works on all screen sizes
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Lightweight**: Minimal dependencies, only requires React
- 🎯 **Accessible**: Includes proper ARIA labels and semantic HTML

## Installation

```bash
npm install attendance-calendar
```

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import { AttendanceCalendar, MonthView } from 'attendance-calendar';

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0 // January
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AttendanceCalendar
        view={view}
        onChangeView={setView}
      />
    </div>
  );
}
```

### With Attendance Data

```tsx
import React, { useState } from 'react';
import { AttendanceCalendar, MonthView, DemoAttendance } from 'attendance-calendar';

function App() {
  const [view, setView] = useState<MonthView>({
    year: 2024,
    monthIndex: 0 // January
  });

  // Sample attendance data
  const attendanceData: DemoAttendance = {
    year: 2024,
    monthIndex: 0,
    presentDays: new Set([1, 2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31]),
    absentDays: new Set([4, 11, 18, 25])
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AttendanceCalendar
        view={view}
        onChangeView={setView}
        demoData={attendanceData}
      />
    </div>
  );
}
```

## Props

### AttendanceCalendar

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `view` | `MonthView` | ✅ | Current month view with year and month index |
| `onChangeView` | `(view: MonthView) => void` | ✅ | Callback when user navigates to different month |
| `demoData` | `DemoAttendance` | ❌ | Optional attendance data to display |

### Types

```tsx
type MonthView = {
  year: number;
  monthIndex: number; // 0-11 (0 = January, 11 = December)
};

type DemoAttendance = {
  year: number;
  monthIndex: number; // 0-11
  presentDays: Set<number>; // Set of day numbers (1-31)
  absentDays: Set<number>; // Set of day numbers (1-31)
};
```

## Styling

The component uses Tailwind CSS classes. Make sure you have Tailwind CSS installed and configured in your project. The component expects these CSS classes to be available:

- Layout: `w-full`, `flex`, `grid`, `gap-3`, `items-center`, `justify-center`
- Sizing: `size-8`, `size-9`, `size-10`, `size-6`
- Colors: `text-dashboard-text`, `text-muted-foreground`, `bg-primary`, `bg-red-500`, `text-white`
- Borders: `border`, `border-border`, `rounded-md`, `rounded-full`
- Spacing: `mt-6`, `mb-4`, `ml-2`, `mb-2`
- Typography: `text-lg`, `font-semibold`, `text-sm`, `text-md`

### Custom Styling

You can customize the appearance by overriding the CSS classes or using CSS-in-JS solutions:

```tsx
// Example with custom styling
<div className="attendance-calendar-wrapper">
  <AttendanceCalendar
    view={view}
    onChangeView={setView}
    demoData={attendanceData}
  />
</div>
```

```css
.attendance-calendar-wrapper {
  /* Your custom styles */
  --primary-color: #3b82f6;
  --absent-color: #ef4444;
  --text-color: #1f2937;
}
```

## Development

To build the library:

```bash
npm run build
```

To run the development server:

```bash
npm run dev
```

## Publishing

Before publishing, make sure to:

1. Update the version in `package.json`
2. Update the repository URL and author information
3. Run `npm run build` to ensure everything builds correctly
4. Run `npm publish` to publish to npm

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.