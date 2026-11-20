"use client";

import { useId } from "react";

type ZenMood = "idle" | "talk" | "happy" | "thinking";

export function ZenAvatar({ mood = "idle", size = 64, className = "" }: { mood?: ZenMood; size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={"zen-avatar zen-avatar-" + mood + " " + className} width={size} height={size} viewBox="0 0 120 132" fill="none" role="img" aria-label="Zen, personagem digital da Zen Time Pro">
      <defs>
        <linearGradient id={id + "body"} x1="18" y1="8" x2="109" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A8F9FF"/><stop offset=".33" stopColor="#32D6FC"/><stop offset=".73" stopColor="#0876E9"/><stop offset="1" stopColor="#1746BC"/>
        </linearGradient>
        <radialGradient id={id + "glow"} cx="0" cy="0" r="1" gradientTransform="translate(50 30) rotate(70) scale(95)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4DE1FF" stopOpacity=".5"/><stop offset="1" stopColor="#0A36A9" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="69" rx="54" ry="58" fill={"url(#" + id + "glow)"} />
      <g className="zen-avatar-body">
        <path d="M49 115L42 123M72 115L79 123" stroke="#48BEEA" strokeWidth="6" strokeLinecap="round"/>
        <path d="M24 76L11 84M96 76L109 84" stroke="#4FC7F6" strokeWidth="7" strokeLinecap="round"/>
        <circle cx="11" cy="84" r="5" fill="#9AF3FF"/><circle cx="109" cy="84" r="5" fill="#9AF3FF"/>
        <path d="M28 35C34 21 47 14 60 14C78 14 94 25 99 44L104 76C108 98 85 117 60 117C34 117 12 99 16 75L21 47C22 42 25 38 28 35Z" fill={"url(#" + id + "body)"} stroke="#B9F5FF" strokeWidth="2"/>
        <path d="M30 48C37 36 46 31 60 31C75 31 88 40 92 52L94 75C95 91 80 104 60 104C39 104 24 91 26 75L28 57C28 54 29 51 30 48Z" fill="#071B38" stroke="#5CBFF7" strokeWidth="1.6"/>
        <path d="M32 42C42 24 66 19 83 33" stroke="white" strokeOpacity=".47" strokeWidth="4" strokeLinecap="round"/>
        <ellipse className="zen-avatar-eye zen-avatar-eye-left" cx="45" cy="65" rx="5.5" ry="8" fill="#95F8FF"/>
        <ellipse className="zen-avatar-eye zen-avatar-eye-right" cx="75" cy="65" rx="5.5" ry="8" fill="#95F8FF"/>
        <circle cx="44" cy="62" r="1.7" fill="white"/><circle cx="74" cy="62" r="1.7" fill="white"/>
        <path className="zen-avatar-mouth" d={mood === "happy" ? "M46 83Q60 97 74 83" : mood === "thinking" ? "M51 87H69" : "M49 84Q60 90 71 84"} stroke="#79EDFF" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M60 14V7" stroke="#70E7FF" strokeWidth="4" strokeLinecap="round"/>
        <circle className="zen-avatar-antenna" cx="60" cy="6" r="5" fill="#B5FFFF" stroke="#238FE8" strokeWidth="1.5"/>
        <ellipse cx="36" cy="84" rx="6" ry="3" fill="#247DCF" fillOpacity=".47"/>
        <ellipse cx="84" cy="84" rx="6" ry="3" fill="#247DCF" fillOpacity=".47"/>
      </g>
    </svg>
  );
}
