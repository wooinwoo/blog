"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버사이드 렌더링 시 아무것도 렌더링하지 않음
  if (!mounted) {
    return (
      <button className="relative h-8 w-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
        <div className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-8 w-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
      <div className="relative w-4 h-4">
        {theme === "dark" ? (
          <Moon className="h-4 w-4 rotate-90 text-foreground" />
        ) : (
          <Sun className="h-4 w-4 rotate-0 text-foreground" />
        )}
      </div>
    </button>
  );
}
