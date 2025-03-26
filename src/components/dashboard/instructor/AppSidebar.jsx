import {
  BookOpenCheck,
  BookText,
  GraduationCap,
  LayoutDashboard,
  Medal,
  UsersRound,
} from "lucide-react";

import ModeToggle from "@/components/shared/ThemeBtn";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/instructor",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: BookText,
  },
  {
    title: "Students",
    url: "/instructor/students",
    icon: UsersRound,
  },
  {
    title: "Certificates",
    url: "/instructor/certificates",
    icon: Medal,
  },
  {
    title: "Quiz & Assignment",
    url: "/instructor/quiz-assignment",
    icon: BookOpenCheck,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 text-3xl">
          <GraduationCap size={26} className="text-main" />
          <h2 className="text-2xl font-semibold">EduGenius</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
