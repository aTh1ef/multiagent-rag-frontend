"use client";

import { Trash2, FileText, Loader2, CircleCheck, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentUploadDropzone } from "./document-upload-dropzone";
import { useDocuments } from "@/hooks/use-documents";
import type { DocumentStatus } from "@/lib/types";

function StatusBadge({ status }: { status: DocumentStatus }) {
  if (status === "PROCESSING") {
    return (
      <Badge variant="secondary" className="gap-1">
        <Loader2 className="size-3 animate-spin" /> Processing
      </Badge>
    );
  }
  if (status === "FAILED") {
    return (
      <Badge variant="destructive" className="gap-1">
        <CircleX className="size-3" /> Failed
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1">
      <CircleCheck className="size-3" /> Ready
    </Badge>
  );
}

export function DocumentManager() {
  const { documents, loading, uploading, upload, remove } = useDocuments();

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DocumentUploadDropzone uploading={uploading} onUpload={upload} />

      <div className="flex flex-col gap-2">
        {loading && (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        )}

        {!loading && documents.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">No documents uploaded yet.</p>
        )}

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{doc.originalName}</p>
                {doc.status === "FAILED" && doc.errorMessage && (
                  <p className="truncate text-xs text-destructive">{doc.errorMessage}</p>
                )}
                {doc.status === "COMPLETED" && (
                  <p className="text-xs text-muted-foreground">{doc.chunkCount ?? 0} chunks</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge status={doc.status} />
              <Button variant="ghost" size="icon" onClick={() => remove(doc.id)} aria-label={`Delete ${doc.originalName}`}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
