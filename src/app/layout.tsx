import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "개발 블로그",
  description: "개발 경험과 프로젝트를 공유하는 블로그",
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <NavBar />
            <div className="flex flex-col lg:flex-row justify-center gap-6 min-h-[calc(100vh-4rem)]">
              <div className="w-full lg:w-[260px] shrink-0">
                <div className="lg:sticky lg:top-4">
                  <Sidebar />
                </div>
              </div>
              <main className="flex-1 max-w-3xl">
                <div className="rounded-xl bg-card border p-6">{children}</div>
              </main>
              <div className="w-[260px] shrink-0"></div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
