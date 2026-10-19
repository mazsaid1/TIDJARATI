"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------- Avatar --------------------------------- */

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-7 w-7 text-[11px]", md: "h-9 w-9 text-[12px]", lg: "h-12 w-12 text-sm" };
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("rounded-full object-cover", sizes[size], className)} />;
  }

  return (
    <span
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full bg-[image:linear-gradient(135deg,var(--tw-gradient-from),var(--tw-gradient-to))] font-semibold text-white ring-2 ring-background",
        sizes[size],
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${250 + (hash(name) % 60)} 75% 60%), hsl(${
          280 + (hash(name) % 50)
        } 70% 55%))`,
      }}
    >
      {initials}
    </span>
  );
}

/* ---------------------------------- Tabs ----------------------------------- */

type TabsContextValue = { value: string; setValue: (v: string) => void };
const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border bg-muted/70 p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx.setValue(value)}
      className={cn(
        "rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        active
          ? "bg-card text-foreground shadow-[var(--shadow-sm)]"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return (
    <div role="tabpanel" className={cn("animate-fade-up", className)}>
      {children}
    </div>
  );
}

/* -------------------------------- Dropdown --------------------------------- */

export function Dropdown({
  trigger,
  children,
  align = "end",
  className,
}: {
  trigger: ReactElement;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // We clone the provided trigger (usually a <button>) instead of wrapping it in
  // another <button>: nesting interactive elements produces invalid HTML that the
  // browser re-parses differently from the React tree, causing hydration errors.
  const { className: triggerClassName, onClick: triggerOnClick } = trigger.props as {
    className?: string;
    onClick?: (event: ReactMouseEvent) => void;
  };

  const triggerElement = cloneElement(trigger as ReactElement<Record<string, unknown>>, {
    onClick: (event: ReactMouseEvent) => {
      triggerOnClick?.(event);
      setOpen((value) => !value);
    },
    "aria-expanded": open,
    "aria-controls": id,
    "aria-haspopup": "menu",
    className: cn(
      "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      triggerClassName,
    ),
  });

  return (
    <div ref={ref} className="relative">
      {triggerElement}
      <div
        id={id}
        role="menu"
        hidden={!open}
        className={cn(
          "absolute z-50 mt-2 min-w-52 origin-top animate-fade-up rounded-xl border border-border bg-background-elevated p-1.5 shadow-[var(--shadow-lg)]",
          align === "end" ? "end-0" : "start-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  danger,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-[13px] transition-colors",
        danger
          ? "text-danger hover:bg-danger/10"
          : "text-foreground hover:bg-sidebar-hover",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

/* --------------------------------- Switch ---------------------------------- */

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {description && <span className="text-[13px] text-muted-foreground">{description}</span>}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border border-transparent transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          checked ? "bg-primary" : "bg-border-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked && "translate-x-5 rtl:-translate-x-5",
          )}
        >
          {checked && <Check className="absolute inset-0 m-auto h-3 w-3 text-primary" />}
        </span>
      </button>
    </label>
  );
}
