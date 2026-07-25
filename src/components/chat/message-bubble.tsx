import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "USER";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-2 rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
          isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border/60 text-foreground"
        )}
      >
        <p>{message.content}</p>

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-border/40 pt-2">
            {message.citations.map((citation, i) => (
              <Badge
                key={citation.chunkId}
                variant="outline"
                title={citation.snippet}
                className="cursor-default"
              >
                [{i + 1}] {citation.documentName}
                {citation.pageNumber ? ` · p.${citation.pageNumber}` : ""}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
