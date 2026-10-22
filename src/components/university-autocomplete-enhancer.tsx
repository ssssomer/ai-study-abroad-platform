"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GraduationCap, Loader2 } from "lucide-react";

type University = { name: string; province?: string; city?: string; level?: string };

function normalize(input: unknown): University[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => typeof item === "string" ? { name: item } : item as University)
    .filter((item) => Boolean(item?.name));
}

export default function UniversityAutocompleteEnhancer() {
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [results, setResults] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    function findInput() {
      const found = document.querySelector<HTMLInputElement>('input[placeholder="Your current institution"]');
      if (found && found !== input) setInput(found);
    }
    findInput();
    const observer = new MutationObserver(findInput);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [input]);

  useEffect(() => {
    if (!input) return;

    let controller: AbortController | null = null;
    let timer = 0;

    function position() {
      setRect(input.getBoundingClientRect());
    }

    async function search() {
      const q = input.value.trim();
      position();
      if (!q) {
        setResults([]);
        setOpen(false);
        return;
      }

      controller?.abort();
      controller = new AbortController();
      setLoading(true);
      try {
        const response = await fetch(`/api/universities?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("University search failed");
        const data = await response.json();
        const items = normalize(data?.results);
        setResults(items);
        setOpen(true);
        setActive(0);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
          setOpen(true);
        }
      } finally {
        setLoading(false);
      }
    }

    function handleInput() {
      window.clearTimeout(timer);
      timer = window.setTimeout(search, 140);
    }

    function handleFocus() {
      position();
      if (input.value.trim()) search();
    }

    function handleBlur() {
      window.setTimeout(() => setOpen(false), 140);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!open || results.length === 0) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((index) => Math.min(index + 1, results.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        choose(results[active]);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    input.removeAttribute("list");
    input.setAttribute("autocomplete", "off");
    input.addEventListener("input", handleInput);
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    input.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);

    return () => {
      window.clearTimeout(timer);
      controller?.abort();
      input.removeEventListener("input", handleInput);
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
      input.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [input, open, results, active]);

  function choose(item: University) {
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, item.name);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    setOpen(false);
    input.focus();
  }

  if (!input || !open || !rect || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed z-[9999] max-h-80 overflow-y-auto rounded-2xl border border-[#dfe3dc] bg-white p-2 shadow-[0_24px_70px_rgba(35,67,58,.22)]"
      style={{ left: rect.left, top: rect.bottom + 8, width: rect.width }}
      onMouseDown={(event) => event.preventDefault()}
    >
      {loading && results.length === 0 ? (
        <div className="flex items-center gap-2 px-4 py-5 text-sm text-[#7d8c87]"><Loader2 className="h-4 w-4 animate-spin" />正在搜索高校…</div>
      ) : results.length > 0 ? (
        results.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            type="button"
            onMouseEnter={() => setActive(index)}
            onClick={() => choose(item)}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition ${index === active ? "bg-[#edf4f0]" : "hover:bg-[#f5f7f3]"}`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f0eb] text-[#356b5f]"><GraduationCap className="h-4 w-4" /></div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-[#17362f]">{item.name}</div>
              <div className="mt-0.5 truncate text-xs text-[#8a9893]">{[item.province, item.city, item.level].filter(Boolean).join(" · ") || "中国大陆高校"}</div>
            </div>
          </button>
        ))
      ) : (
        <div className="px-4 py-5">
          <p className="text-sm font-medium text-[#425f57]">没有找到匹配学校</p>
          <p className="mt-1 text-xs text-[#8a9893]">继续输入完整校名即可。</p>
        </div>
      )}
    </div>,
    document.body,
  );
}
