import { getAllContent } from "@/lib/content/mdx";
import { PostCard } from "@/components/ui/post-card";
import Fuse from "fuse.js";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const posts = await getAllContent("posts");
  const projects = await getAllContent("projects");
  const allContent = [...posts, ...projects];

  let results = allContent;

  if (searchParams.q) {
    const fuse = new Fuse(allContent, {
      keys: [
        "frontMatter.title",
        "frontMatter.description",
        "frontMatter.tags",
      ],
      threshold: 0.3,
    });

    results = fuse.search(searchParams.q).map((result) => result.item);
  }

  return (
    <div className="py-24">
      <h1 className="text-3xl font-bold mb-8">
        {searchParams.q ? `"${searchParams.q}" 검색 결과` : "검색"}
      </h1>
      <div className="grid gap-6">
        {results.map((item) => (
          <PostCard
            key={item.slug}
            slug={item.slug}
            frontMatter={item.frontMatter}
          />
        ))}
      </div>
    </div>
  );
}
