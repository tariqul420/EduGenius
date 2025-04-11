"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterProvider() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return <Toaster theme={isDarkMode ? "dark" : "light"} position="top-right" />;
}
