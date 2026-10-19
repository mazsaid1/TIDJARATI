import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS, CUSTOMER_SEGMENT } from "@/lib/status";
import type { OrderStatus } from "@/lib/mock/data";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = ORDER_STATUS[status];
  return (
    <Badge variant={meta.tone} dot>
      {meta.label}
    </Badge>
  );
}

export function SegmentBadge({ segment }: { segment: string }) {
  const meta = CUSTOMER_SEGMENT[segment] ?? { label: segment, tone: "neutral" as const };
  return <Badge variant={meta.tone}>{meta.label}</Badge>;
}
