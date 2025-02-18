import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true, // HTML 태그 허용
  breaks: true, // 줄바꿈을 <br>로 변환
  linkify: true, // URL을 자동으로 링크로 변환
});

type ContentType = "posts" | "projects";

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

interface ContentItem {
  frontMatter: FrontMatter;
  slug: string;
  type: "posts" | "projects";
}

export async function getContentBySlug(type: ContentType, slug: string) {
  const contentDir = path.join(process.cwd(), "src/content", type);
  const filePath = path.join(contentDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // 첫 번째 h1과 그 다음 paragraph를 제거
  const processedContent = content
    .replace(/^#\s+.*\n/, "") // 첫 번째 h1 제거
    .replace(/^\n*([^\n]+)\n/, ""); // 첫 번째 paragraph 제거

  return {
    frontMatter: data as FrontMatter,
    content: md.render(processedContent),
    slug,
  };
}

export async function getAllContent(
  type: "posts" | "projects"
): Promise<ContentItem[]> {
  const contentDir = path.join(process.cwd(), "src/content", type);
  const files = fs.readdirSync(contentDir);

  const content = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        frontMatter: data as FrontMatter,
        slug,
        type,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    );

  return content;
}
