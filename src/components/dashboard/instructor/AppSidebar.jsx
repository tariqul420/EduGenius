"use client";

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
import { IconInfoCircleFilled } from "@tabler/icons-react";
import {
  Award,
  BookOpenCheck,
  BookOpenText,
  BookText,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Medal,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import AdditionalInfoForm from "./AdditionalInfoForm";

// Map of icon names to their corresponding components
const iconMap = {
  LayoutDashboard: LayoutDashboard,
  BookText: BookText,
  UsersRound: UsersRound,
  Medal: Medal,
  BookOpenCheck: BookOpenCheck,
  BookOpenText: BookOpenText,
  ClipboardCheck: ClipboardCheck,
  Award: Award,
};

export function AppSidebar({ menu = [] }) {
  const pathname = usePathname();

  // Function to determine if a menu item is active
  const isActive = (url) => {
    if (!url) return false;
    // Exact match for dashboard routes
    if (["/instructor", "/student", "/admin"].includes(url)) {
      return pathname === url;
    }
    // Partial match for other routes
    return pathname.startsWith(url);
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-light-bg dark:bg-dark-bg">
        <Link href="/" className="flex items-center gap-2 text-3xl">
          <GraduationCap size={26} className="text-main" />
          <h2 className="text-2xl font-semibold">
            Edu<span className="text-main">Genius</span>
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-light-bg dark:bg-dark-bg">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const IconComponent = iconMap[item?.icon];
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`hover:bg-medium-bg dark:hover:bg-dark-hover ${
                        isActive(item?.url)
                          ? "bg-medium-bg dark:bg-dark-hover"
                          : ""
                      }`}
                      asChild
                    >
                      <Link href={item?.url || "#"}>
                        {IconComponent ? <IconComponent /> : null}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
              // userProfileMode="navigation"
              // userProfileUrl="/user-profile"
              appearance={{
                elements: {
                  userButtonBox: "flex !flex-row-reverse items-center gap-2",
                },
              }}
            >
              <UserButton.UserProfilePage
                url="/user-additional-info"
                label="Additional info"
                labelIcon={<IconInfoCircleFilled size={16} />}
                alongside={true}
              >
                <AdditionalInfoForm />
              </UserButton.UserProfilePage>
            </UserButton>
          </Suspense>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
