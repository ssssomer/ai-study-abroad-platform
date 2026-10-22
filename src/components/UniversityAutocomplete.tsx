"use client";

import { useEffect, useRef, useState } from "react";
import { Check, GraduationCap, Loader2, Search } from "lucide-react";

type University = {
  name: string;
  province?: string;
  city?: string;
  level?: string;
};

export default function UniversityAutocomplete({
  value,
  onChange,
  inputClass,
}: {
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<University[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const text = query.trim();
    if (text.length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/universities?q=${encodeURIComponent(text)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        const items = Array.isArray(data?.results) ? data.results : [];
        setResults(items);
        setOpen(true);
        setActiveIndex(items.length ? 0 : -1);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
          setOpen(true);
        }
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function choose(item: University) {
    setQuery(item.name);
    onChange(item.name);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(results[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative z-30">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#93a39e]" />
        <input
          className={`${inputClass} pl-11 pr-10`}
          placeholder="输入学校名称，例如：中山大学"
          value={query}
          autoComplete="off"
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            onChange(next);
            setOpen(true);
          }}
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#78938b]" />}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-y-auto rounded-2xl border border-[#dfe3dc] bg-white p-2 shadow-[0_20px_55px_rgba(35,67,58,.16)]">
          {loading && results.length === 0 ? (
            <div className="px-4 py-5 text-sm text-[#7d8c87]">正在搜索高校…</div>
          ) : results.length > 0 ? (
            results.map((item, index) => {
              const selected = item.name === value;
              const active = index === activeIndex;
              return (
                <button
                  type="button"
                  key={`${item.name}-${item.city ?? index}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(item)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition ${active ? "bg-[#edf4f0]" : "hover:bg-[#f5f7f3]"}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f0eb] text-[#356b5f]">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-[#17362f]">{item.name}</div>
                    <div className="mt-0.5 truncate text-xs text-[#8a9893]">
                      {[item.province, item.city, item.level].filter(Boolean).join(" · ") || "中国大陆高校"}
                    </div>
                  </div>
                  {selected && <Check className="h-4 w-4 shrink-0 text-[#2f6b5f]" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-5">
              <p className="text-sm font-medium text-[#425f57]">没有找到匹配学校</p>
              <p className="mt-1 text-xs leading-5 text-[#8a9893]">你仍然可以保留当前输入，或尝试输入学校全称。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
