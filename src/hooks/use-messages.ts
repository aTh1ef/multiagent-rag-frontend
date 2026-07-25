"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";
import type { ChatMessage } from "@/lib/types";

export function useMessages(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ messages: ChatMessage[] }>(`/api/chat/sessions/${sessionId}/messages`);
      setMessages(data.messages);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const sendMessage = useCallback(
    async (content: string) => {
      setSending(true);
      try {
        const result = await apiFetch<{ userMessage: ChatMessage; assistantMessage: ChatMessage }>(
          `/api/chat/sessions/${sessionId}/messages`,
          { method: "POST", body: JSON.stringify({ content }) }
        );
        setMessages((prev) => [...prev, result.userMessage, result.assistantMessage]);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to send message");
      } finally {
        setSending(false);
      }
    },
    [sessionId]
  );

  return { messages, loading, sending, sendMessage };
}
