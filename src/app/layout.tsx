import type { Metadata } from "next";
import "./globals.css";
import UniversityAutocompleteEnhancer from "@/components/university-autocomplete-enhancer";

export const metadata: Metadata = {
  title: "StudyPath｜AI 全流程留学规划与申请平台",
  description: "面向中国大陆学生的 AI 留学顾问平台，覆盖背景诊断、职业规划、国家与选校、申请、Offer、签证、住宿与落地。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <UniversityAutocompleteEnhancer />
        {children}
      </body>
    </html>
  );
}
