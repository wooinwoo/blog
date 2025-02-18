"use client";

import dynamic from "next/dynamic";

const DynamicTableOfContents = dynamic(
  () =>
    import("@/components/table-of-contents").then((mod) => mod.TableOfContents),
  { ssr: false }
);

export function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="hidden xl:block fixed right-[max(0px,calc((100vw-80rem)/2+1rem))] top-[3.8125rem] w-[240px]">
        <div className="h-full pt-4">
          <DynamicTableOfContents />
        </div>
      </div>
    </>
  );
}
