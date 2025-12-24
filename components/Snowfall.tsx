"use client";

import { useEffect, useState, useMemo } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  blur: number;
  drift: number;
}

export default function Snowfall() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const snowflakes = useMemo(() => {
    const flakes: Snowflake[] = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 2;
      const isLarge = size > 4;

      flakes.push({
        id: i,
        left: Math.random() * 100,
        size,
        animationDuration: Math.random() * 10 + 10,
        animationDelay: Math.random() * -20,
        opacity: isLarge ? Math.random() * 0.4 + 0.4 : Math.random() * 0.3 + 0.2,
        blur: isLarge ? 0 : Math.random() * 1.5,
        drift: Math.random() * 40 - 20,
      });
    }

    return flakes;
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: flake.blur > 0 ? `blur(${flake.blur}px)` : undefined,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            "--drift": `${flake.drift}px`,
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 100%)",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
