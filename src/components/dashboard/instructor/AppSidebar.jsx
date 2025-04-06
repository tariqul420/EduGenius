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
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function AppSidebar({ menu = [] }) {
  return (
    <>
      <Sidebar>
      <SidebarHeader className="bg-light-bg dark:bg-dark-bg">
        <Link href="/" className="flex items-center gap-2 text-3xl">
          <GraduationCap size={26} className="text-main" />
          <h2 className="text-2xl font-semibold">EduGenius</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-light-bg dark:bg-dark-bg">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-medium-bg dark:hover:bg-dark-hover" asChild>
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
    </>
  );
}
