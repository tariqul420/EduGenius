import { auth } from "@clerk/nextjs/server";
import { Bot } from "lucide-react";
import Link from "next/link";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import NotificationsBell from "@/components/shared/NotificationsBell";
import ThemeBtn from "@/components/shared/ThemeBtn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { sidebar } from "@/constant";

export const metadata = {
  title: "Dashboard | Welcome Our Dashboard.",
  description: "Welcome Our Dashboard.",
};

export default async function Layout({ children }) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role;

  // Define role-based chatbot links
  const chatbotLinks = {
    admin: "/admin/chatbot-assistant",
    instructor: "/instructor/chatbot-assistant",
    student: "/student/chatbot-assistant",
  };

  const chatbotLink = chatbotLinks[role] || "/student/chatbot-assistant";

  return (
    <SidebarProvider>
      {role && <AppSidebar role={role} variant="inset" menu={sidebar[role]} />}
      <main className="flex-1">
        <nav className="dark:from-dark-bg dark:to-dark-bg sticky top-0 z-[20] flex w-full items-center justify-between gap-4 bg-gradient-to-r from-white to-white px-4 py-3 text-black shadow-sm dark:text-white">
          <SidebarTrigger className="cursor-pointer" />
          <div className="flex items-center gap-4">
            <Link href={chatbotLink} className="cursor-pointer">
              <Bot />
            </Link>
            <ThemeBtn />
            <NotificationsBell />
          </div>
        </nav>
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
