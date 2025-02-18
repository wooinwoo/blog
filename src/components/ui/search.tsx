"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { type Content } from "@/types";

interface SearchProps {
  initialData: Content[];
}

export function Search({ initialData }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = query
    ? initialData.filter((item) =>
        item.frontMatter.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full sm:w-[280px]">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="검색어를 입력하세요..."
          className="w-full rounded-full border bg-card/50 px-9 py-2 text-sm outline-none focus:bg-card focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      {isOpen && filteredData.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border bg-card shadow-lg">
          <div className="p-2">
            {filteredData.slice(0, 5).map((item) => (
              <Link
                key={item.slug}
                href={`/${item.type}/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-4 py-2 hover:bg-muted">
                <div className="text-sm font-medium">
                  {item.frontMatter.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.frontMatter.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
