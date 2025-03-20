import { ThemeProvider } from "@/components/shared/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Jost } from "next/font/google";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import "./globals.css";
import ContextProvider from "@/provider/ContextProvider";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata = {
  title: "EduGenius | AI-Powered Course Management System",
  description:
    "EduGenius is an advanced AI-powered course management system designed to personalize learning, track progress, and recommend optimized learning paths. Enhance your educational journey with EduGenius.",
  keywords: [
    "EduGenius",
    "AI-Powered Course Management",
    "Learning Management System",
    "Personalized Learning",
    "AI Education",
    "Course Management",
    "Learning Path Optimization",
  ],
  authors: [{ name: "Sinister Syntax", url: "https://edugenius.verce.app" }],
  creator: "Sinister Syntax",
  openGraph: {
    title: "EduGenius | AI-Powered Course Management System",
    description:
      "Revolutionize your learning experience with EduGenius - the AI-powered course management system that adapts to your progress and preferences.",
    url: "https://edugenius.vercel.app",
    siteName: "EduGenius",
    images: [
      {
        url: "https://edugenius.com/og-image.jpg",
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
    description:
      "Discover a smarter way to manage and personalize your learning experience with EduGenius.",
    images: ["https://edugenius.com/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${jost.variable} antialiased dark:bg-black-dark dark:text-white`}>
          <ContextProvider>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
