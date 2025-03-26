import { AppSidebar } from "@/components/dashboard/instructor/AppSidebar";
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
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
