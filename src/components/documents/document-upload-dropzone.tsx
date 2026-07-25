"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_EXTENSIONS = ".pdf,.txt,.docx";

interface DocumentUploadDropzoneProps {
  uploading: boolean;
  onUpload: (file: File) => void;
}

export function DocumentUploadDropzone({ uploading, onUpload }: DocumentUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onUpload(file);
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-6 text-center transition-colors",
        dragOver && "border-foreground/40 bg-accent/40",
        uploading && "pointer-events-none opacity-60"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <UploadCloud className="size-6 text-muted-foreground" />
      <p className="text-sm text-foreground">{uploading ? "Processing document..." : "Drop a file or click to upload"}</p>
      <p className="text-xs text-muted-foreground">PDF, TXT, or DOCX</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
      />
    </div>
  );
}
