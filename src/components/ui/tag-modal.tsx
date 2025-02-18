"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

interface TagModalProps {
  tags: [string, number][];
}

export function TagModal({ tags }: TagModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs shrink-0 px-2 py-1 rounded-full bg-primary/5 text-primary/80 flex items-center gap-1">
        더보기 <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-4 bottom-4 top-[20%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-card rounded-xl border p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">전체 태그</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] flex flex-wrap gap-2">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm px-3 py-1 rounded-full bg-primary/5 text-primary/80 hover:bg-primary/10 transition-colors">
                  {tag} ({count})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
