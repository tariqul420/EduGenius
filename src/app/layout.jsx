import ClientClerkProvider from "@/components/shared/ClientClerkProvider";
import { ThemeProvider } from "@/components/shared/theme-provider";
import ContextProvider from "@/provider/ContextProvider";
import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
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
        className={`${jost.variable} dark:bg-black-dark antialiased dark:text-white`}
        cz-shortcut-listen="true"
      >
        <ContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientClerkProvider>
              {children}
              <Toaster position="top-right" />
            </ClientClerkProvider>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
