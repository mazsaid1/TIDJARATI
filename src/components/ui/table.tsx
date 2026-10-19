import { type HTMLAttributes, type ThHTMLAttributes, type TdHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("", className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-border", className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "group transition-colors duration-150 hover:bg-sidebar-hover data-[state=selected]:bg-primary-soft",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-start align-middle text-[12px] font-semibold uppercase tracking-wider text-faint first:ps-5 last:pe-5",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-4 py-3.5 align-middle text-[13.5px] text-foreground first:ps-5 last:pe-5", className)}
      {...props}
    />
  );
}

export function TableCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("card-premium overflow-hidden", className)}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
