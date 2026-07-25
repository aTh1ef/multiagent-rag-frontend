"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch, ApiError } from "@/lib/api-client";
import type { DocumentSummary } from "@/lib/types";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ documents: DocumentSummary[] }>("/api/documents");
      setDocuments(data.documents);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/documents", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new ApiError(res.status, data.error ?? "Upload failed");
        toast.success(`${file.name} processed successfully`);
        await refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await apiFetch(`/api/documents/${id}`, { method: "DELETE" });
        toast.success("Document deleted");
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete document");
      }
    },
    []
  );

  return { documents, loading, uploading, upload, remove, refresh };
}
