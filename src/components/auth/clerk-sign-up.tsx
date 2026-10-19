"use client";

import { SignUp } from "@clerk/nextjs";

/** Clerk sign-up wrapper styled with the TIDJARATI design tokens. */
export function ClerkSignUp() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-16">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#7c3aed",
            colorBackground: "#ffffff",
            colorForeground: "#0f172a",
            colorDanger: "#ef4444",
            colorSuccess: "#10b981",
            borderRadius: "12px",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          },
          elements: {
            cardBox: "card-premium !shadow-[var(--shadow-lg)]",
            headerTitle: "font-display tracking-tight",
            socialButtonsBlockButton: "rounded-xl border-border",
            formButtonPrimary:
              "bg-[image:var(--gradient-brand)] rounded-xl shadow-[0_10px_30px_-12px_rgba(124,58,237,0.75)]",
            footerActionLink: "text-primary hover:text-primary",
          },
        }}
      />
    </div>
  );
}
