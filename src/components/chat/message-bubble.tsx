import { Compass, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AGENT_PATH, type ChatMessage } from "@/lib/types";

const AGENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  supervisor: Compass,
  retrieval: Search,
  reasoning: Sparkles,
};

function AgentPathTrail({ route }: { route: NonNullable<ChatMessage["route"]> }) {
  const steps = AGENT_PATH[route];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border/40 pb-2 text-[11px] text-muted-foreground">
      {steps.map((step, i) => {
        const Icon = AGENT_ICONS[step.key];
        return (
          <span key={step.key} className="flex items-center gap-1">
            <span className="flex items-center gap-1">
              <Icon className="size-3 text-primary" />
              {step.label}
            </span>
            {i < steps.length - 1 && <span className="text-border">→</span>}
          </span>
        );
      })}
    </div>
  );
}

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
        {!isUser && message.route && <AgentPathTrail route={message.route} />}

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
