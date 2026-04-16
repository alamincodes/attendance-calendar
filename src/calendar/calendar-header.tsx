import { cn } from "./utils";

export type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function Header({ children, className }: HeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-6 gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
