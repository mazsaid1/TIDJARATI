"use client";

import { useState } from "react";
import { Bell, Package, Sparkles, CreditCard, Boxes, UsersRound, CheckCheck } from "lucide-react";

import { NOTIFICATIONS } from "@/lib/mock/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives";
import { relativeTime, cn } from "@/lib/utils";

const TYPE_ICON = {
  orders: { icon: Package, tone: "text-primary" },
  insight: { icon: Sparkles, tone: "text-success" },
  billing: { icon: CreditCard, tone: "text-danger" },
  stock: { icon: Boxes, tone: "text-warning" },
  team: { icon: UsersRound, tone: "text-info" },
} as const;

export default function NotificationsPage() {
  const [items, setItems] = useState(NOTIFICATIONS);

  const unread = items.filter((n) => n.unread).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Alertes opérationnelles, insights IA et événements de facturation.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setItems((list) => list.map((n) => ({ ...n, unread: false })))}
          disabled={unread === 0}
        >
          <CheckCheck className="h-4 w-4" aria-hidden />
          Tout marquer comme lu
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            Toutes <span className="ml-1 text-faint tabular-nums">{items.length}</span>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Non lues{" "}
            <span className="ml-1 text-primary tabular-nums">{unread}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-5">
          <List items={items} onRead={(id) => setItems((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n)))} />
        </TabsContent>
        <TabsContent value="unread" className="mt-5">
          <List
            items={items.filter((n) => n.unread)}
            onRead={(id) => setItems((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n)))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  function List({
    items: list,
    onRead,
  }: {
    items: typeof NOTIFICATIONS;
    onRead: (id: string) => void;
  }) {
    if (list.length === 0) {
      return (
        <EmptyState
          icon={Bell}
          title="Tout est à jour"
          description="Vous n’avez aucune notification non lue. Nous vous préviendrons dès qu’une action sera requise."
        />
      );
    }
    return (
      <div className="space-y-2.5">
        {list.map((n) => {
          const meta = TYPE_ICON[n.type];
          return (
            <Card
              key={n.id}
              onClick={() => onRead(n.id)}
              className={cn(
                "flex cursor-pointer items-start gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40",
                n.unread && "border-primary/30 bg-primary-soft/40",
              )}
            >
              <span className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card", meta.tone)}>
                <meta.icon className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold">{n.title}</p>
                  {n.unread && <Badge variant="primary">Nouveau</Badge>}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{n.body}</p>
                <p className="mt-1.5 text-[11.5px] text-faint">{relativeTime(n.at)}</p>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
