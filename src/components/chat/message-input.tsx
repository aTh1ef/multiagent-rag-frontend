"use client";

import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ModelSelect } from "./model-select";
import type { GeminiModel } from "@/lib/types";

interface MessageInputProps {
  model: GeminiModel;
  onModelChange: (model: GeminiModel) => void;
  onSend: (content: string) => void;
  sending: boolean;
}

export function MessageInput({ model, onModelChange, onSend, sending }: MessageInputProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || sending) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="border-t border-border/60 bg-background p-3">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 rounded-2xl border border-border bg-card p-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask about your documents..."
          disabled={sending}
          rows={2}
          className="resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between">
          <ModelSelect value={model} onChange={onModelChange} disabled={sending} />
          <Button size="icon" className="rounded-full" onClick={handleSend} disabled={sending || !value.trim()}>
            {sending ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
