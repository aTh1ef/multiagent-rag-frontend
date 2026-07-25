export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

// gemini-2.5-pro and gemini-2.5-flash-lite hit permanent free-tier quota blocks on this account,
// so the picker uses confirmed-working models spanning the same lite/standard/strong tiers.
export const ALLOWED_GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-2.5-flash", "gemini-3.5-flash"] as const;

export type GeminiModel = (typeof ALLOWED_GEMINI_MODELS)[number];

export const GEMINI_MODEL_LABELS: Record<GeminiModel, string> = {
  "gemini-3.5-flash-lite": "Gemini 3.5 Flash-Lite",
  "gemini-2.5-flash": "Gemini 2.5 Flash",
  "gemini-3.5-flash": "Gemini 3.5 Flash",
};

export const DEFAULT_GEMINI_MODEL: GeminiModel = "gemini-2.5-flash";

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

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations: Citation[] | null;
  createdAt: string;
}

export interface ChatSessionSummary {
  id: string;
  title: string;
  model: GeminiModel;
  createdAt: string;
  updatedAt: string;
}
