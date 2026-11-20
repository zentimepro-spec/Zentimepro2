"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; z: number; size: number };

const particles: Particle[] = Array.from({ length: 420 }, (_, index) => {
  const t = (index + 0.5) / 420;
  const z = 1 - 2 * t;
  const angle = Math.PI * (3 - Math.sqrt(5)) * index;
  const radius = Math.sqrt(1 - z * z);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z,
    size: index % 9 === 0 ? 1.85 : 1.05,
  };
});

export function DigitalCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 640px)");
    let width = 1;
    let height = 1;
    let visible = true;
    let frameId = 0;
    let mounted = true;
    let lastFrame = 0;

    function render(timestamp: number) {
      if (!canvas || !ctx || !mounted) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width * 0.37, height * 0.38, 235);
      const time = motion.matches ? 0 : timestamp;
      const yaw = time * 0.00016 + pointer.current.x * 0.45;
      const pitch = -0.25 + Math.sin(time * 0.00028) * 0.13 - pointer.current.y * 0.26;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      const aura = ctx.createRadialGradient(centerX, centerY, radius * 0.08, centerX, centerY, radius * 1.42);
      aura.addColorStop(0, "rgba(15,141,255,0.27)");
      aura.addColorStop(0.47, "rgba(18,98,255,0.11)");
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(centerX - radius * 1.5, centerY - radius * 1.5, radius * 3, radius * 3);

      function project(x: number, y: number, z: number) {
        const xx = x * cy + z * sy;
        const zz = -x * sy + z * cy;
        const yy = y * cp - zz * sp;
        const depth = y * sp + zz * cp;
        const scale = 2.8 / (3.5 - depth * 0.52);
        return { x: centerX + xx * radius * scale, y: centerY + yy * radius * scale, depth, scale };
      }

      // Multiple orbit paths make the object readable as 3D rather than a flat particle texture.
      for (let ring = 0; ring < 3; ring += 1) {
        ctx.beginPath();
        for (let i = 0; i <= 170; i += 1) {
          const a = (i / 170) * Math.PI * 2;
          const x = Math.cos(a) * 1.12;
          const y = Math.sin(a) * 1.12;
          const z = Math.sin(a * 2 + ring) * 0.09;
          const rotated = ring === 0
            ? project(x, y * 0.28, z)
            : ring === 1
              ? project(x * 0.7, y, z)
              : project(x, z, y * 0.72);
          if (i === 0) ctx.moveTo(rotated.x, rotated.y);
          else ctx.lineTo(rotated.x, rotated.y);
        }
        ctx.strokeStyle = ring === 0 ? "rgba(71,211,255,0.23)" : "rgba(83,125,255,0.18)";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      const projected = particles
        .slice(0, smallScreen.matches ? 240 : 420)
        .map((point) => ({ ...project(point.x, point.y, point.z), size: point.size }))
        .sort((a, b) => a.depth - b.depth);

      for (const point of projected) {
        const opacity = 0.23 + ((point.depth + 1) / 2) * 0.75;
        const size = point.size * point.scale * (smallScreen.matches ? 0.8 : 1);
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = point.depth > 0.18
          ? "rgba(115,230,255," + opacity.toFixed(3) + ")"
          : "rgba(72,118,255," + opacity.toFixed(3) + ")";
        ctx.fill();
      }

      const centerGlow = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, radius * 0.28);
      centerGlow.addColorStop(0, "rgba(168,238,255,0.4)");
      centerGlow.addColorStop(0.15, "rgba(54,182,255,0.15)");
      centerGlow.addColorStop(1, "rgba(13,84,255,0)");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.28, 0, Math.PI * 2);
      ctx.fill();
    }

    function tick(timestamp: number) {
      if (!mounted || !visible || document.hidden) {
        frameId = 0;
        return;
      }
      if (timestamp - lastFrame >= 25) {
        render(timestamp);
        lastFrame = timestamp;
      }
      frameId = requestAnimationFrame(tick);
    }

    function start() {
      if (!frameId && visible && !document.hidden && !motion.matches) {
        frameId = requestAnimationFrame(tick);
      }
      if (motion.matches) render(0);
    }

    function resize() {
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      render(performance.now());
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }, { threshold: 0.03 });
    observer.observe(canvas);

    function onVisibility() {
      if (document.hidden && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else start();
    }
    function onMotionChange() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      start();
    }
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotionChange);
    resize();
    start();

    return () => {
      mounted = false;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      className="ztp-core"
      aria-hidden="true"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current.x = (event.clientX - rect.left) / rect.width - 0.5;
        pointer.current.y = (event.clientY - rect.top) / rect.height - 0.5;
      }}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}
    >
      <div className="ztp-core-backdrop" />
      <canvas ref={canvasRef} className="ztp-core-canvas" />
      <div className="ztp-core-mark ztp-core-mark-top">SYSTEM / ONLINE</div>
      <div className="ztp-core-mark ztp-core-mark-bottom">IMAGINE · BUILD · EVOLVE</div>
      <div className="ztp-core-crosshair ztp-core-crosshair-one" />
      <div className="ztp-core-crosshair ztp-core-crosshair-two" />
    </div>
  );
}
