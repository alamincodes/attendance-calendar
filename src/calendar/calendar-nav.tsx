import { useCalendar } from "./context";
import { cn } from "./utils";

type NavTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DEFAULT_BTN =
  "size-9 rounded-xl border-2 border-slate-200 text-slate-600 grid place-items-center shrink-0 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95";

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <polyline points="15,18 9,12 15,6" />
      ) : (
        <polyline points="9,18 15,12 9,6" />
      )}
    </svg>
  );
}

export function PrevTrigger({
  children,
  className,
  ...rest
}: NavTriggerProps) {
  const { goPrev } = useCalendar();
  return (
    <button
      type="button"
      aria-label="Previous month"
      {...rest}
      onClick={goPrev}
      className={cn(DEFAULT_BTN, className)}
    >
      {children ?? <Chevron direction="prev" />}
    </button>
  );
}

export function NextTrigger({
  children,
  className,
  ...rest
}: NavTriggerProps) {
  const { goNext } = useCalendar();
  return (
    <button
      type="button"
      aria-label="Next month"
      {...rest}
      onClick={goNext}
      className={cn(DEFAULT_BTN, className)}
    >
      {children ?? <Chevron direction="next" />}
    </button>
  );
}
