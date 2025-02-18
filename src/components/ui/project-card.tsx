import Link from "next/link";
import { type FrontMatter } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  slug: string;
  frontMatter: FrontMatter;
}

export function ProjectCard({ slug, frontMatter }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      prefetch={true}
      className="group block overflow-hidden rounded-xl border hover:border-primary/20 transition-all duration-300">
      {/* 이미지 영역 제거 */}
      <div className="p-6 space-y-4">
        {/* 메타 정보 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time>{formatDate(frontMatter.date)}</time>
          <span>·</span>
          <span>{frontMatter.category}</span>
        </div>
        {/* 제목 */}
        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
          {frontMatter.title}
        </h2>
        {/* 설명 */}
        <p className="text-muted-foreground line-clamp-2">
          {frontMatter.description}
        </p>
        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {frontMatter.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-primary/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
