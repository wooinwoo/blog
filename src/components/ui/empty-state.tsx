import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "데이터가 없습니다",
  description = "아직 작성된 콘텐츠가 없습니다.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl bg-card">
      <FolderOpen className="w-12 h-12 mb-4 text-muted-foreground/50" />
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
