import { Inter, Roboto } from "next/font/google";

import ClientClerkProvider from "@/components/shared/client-clerk-provider";
import { ThemeProvider } from "@/components/shared/theme-provider";
import ToasterProvider from "@/components/shared/ToasterProvider";
import ContextProvider from "@/provider/context-provider";
import "./globals.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "EduGenius | AI-Powered Course Management System",
  description:
    "EduGenius is an advanced AI-powered course management system designed to personalize learning, track progress, and recommend optimized learning paths. Enhance your educational journey with EduGenius.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${roboto.variable} bg-light-theme dark:bg-dark-theme antialiased dark:text-white`}
        cz-shortcut-listen="true"
      >
        <ContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ClientClerkProvider>
              {children}
              <ToasterProvider />
            </ClientClerkProvider>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
