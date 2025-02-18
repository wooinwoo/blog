import { getAllContent } from "@/lib/content/mdx";
import { PostCard } from "@/components/ui/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: { tag: string };
}

export default async function TagPage({ params }: TagPageProps) {
  const [posts, tagParams] = await Promise.all([
    getAllContent("posts"),
    Promise.resolve(params),
  ]);

  // 태그로 필터링
  const filteredPosts = posts.filter((post) =>
    post.frontMatter.tags?.includes(tagParams.tag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">#{tagParams.tag}</h1>
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            frontMatter={post.frontMatter}
          />
        ))}
      </div>
    </div>
  );
}
