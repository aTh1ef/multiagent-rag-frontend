import Link from "next/link";
import { Compass, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AGENTS = [
  {
    Icon: Compass,
    title: "Supervisor",
    description: "Reads your message and decides whether it needs your documents, your chat history, or neither.",
  },
  {
    Icon: Search,
    title: "Retrieval",
    description: "Searches your uploaded PDFs, TXT, and DOCX files for the passages most relevant to your question.",
  },
  {
    Icon: Sparkles,
    title: "Reasoning",
    description: "Writes the answer grounded in what was found, citing sources and never guessing.",
  },
];

export function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-background px-6 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-[family-name:var(--font-caveat)] text-6xl font-bold text-primary sm:text-7xl">
          Multi-Agent RAG
        </h1>
        <p className="max-w-xl font-[family-name:var(--font-caveat)] text-2xl text-primary/90 sm:text-3xl">
          Supervisor decides, Retrieval searches your files, Reasoning writes the grounded answer.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button size="lg" nativeButton={false} render={<Link href="/signup">Sign up</Link>} />
        <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/login">Log in</Link>} />
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {AGENTS.map(({ Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/15">
              <Icon className="size-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
