export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

export type ContentType = "posts" | "projects";

export interface Content {
  slug: string;
  content: string;
  frontMatter: FrontMatter;
  type: "posts" | "projects";
}
