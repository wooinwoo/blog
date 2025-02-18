import { getAllContent } from "@/lib/content/mdx";
import { NavBarClient } from "./nav-bar-client";

export async function NavBar() {
  const posts = await getAllContent("posts");
  const projects = await getAllContent("projects");
  const allContent = [...posts, ...projects].map((content) => ({
    ...content,
    type: content.slug.startsWith("posts/") ? "blog" : "projects",
  }));

  return <NavBarClient initialData={allContent} />;
}
