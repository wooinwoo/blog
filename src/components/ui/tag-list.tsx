"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  activeTag?: string;
}

export function TagList({ tags, activeTag }: TagListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const handleTagClick = (tag: string) => {
    if (currentTag === tag) {
      router.push(".");
    } else {
      router.push(`?tag=${tag}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn(
            "text-sm px-3 py-1 rounded-full transition-colors",
            "hover:bg-primary/20",
            currentTag === tag
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          )}>
          {tag}
        </button>
      ))}
    </div>
  );
}
