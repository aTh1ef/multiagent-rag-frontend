"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Compass, Search, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { useMessages } from "@/hooks/use-messages";
import { useSession } from "@/hooks/use-session";
import { DEFAULT_GEMINI_MODEL } from "@/lib/types";

const PIPELINE_STAGES = [
  { label: "Supervisor is deciding how to route this...", Icon: Compass },
  { label: "Searching your documents...", Icon: Search },
  { label: "Reasoning over the context...", Icon: Sparkles },
];

function PipelineStatus() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => Math.min(s + 1, PIPELINE_STAGES.length - 1)), 1300);
    return () => clearInterval(id);
  }, []);

  const { label, Icon } = PIPELINE_STAGES[stage];

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-2.5 text-sm text-muted-foreground">
      <Icon className="size-3.5 text-primary" />
      {label}
      <Loader2 className="size-3.5 animate-spin" />
    </div>
  );
}

export function ChatWindow({ sessionId }: { sessionId: string }) {
  const { session, updateModel } = useSession(sessionId);
  const { messages, loading, sending, sendMessage } = useMessages(sessionId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-center border-b border-border/60 px-4">
        <h1 className="truncate text-sm font-medium text-foreground">{session?.title ?? "Conversation"}</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 p-4">
          {loading && (
            <div className="flex justify-center py-8 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}

          {!loading && messages.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Ask a question about your uploaded documents, or just say hello.
            </p>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {sending && (
            <div className="flex justify-start">
              <PipelineStatus />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <MessageInput
        model={session?.model ?? DEFAULT_GEMINI_MODEL}
        onModelChange={updateModel}
        onSend={sendMessage}
        sending={sending}
      />
    </div>
  );
}
