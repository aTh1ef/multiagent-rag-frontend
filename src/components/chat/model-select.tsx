"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALLOWED_GEMINI_MODELS, GEMINI_MODEL_LABELS, type GeminiModel } from "@/lib/types";

interface ModelSelectProps {
  value: GeminiModel;
  onChange: (model: GeminiModel) => void;
  disabled?: boolean;
}

export function ModelSelect({ value, onChange, disabled }: ModelSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as GeminiModel)} disabled={disabled}>
      <SelectTrigger size="sm" className="text-xs text-muted-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ALLOWED_GEMINI_MODELS.map((model) => (
          <SelectItem key={model} value={model}>
            {GEMINI_MODEL_LABELS[model]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
