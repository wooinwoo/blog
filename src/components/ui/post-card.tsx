import Link from "next/link";
import { type FrontMatter } from "@/types";
import { format } from "date-fns";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  slug: string;
  frontMatter: FrontMatter;
}

export function PostCard({ slug, frontMatter }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={true}
      className="group block overflow-hidden rounded-xl border hover:border-primary/20 transition-all duration-300">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time>{formatDate(frontMatter.date)}</time>
          <span>·</span>
          <span>{frontMatter.category}</span>
        </div>
        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
          {frontMatter.title}
        </h2>
        <p className="text-muted-foreground line-clamp-2">
          {frontMatter.description}
        </p>
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
