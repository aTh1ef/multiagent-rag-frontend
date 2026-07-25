"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";
import type { ChatSessionSummary, GeminiModel } from "@/lib/types";

export function useSession(sessionId: string) {
  const [session, setSession] = useState<ChatSessionSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<ChatSessionSummary>(`/api/chat/sessions/${sessionId}`);
      setSession(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load session");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateModel = useCallback(
    async (model: GeminiModel) => {
      setSession((prev) => (prev ? { ...prev, model } : prev));
      try {
        await apiFetch(`/api/chat/sessions/${sessionId}`, {
          method: "PATCH",
          body: JSON.stringify({ model }),
        });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to update model");
        refresh();
      }
    },
    [sessionId, refresh]
  );

  return { session, loading, updateModel };
}
