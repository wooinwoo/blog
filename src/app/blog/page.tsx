import { getAllContent } from "@/lib/content/mdx";
import { PostCard } from "@/components/ui/post-card";
import { TagList } from "@/components/ui/tag-list";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";

interface BlogPageProps {
  searchParams: {
    page?: string;
    tag?: string;
  };
}

const POSTS_PER_PAGE = 5;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [posts, params] = await Promise.all([
    getAllContent("posts"),
    Promise.resolve(searchParams),
  ]);

  if (posts.length === 0) {
    return (
      <EmptyState
        title="게시글이 없습니다"
        description="아직 등록된 게시글이 없습니다."
      />
    );
  }

  const currentPage = Number(params.page) || 1;

  // 모든 태그 수집
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.frontMatter.tags || []))
  );

  // 태그로 필터링
  const filteredPosts = params.tag
    ? posts.filter((post) => post.frontMatter.tags?.includes(params.tag!))
    : posts;

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">블로그</h1>
      </div>
      <TagList tags={allTags} activeTag={params.tag} />
      {currentPosts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid gap-6">
            {currentPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                frontMatter={post.frontMatter}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            tag={params.tag}
          />
        </>
      )}
    </div>
  );
}
