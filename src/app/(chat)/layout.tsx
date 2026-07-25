import { getCurrentUser } from "@/lib/current-user";
import { LogoutButton } from "@/components/chat/logout-button";
import { SessionSidebar } from "@/components/chat/session-sidebar";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/60 px-4">
        <span className="text-sm font-medium text-foreground">Multi-Agent RAG Chatbot</span>
        <div className="flex items-center gap-3">
          {user && <span className="text-sm text-muted-foreground">{user.email}</span>}
          <LogoutButton />
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <SessionSidebar />
        {children}
      </div>
    </div>
  );
}
