export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

// Gemini free-tier model availability has proven inconsistent across API keys/projects (both
// gemini-2.5-pro/-flash-lite and, on a different key, gemini-2.5-flash itself have been blocked
// outright). The gemini-3.x family has been the one consistently working tier, so the picker
// standardizes on that instead of mixing generations. Must mirror backend/src/config/env.ts.
export const ALLOWED_GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.6-flash"] as const;

export type GeminiModel = (typeof ALLOWED_GEMINI_MODELS)[number];

export const GEMINI_MODEL_LABELS: Record<GeminiModel, string> = {
  "gemini-3.5-flash-lite": "Gemini 3.5 Flash-Lite",
  "gemini-3.5-flash": "Gemini 3.5 Flash",
  "gemini-3.6-flash": "Gemini 3.6 Flash",
};

export const DEFAULT_GEMINI_MODEL: GeminiModel = "gemini-3.5-flash";

export type DocumentStatus = "PROCESSING" | "COMPLETED" | "FAILED";

export interface DocumentSummary {
  id: string;
  originalName: string;
  mimeType: string;
  status: DocumentStatus;
  pageCount: number | null;
  chunkCount: number | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface Citation {
  documentId: string;
  documentName: string;
  chunkId: string;
  pageNumber?: number;
  snippet: string;
}

export type MessageRole = "USER" | "ASSISTANT";

export type AgentRoute = "rag" | "general" | "history_only";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations: Citation[] | null;
  route: AgentRoute | null;
  createdAt: string;
}

// Which agents ran for a given route, in order, for display purposes.
export const AGENT_PATH: Record<AgentRoute, { key: string; label: string }[]> = {
  rag: [
    { key: "supervisor", label: "Supervisor" },
    { key: "retrieval", label: "Retrieval" },
    { key: "reasoning", label: "Reasoning" },
  ],
  general: [
    { key: "supervisor", label: "Supervisor" },
    { key: "reasoning", label: "Reasoning" },
  ],
  history_only: [
    { key: "supervisor", label: "Supervisor" },
    { key: "reasoning", label: "Reasoning" },
  ],
};

export interface ChatSessionSummary {
  id: string;
  title: string;
  model: GeminiModel;
  createdAt: string;
  updatedAt: string;
}
