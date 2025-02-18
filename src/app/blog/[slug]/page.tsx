import { getContentBySlug, getAllContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const post = await getContentBySlug("posts", resolvedParams.slug);

    return (
      <article>
        <header className="mb-8 space-y-4">
          <div className="space-y-2">
            <time className="text-sm text-muted-foreground">
              {format(new Date(post.frontMatter.date), "MMMM d, yyyy")}
            </time>
            <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {post.frontMatter.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.frontMatter.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-secondary text-primary/80">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const posts = await getAllContent("posts");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = await getContentBySlug("posts", resolvedParams.slug);

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
  };
}
