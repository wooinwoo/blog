import { getAllContent } from "@/lib/content/mdx";
import { format } from "date-fns";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

interface ProjectsPageProps {
  searchParams: { tag?: string };
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const [projects, params] = await Promise.all([
    getAllContent("projects"),
    Promise.resolve(searchParams),
  ]);

  // 태그로 필터링
  const filteredProjects = params.tag
    ? projects.filter((project) =>
        project.frontMatter.tags?.includes(params.tag)
      )
    : projects;

  // 모든 프로젝트의 태그 수집
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.frontMatter.tags || []))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">프로젝트</h1>
      </div>
      <TagList tags={allTags} activeTag={params.tag} />
      {filteredProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-6 rounded-lg border bg-card hover:bg-muted/50 transition-all hover:shadow-md">
              <div className="space-y-4">
                <div>
                  <time className="text-sm text-muted-foreground">
                    {formatDate(project.frontMatter.date)}
                  </time>
                  <h2 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">
                    {project.frontMatter.title}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {project.frontMatter.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.frontMatter.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
