import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400;

const FALLBACK_UNIVERSITIES = [
  "北京大学","中国人民大学","清华大学","北京交通大学","北京工业大学","北京航空航天大学","北京理工大学","北京科技大学","北京化工大学","北京邮电大学","北京师范大学","北京外国语大学","中国传媒大学","中央财经大学","对外经济贸易大学","中国政法大学","中国农业大学","北京林业大学","首都经济贸易大学","首都师范大学","南开大学","天津大学","天津财经大学","大连理工大学","东北大学","吉林大学","东北师范大学","哈尔滨工业大学","哈尔滨工程大学","复旦大学","上海交通大学","同济大学","华东师范大学","华东理工大学","上海财经大学","上海外国语大学","东华大学","南京大学","东南大学","南京航空航天大学","南京理工大学","河海大学","南京师范大学","南京农业大学","苏州大学","浙江大学","杭州电子科技大学","浙江工业大学","浙江工商大学","中国科学技术大学","合肥工业大学","厦门大学","福州大学","南昌大学","山东大学","中国海洋大学","中国石油大学（华东）","武汉大学","华中科技大学","武汉理工大学","华中师范大学","中南财经政法大学","湖南大学","中南大学","中山大学","华南理工大学","暨南大学","华南师范大学","深圳大学","广东外语外贸大学","广东工业大学","重庆大学","西南大学","四川大学","电子科技大学","西南财经大学","西南交通大学","西安交通大学","西北工业大学","西安电子科技大学","陕西师范大学","西北大学","兰州大学","云南大学","贵州大学","广西大学","海南大学"
];

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, "")
    .trim();
}

async function loadUniversities() {
  try {
    const response = await fetch("https://m.bendibao.com/show1006204.html", {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!response.ok) throw new Error("University source unavailable");
    const html = await response.text();
    const cells = [...html.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => decodeHtml(match[1]));
    const schoolPattern = /(大学|学院|高等专科学校|专科学校|职业技术大学|职业大学|职业学院|职业技术学院)$/;
    const names = cells.filter((value) => value.length >= 3 && value.length <= 40 && schoolPattern.test(value));
    const unique = [...new Set(names)];
    return unique.length > 1500 ? unique : FALLBACK_UNIVERSITIES;
  } catch {
    return FALLBACK_UNIVERSITIES;
  }
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (!q) return NextResponse.json({ results: [] });

  const universities = await loadUniversities();
  const results = universities
    .filter((name) => name.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.toLowerCase().startsWith(q) ? 0 : 1;
      return aStarts - bStarts || a.localeCompare(b, "zh-CN");
    })
    .slice(0, 12);

  return NextResponse.json({ results, source: "MOE 2026 directory mirror" });
}
