import { BlogPostLayout } from "@/components/layout/blog-post-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogPostLayout>{children}</BlogPostLayout>;
}
