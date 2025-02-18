import { CATEGORIES } from "@/lib/constants";
import { getAllContent } from "@/lib/content/mdx";
import { Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import Image from "next/image";

export async function Sidebar() {
  const posts = await getAllContent("posts");

  // 카테고리별 포스트 수 계산
  const categoryCount = posts.reduce((acc, post) => {
    const category = post.frontMatter.category;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // 태그 카운트 계산
  const tagCount = posts.reduce((acc, post) => {
    post.frontMatter.tags?.forEach((tag) => {
      if (tag) {
        acc[tag] = (acc[tag] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // 인기 태그 정렬
  const popularTags = Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div>
      {/* 모바일 뷰 */}
      <div className="lg:hidden space-y-4">
        <SidebarProfile />
        {/* ... 모바일 카테고리/태그 ... */}
      </div>

      {/* 데스크톱 뷰 */}
      <div className="hidden lg:block">
        {/* About Me 카드 */}
        <div className="mb-6">
          <SidebarProfile />
        </div>

        {/* 데스크톱 카테고리 */}
        <div className="mb-6 rounded-xl border bg-card p-4">
          <h3 className="text-lg font-bold mb-3">카테고리</h3>
          <ul className="space-y-1">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog/category/${category.id}`}
                  className="flex items-center justify-between p-2 rounded-lg 
                    hover:bg-secondary group transition-all duration-200
                    active:scale-[0.98]">
                  <span className="text-muted-foreground group-hover:text-foreground flex items-center gap-2">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {category.icon}
                    </span>
                    <span className="text-base">{category.name}</span>
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                    {categoryCount[category.id] || 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 인기 태그 */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-bold mb-4">인기 태그</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="text-base px-3 py-1.5 rounded-full bg-secondary text-muted-foreground 
                  hover:text-foreground hover:bg-secondary/80
                  active:scale-95 transition-all duration-200">
                {tag} ({count})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 정적 컴포넌트 분리
const SidebarProfile = memo(function SidebarProfile() {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-14 w-14">
          <Image
            src="/profile.png"
            alt="우인우"
            fill
            className="rounded-full object-cover ring-4 ring-background hover:scale-105 transition-transform duration-300"
            sizes="56px"
            priority
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">우인우</h3>
          <p className="text-sm text-muted-foreground">@wooinwoo</p>
        </div>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed mb-4">
        프론트엔드 개발자입니다. 클린 코드와 웹 성능 최적화에 관심이 많습니다.
      </p>
      <div className="flex gap-4">
        <Link
          href="https://github.com/wooinwoo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
          <Github className="h-6 w-6" />
        </Link>
        <Link
          href="https://www.instagram.com/in_u___"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
          <Instagram className="h-6 w-6" />
        </Link>
        <Link
          href="mailto:wooin1001@gmail.com"
          className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
          <Mail className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
});
