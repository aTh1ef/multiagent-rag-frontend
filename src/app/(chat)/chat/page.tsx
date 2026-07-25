export default function ChatIndexPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
      <h1 className="text-lg font-medium text-foreground">Start a conversation</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Create a new chat from the sidebar, or upload documents to ask questions grounded in your own files.
      </p>
    </main>
  );
}
