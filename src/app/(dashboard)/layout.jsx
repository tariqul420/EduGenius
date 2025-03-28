import { AppSidebar } from "@/components/dashboard/instructor/AppSidebar";
import Notification from "@/components/shared/Notification";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { admins, instructors, students } from "@/constant";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "Instructors | Meet our instructors",
  description: "Meet our instructors",
};

export default async function Layout({ children }) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role;

  return (
    <SidebarProvider>
      {role === "instructor" && <AppSidebar menu={instructors} />}
      {role === "student" && <AppSidebar menu={students} />}
      {role === "admin" && <AppSidebar menu={admins} />}
      <main>
        <nav className="dark:from-dark-bg dark:to-dark-bg sticky top-0 z-[20] flex w-full items-center justify-between gap-4 bg-gradient-to-r from-white to-white p-4 text-black shadow-sm dark:text-white">
          <SidebarTrigger className="cursor-pointer" />
          <Notification />
        </nav>

        {children}
      </main>
    </SidebarProvider>
  );
}
