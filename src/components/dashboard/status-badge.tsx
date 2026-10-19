"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ORDER_STATUS, CUSTOMER_SEGMENT } from "@/lib/status";
import type { OrderStatus } from "@/lib/mock/data";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useI18n();
  const meta = ORDER_STATUS[status];
  return (
    <Badge variant={meta.tone} dot>
      {t(meta.label)}
    </Badge>
  );
}

export function SegmentBadge({ segment }: { segment: string }) {
  const { t } = useI18n();
  const meta = CUSTOMER_SEGMENT[segment] ?? { label: segment, tone: "neutral" as const };
  return <Badge variant={meta.tone}>{t(meta.label)}</Badge>;
}
