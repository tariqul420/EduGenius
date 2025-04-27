"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClientClerkProvider({ children }) {
  const { theme, systemTheme } = useTheme();

  // Get the effective theme (user selected or system default)
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: currentTheme === "dark" ? dark : light,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
