"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "@/components/ui/search";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Content } from "@/types";
import { Terminal } from "lucide-react";

interface NavBarClientProps {
  initialData: Content[];
}

export function NavBarClient({ initialData }: NavBarClientProps) {
  const pathname = usePathname();

  return (
    <nav className="min-h-[4rem] py-4 sm:h-16 sm:py-0 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
      <div className="flex items-center justify-between sm:flex-1">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-bold text-lg hover:text-foreground/80 transition-colors",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}>
            <Terminal className="h-5 w-5" />
            <span>Inwoo.log</span>
          </Link>
          <Link
            href="/blog"
            className={cn(
              "font-bold hover:text-foreground/80 transition-colors",
              pathname.startsWith("/blog")
                ? "text-foreground"
                : "text-foreground/60"
            )}>
            블로그
          </Link>
          <Link
            href="/projects"
            className={cn(
              "font-bold hover:text-foreground/80 transition-colors",
              pathname.startsWith("/projects")
                ? "text-foreground"
                : "text-foreground/60"
            )}>
            프로젝트
          </Link>
        </div>
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-50">
        <Search initialData={initialData} />
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
