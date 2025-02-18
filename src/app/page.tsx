import { getAllContent } from "@/lib/content/mdx";
import { PostCard } from "@/components/ui/post-card";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { CATEGORIES } from "@/lib/constants";

export default async function Home() {
  const posts = await getAllContent("posts");
  const projects = await getAllContent("projects");

  // 최근 업데이트 (최신 6개)
  const recentUpdates = [...posts, ...projects]
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    )
    .slice(0, 6); // 더 많은 최신 컨텐츠 표시

  return (
    <div className="space-y-12">
      {/* 최근 업데이트 섹션 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground/90">
            최근 업데이트
          </h2>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              전체보기
            </Link>
          </div>
        </div>
        {recentUpdates.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {recentUpdates.map((content) =>
              content.type === "posts" ? (
                <PostCard
                  key={content.slug}
                  slug={content.slug}
                  frontMatter={content.frontMatter}
                />
              ) : (
                <ProjectCard
                  key={content.slug}
                  slug={content.slug}
                  frontMatter={content.frontMatter}
                />
              )
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 카테고리별 섹션 */}
      {CATEGORIES.map((category) => {
        const categoryPosts = posts
          .filter((post) => post.frontMatter.category === category.id)
          .slice(0, 2);

        if (categoryPosts.length === 0) return null;

        return (
          <section key={category.id}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground/90">
                  {category.name}
                </h2>
              </div>
              <Link
                href={`/blog/category/${category.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                더보기
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {categoryPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  frontMatter={post.frontMatter}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
