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

import EduLogo from "../shared/edu-logo";

import AdditionalInfoForm from "./instructor/additional-info-form";
import BecomeInstructorForm from "./student/become-instructor-form";

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
  useSidebar,
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
  const { toggleSidebar } = useSidebar();
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
      <SidebarHeader className="dark:bg-dark-bg bg-white">
        <EduLogo />
      </SidebarHeader>
      <SidebarContent className="dark:bg-dark-bg bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const IconComponent = iconMap[item?.icon];

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`hover:bg-light-bg dark:hover:bg-dark-hover ${
                        isActive(item?.url)
                          ? "bg-light-bg dark:bg-dark-hover"
                          : ""
                      }`}
                      asChild
                    >
                      <Link
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            toggleSidebar();
                          }
                        }}
                        href={item?.url || "#"}
                        className=""
                      >
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
