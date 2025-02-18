import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="py-24 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary/60" />
      <p className="text-lg text-muted-foreground animate-pulse">
        콘텐츠를 불러오는 중...
      </p>
    </div>
  );
}
