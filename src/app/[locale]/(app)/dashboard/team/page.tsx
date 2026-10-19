"use client";

import { useState } from "react";
import { UserPlus, Shield, Mail, Ellipsis } from "lucide-react";

import { TEAM } from "@/lib/mock/data";
import { ROLE_LABEL, ROLE_SCOPE } from "@/lib/status";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Select } from "@/components/ui/input";
import { Avatar, Dropdown, DropdownItem } from "@/components/ui/primitives";
import { Modal } from "@/components/ui/modal";
import { useI18n } from "@/components/i18n/i18n-provider";

export default function TeamPage() {
  const { t, format } = useI18n();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [role, setRole] = useState("manager");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Équipe")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Rôles et permissions granulaires — idéal pour agences gérant plusieurs boutiques.")}
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <UserPlus className="h-4 w-4" aria-hidden />
          {t("Inviter un membre")}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-start">
                  {["Membre", "Rôle", "Statut", "Dernière activité", ""].map((h, i) => (
                    <th
                      key={h + i}
                      className="px-4 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase"
                    >
                      {t(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TEAM.map((member) => (
                  <tr key={member.id} className="transition-colors hover:bg-sidebar-hover">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={member.name} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{member.name}</p>
                          <p className="truncate text-[12px] text-faint">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={member.role === "owner" ? "gradient" : "primary"}>
                        {t(ROLE_LABEL[member.role])}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={member.status === "active" ? "success" : "warning"} dot>
                        {member.status === "active" ? t("Actif") : t("Invitation envoyée")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{format.relative(member.lastActive)}</td>
                    <td className="px-4 py-3.5 text-end">
                      <Dropdown
                        trigger={
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint hover:bg-sidebar-hover hover:text-foreground"
                          >
                            <Ellipsis className="h-4 w-4" />
                          </button>
                        }
                      >
                        <DropdownItem icon={<Shield className="h-4 w-4 text-faint" />}>
                          {t("Modifier le rôle")}
                        </DropdownItem>
                        <DropdownItem icon={<Mail className="h-4 w-4 text-faint" />}>
                          {t("Renvoyer l’invitation")}
                        </DropdownItem>
                        <DropdownItem danger>{t("Retirer de l’équipe")}</DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Roles matrix */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Matrice des permissions")}</CardTitle>
          <CardDescription>{t("Ce que chaque rôle peut voir et modifier")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(ROLE_LABEL) as Array<keyof typeof ROLE_LABEL>).map((r) => (
              <div key={r} className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-[13.5px] font-semibold">{t(ROLE_LABEL[r])}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {ROLE_SCOPE[r].map((scope) => (
                    <li key={scope}>
                      <Badge variant="outline">{t(scope)}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title={t("Inviter un membre")}
        description={t("L’invitation expire automatiquement après 7 jours.")}
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              {t("Annuler")}
            </Button>
            <Button onClick={() => setInviteOpen(false)}>
              <Mail className="h-4 w-4" aria-hidden />
              {t("Envoyer l’invitation")}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="invite-email">{t("Adresse e-mail")}</Label>
            <Input id="invite-email" type="email" placeholder="membre@agence.dz" icon={<Mail className="h-4 w-4" />} />
          </div>
          <div>
            <Label htmlFor="invite-role">{t("Rôle")}</Label>
            <Select id="invite-role" value={role} onChange={(e) => setRole(e.target.value)}>
              {Object.entries(ROLE_LABEL).map(([key, label]) => (
                <option key={key} value={key}>
                  {t(label)}
                </option>
              ))}
            </Select>
            <p className="mt-1.5 text-[12px] text-muted-foreground">
              {ROLE_SCOPE[role as keyof typeof ROLE_LABEL]?.map((scope) => t(scope)).join(" · ")}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
