"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [mounted, setMounted] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    // article 내부의 prose 클래스에서만 h2, h3 태그 선택
    const elements = Array.from(
      document.querySelector("article .prose")?.querySelectorAll("h2, h3") || []
    );

    // 고유한 ID 생성
    elements.forEach((element, index) => {
      if (!element.id) {
        const text = element.textContent || "";
        element.id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
      }
    });

    const headingElements = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)),
    }));

    setHeadings(headingElements);

    const handleScroll = () => {
      const headingElements = elements.map((element) => ({
        id: element.id,
        top: element.getBoundingClientRect().top,
      }));

      const currentHeading = headingElements.find((heading) => heading.top > 0);
      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setMounted(false);
    };
  }, []);

  // 서버사이드 렌더링 시 아무것도 렌더링하지 않음
  if (typeof window === "undefined" || !mounted || headings.length === 0) {
    return null;
  }

  return (
    <nav className="text-sm">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`block py-1 transition-colors hover:text-primary ${
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
