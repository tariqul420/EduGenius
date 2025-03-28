import { ThemeProvider } from "@/components/shared/theme-provider";
import ContextProvider from "@/provider/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
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
    "EduGenius is an advanced AI-powered course management system...",
  keywords: [
    "EduGenius",
    "AI-Powered Course Management",
    "Learning Management System",
    "Personalized Learning",
    "AI Education",
    "Course Management",
    "Learning Path Optimization",
  ],
  authors: [{ name: "Sinister Syntax", url: "https://edugenius.vercel.app" }],
  creator: "Sinister Syntax",
  metadataBase: new URL("https://edu-genius.vercel.app"),
  openGraph: {
    title: "EduGenius | AI-Powered Course Management System",
    description: "Revolutionize your learning experience with EduGenius...",
    url: "https://edu-genius.vercel.app",
    siteName: "EduGenius",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "EduGenius - AI-Powered Course Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@EduGenius",
    creator: "@SinisterSyntax",
    title: "EduGenius | AI-Powered Course Management",
    description: "Discover a smarter way to manage and personalize...",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${jost.variable} antialiased`}
          cz-shortcut-listen="true"
        >
          <ContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div suppressHydrationWarning>{children}</div>
              <Toaster position="top-right" />
            </ThemeProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
