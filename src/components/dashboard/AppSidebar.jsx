"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import {
  Award,
  BookCopy,
  BookOpenCheck,
  BookOpenText,
  BookText,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Medal,
  Tag,
  UserPlus,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import AdditionalInfoForm from "./instructor/AdditionalInfoForm";
import BecomeInstructorForm from "./student/BecomeInstructorForm";

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

// Map of icon names to their corresponding components
const iconMap = {
  LayoutDashboard,
  BookText,
  UsersRound,
  Medal,
  BookOpenCheck,
  BookOpenText,
  ClipboardCheck,
  Award,
  ListTodo,
  BookCopy,
  Tag,
  GraduationCap,
  UserRoundPlus,
  CreditCard,
};

export function AppSidebar({ role, menu = [] }) {
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
              appearance={{
                elements: {
                  userButtonBox: "flex !flex-row-reverse items-center gap-2",
                },
              }}
            >
              {/* Only show Additional Info section for instructors */}
              {role === "instructor" && (
                <UserButton.UserProfilePage
                  url="/user-additional-info"
                  label="Additional info"
                  labelIcon={<IconInfoCircleFilled size={16} />}
                  alongside={true}
                >
                  <AdditionalInfoForm />
                </UserButton.UserProfilePage>
              )}

              {/* Only show Become Instructor section for students */}
              {role === "student" && (
                <UserButton.UserProfilePage
                  url="/request-instructor-role"
                  label="Become Instructor"
                  labelIcon={<UserPlus size={16} />}
                  alongside={true}
                >
                  <BecomeInstructorForm />
                </UserButton.UserProfilePage>
              )}
            </UserButton>
          </Suspense>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
