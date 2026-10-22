"use client";

import { useEffect } from "react";

export default function UniversityAutocompleteEnhancer() {
  useEffect(() => {
    let abort: AbortController | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const attach = () => {
      const input = document.querySelector<HTMLInputElement>('input[placeholder="Your current institution"]');
      if (!input || input.dataset.universityAutocomplete === "true") return;

      input.dataset.universityAutocomplete = "true";
      input.setAttribute("autocomplete", "off");
      input.setAttribute("list", "china-university-options");

      let list = document.getElementById("china-university-options") as HTMLDataListElement | null;
      if (!list) {
        list = document.createElement("datalist");
        list.id = "china-university-options";
        document.body.appendChild(list);
      }

      const update = async () => {
        const query = input.value.trim();
        if (query.length < 1) {
          list!.replaceChildren();
          return;
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
          abort?.abort();
          abort = new AbortController();
          try {
            const response = await fetch(`/api/universities?q=${encodeURIComponent(query)}`, { signal: abort.signal });
            if (!response.ok) return;
            const data = (await response.json()) as { results?: string[] };
            list!.replaceChildren(
              ...(data.results ?? []).map((name) => {
                const option = document.createElement("option");
                option.value = name;
                return option;
              }),
            );
          } catch (error) {
            if ((error as Error).name !== "AbortError") console.error(error);
          }
        }, 120);
      };

      input.addEventListener("input", update);
      input.addEventListener("focus", update);
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      abort?.abort();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
