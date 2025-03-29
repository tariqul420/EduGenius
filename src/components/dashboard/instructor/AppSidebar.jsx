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
import { SignedIn, UserButton } from "@clerk/nextjs";
import { BookOpen, GraduationCap, Home, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function AppSidebar({ menu = [] }) {
  const defaultMenu = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Blogs",
      url: "/blogs",
      icon: BookOpen,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Instructors",
      url: "/instructors",
      icon: Users,
    },
  ];

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
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <div className="my-4 border"></div>

              {defaultMenu.map((item) => (
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
        <SignedIn>
          <Suspense
            fallback={<div className="h-10 w-10 rounded-full">loading</div>}
          >
            <UserButton
              showName={true}
              appearance={{
                elements: {
                  userButtonBox: "flex !flex-row-reverse items-center gap-2", // Flexbox for horizontal alignment
                },
              }}
            />
          </Suspense>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
