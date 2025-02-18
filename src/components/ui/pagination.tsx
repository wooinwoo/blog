"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tag?: string;
}

export function Pagination({ currentPage, totalPages, tag }: PaginationProps) {
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    if (tag) params.set("tag", tag);
    return `?${params.toString()}`;
  };

  // totalPages가 0이거나 음수인 경우 처리
  if (totalPages <= 0) return null;

  return (
    <div className="flex justify-center gap-2">
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "p-2 rounded-lg hover:bg-muted transition-colors",
          currentPage <= 1 && "pointer-events-none opacity-50"
        )}>
        <ChevronLeft className="h-5 w-5" />
      </Link>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={createPageURL(i + 1)}
          className={cn(
            "p-2 rounded-lg hover:bg-muted transition-colors",
            currentPage === i + 1 && "bg-muted"
          )}>
          {i + 1}
        </Link>
      ))}
      <Link
        href={createPageURL(currentPage + 1)}
        className={cn(
          "p-2 rounded-lg hover:bg-muted transition-colors",
          currentPage >= totalPages && "pointer-events-none opacity-50"
        )}>
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
