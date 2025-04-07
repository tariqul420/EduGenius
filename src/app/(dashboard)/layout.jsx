import { AppSidebar } from "@/components/dashboard/instructor/AppSidebar";
import Notification from "@/components/shared/Notification";
import ThemeBtn from "@/components/shared/ThemeBtn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { admins, instructors, students } from "@/constant";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "Dashboard | Welcome Our Dashboard.",
  description: "Welcome Our Dashboard.",
};

export default async function Layout({ children }) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role;

  return (
    <SidebarProvider>
      {role === "instructor" && (
        <AppSidebar variant="inset" menu={instructors} />
      )}
      {role === "student" && <AppSidebar variant="inset" menu={students} />}
      {role === "admin" && <AppSidebar variant="inset" menu={admins} />}
      <main className="flex-1">
        <nav className="dark:from-dark-bg dark:to-dark-bg sticky top-0 z-[20] flex w-full items-center justify-between gap-4 bg-gradient-to-r from-white to-white px-4 py-3 text-black shadow-sm dark:text-white">
          <SidebarTrigger className="cursor-pointer" />
          <div className="flex items-center gap-4">
            <ThemeBtn />
            <Notification />
          </div>
        </nav>
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
