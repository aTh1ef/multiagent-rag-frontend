"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";
import type { ChatSessionSummary, GeminiModel } from "@/lib/types";

export function useSessions() {
  const router = useRouter();
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ sessions: ChatSessionSummary[] }>("/api/chat/sessions");
      setSessions(data.sessions);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createSession = useCallback(
    async (model?: GeminiModel) => {
      try {
        const session = await apiFetch<ChatSessionSummary>("/api/chat/sessions", {
          method: "POST",
          body: JSON.stringify(model ? { model } : {}),
        });
        setSessions((prev) => [session, ...prev]);
        router.push(`/chat/${session.id}`);
        return session;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to create session");
        return null;
      }
    },
    [router]
  );

  const removeSession = useCallback(
    async (id: string) => {
      try {
        await apiFetch(`/api/chat/sessions/${id}`, { method: "DELETE" });
        setSessions((prev) => prev.filter((s) => s.id !== id));
        router.push("/chat");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete session");
      }
    },
    [router]
  );

  return { sessions, loading, createSession, removeSession, refresh };
}
