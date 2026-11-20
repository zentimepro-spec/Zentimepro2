"use client";

import { useEffect, useRef } from "react";

export function CursorFX() {
  const circle = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let px = -100, py = -100, x = -100, y = -100, raf = 0, live = true;
    const element = circle.current;
    const caption = label.current;
    if (!element || !caption) return;

    document.body.classList.add("zen-cursor-active");

    function frame() {
      x += (px - x) * .28;
      y += (py - y) * .28;
      if (element) element.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      px = e.clientX; py = e.clientY;
      element!.style.opacity = "1";
      if (!live) { live = true; raf = requestAnimationFrame(frame); }
      const target = e.target;
      if (!(target instanceof Element)) return;
      const action = target.closest<HTMLElement>("a, button, [data-cursor]");
      const editable = target.closest("input, textarea, select, [contenteditable]");
      const text = editable ? "" : (action?.dataset.cursor || (action ? "↗" : ""));
      caption!.textContent = text;
      element!.classList.toggle("is-action", Boolean(text));
      element!.classList.toggle("is-text", Boolean(editable));
    }
    function onOut(e: MouseEvent) {
      if (!e.relatedTarget) element!.style.opacity = "0";
    }
    function onReduce() {
      if (reduced.matches || !fine.matches) {
        document.body.classList.remove("zen-cursor-active");
        element!.style.opacity = "0";
      } else document.body.classList.add("zen-cursor-active");
    }
    function onVisibility() {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        live = false;
      } else if (!live) { live = true; raf = requestAnimationFrame(frame); }
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("visibilitychange", onVisibility);
    fine.addEventListener("change", onReduce);
    reduced.addEventListener("change", onReduce);
    raf = requestAnimationFrame(frame);

    return () => {
      document.body.classList.remove("zen-cursor-active");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
      fine.removeEventListener("change", onReduce);
      reduced.removeEventListener("change", onReduce);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={circle} className="zen-pointer" aria-hidden="true"><span ref={label} /></div>;
}
