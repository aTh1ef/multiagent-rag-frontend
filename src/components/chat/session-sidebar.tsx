"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, MessageSquare, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DocumentManager } from "@/components/documents/document-manager";
import { useSessions } from "@/hooks/use-sessions";
import { cn } from "@/lib/utils";

export function SessionSidebar() {
  const { sessions, loading, createSession, removeSession } = useSessions();
  const params = useParams<{ sessionId?: string }>();
  const activeId = params?.sessionId;

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border/60 bg-background">
      <div className="flex items-center gap-2 p-2">
        <Button variant="secondary" size="sm" className="flex-1 justify-start gap-2" onClick={() => createSession()}>
          <Plus className="size-4" /> New chat
        </Button>
        <Dialog>
          <DialogTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Manage documents">
                <FileText className="size-4" />
              </Button>
            }
          />
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Your documents</DialogTitle>
            </DialogHeader>
            <DocumentManager />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-0.5 pb-2">
          {loading && (
            <>
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </>
          )}

          {!loading && sessions.length === 0 && (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">No conversations yet.</p>
          )}

          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent",
                activeId === session.id && "bg-accent"
              )}
            >
              <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
              <Link href={`/chat/${session.id}`} className="min-w-0 flex-1 truncate text-foreground">
                {session.title}
              </Link>
              <button
                onClick={() => removeSession(session.id)}
                aria-label={`Delete ${session.title}`}
                className="shrink-0 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
