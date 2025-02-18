/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // 서버 컴포넌트에서 fs 모듈 사용 허용
  serverComponentsExternalPackages: ["fs", "path"],
};

export default nextConfig;
