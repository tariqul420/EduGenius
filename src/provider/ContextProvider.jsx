// Client Component (ContextProvider.tsx)
"use client";
import { createContext, useState } from "react";

export const MyContext = createContext(null);

export default function ContextProvider({ children }) {
  const [isGridCol, setIsGridCol] = useState(false);
  const providerInfo = {
    isGridCol,
    setIsGridCol,
  }

  return (
    <MyContext.Provider value={providerInfo}>
      {children}
    </MyContext.Provider>
  );
}
