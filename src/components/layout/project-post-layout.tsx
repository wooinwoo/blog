"use client";

import dynamic from "next/dynamic";

const DynamicTableOfContents = dynamic(
  () =>
    import("@/components/table-of-contents").then((mod) => mod.TableOfContents),
  { ssr: false }
);

export function ProjectPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* 메인 컨텐츠 */}
      <main>{children}</main>

      {/* 목차 사이드바 */}
      <aside className="hidden xl:block fixed right-[max(0px,calc((100vw-80rem)/2-4rem))] top-[3.8125rem] w-[260px]">
        <div className="pt-4">
          <DynamicTableOfContents />
        </div>
      </aside>
    </div>
  );
}
