import { getAllContent } from "@/lib/content/mdx";
import { PostCard } from "@/components/ui/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [posts, categoryParams] = await Promise.all([
    getAllContent("posts"),
    Promise.resolve(params),
  ]);

  // 유효한 카테고리인지 먼저 확인
  const category = CATEGORIES.find((cat) => cat.id === categoryParams.category);

  if (!category) {
    notFound();
  }

  // 해당 카테고리의 포스트만 필터링
  const filteredPosts = posts.filter(
    (post) => post.frontMatter.category === categoryParams.category
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-muted-foreground">{category.description}</p>
      </div>
      {filteredPosts.length === 0 ? (
        <EmptyState
          title="게시글이 없습니다"
          description={`${category.name} 카테고리의 게시글이 아직 없습니다.`}
        />
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              frontMatter={post.frontMatter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
