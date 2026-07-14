import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    // Best-effort saved language preference (client only).
    let target: "es" | "pt" = "es";
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("mk-lang");
        if (saved === "pt") target = "pt";
      } catch {}
    }
    throw redirect({ to: target === "pt" ? "/pt" : "/es" });
  },
  component: () => null,
});
