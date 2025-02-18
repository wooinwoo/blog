export const CATEGORIES = [
  {
    id: "frontend",
    name: "프론트엔드",
    description: "React, Next.js 등 프론트엔드 개발 이야기",
    icon: "🎨",
  },
  {
    id: "algorithm",
    name: "알고리즘",
    description: "코딩 테스트와 알고리즘 문제 해결",
    icon: "🧮",
  },
  {
    id: "backend",
    name: "백엔드",
    description: "서버 및 API 개발",
    icon: "⚙️",
  },
  {
    id: "database",
    name: "데이터베이스",
    description: "데이터 모델링 및 쿼리 최적화",
    icon: "💾",
  },
  {
    id: "architecture",
    name: "아키텍처",
    description: "시스템 설계 및 패턴",
    icon: "🏗️",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const ITEMS_PER_PAGE = 5; // 페이지네이션용
export const ITEMS_PER_SECTION = 4; // 메인 페이지 섹션당 아이템 수
