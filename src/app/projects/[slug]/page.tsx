import { getContentBySlug } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import { format } from "date-fns";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const project = await getContentBySlug("projects", resolvedParams.slug);

    return (
      <article>
        <header className="mb-8 space-y-6">
          <div className="space-y-4">
            <time className="block text-sm text-muted-foreground">
              {format(new Date(project.frontMatter.date), "MMMM d, yyyy")}
            </time>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {project.frontMatter.title}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {project.frontMatter.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.frontMatter.tags?.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}
