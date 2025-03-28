"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClientClerkProvider({ children }) {
  const { theme } = useTheme(); // Access the current theme (light or dark)

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : light, // Dynamically set Clerk theme
      }}
    >
      {children}
    </ClerkProvider>
  );
}
