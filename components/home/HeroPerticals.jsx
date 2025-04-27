"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "../magicui/particles";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
      <Particles
        className="absolute inset-0 z-0 max-h-[650px]"
        quantity={100}
        ease={80}
        color={color}
      />
  );
}
