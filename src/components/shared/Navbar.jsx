"use client";

import ThemeBtn from "@/components/shared/ThemeBtn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GraduationCap, LogIn, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  // Function to check if a link is active
  const isActive = (path) => pathname === path;

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/courses", label: "Courses" },
    { href: "/instructors", label: "Instructors" },
  ];

  return (
    <nav
      className={`from-main/80 to-dark-main sticky top-0 z-[20] bg-gradient-to-b p-4 text-white dark:from-black dark:to-black ${showNavbar ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between lg:max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-3xl">
          <GraduationCap className="text-white" />
          <h2 className="text-xl font-bold">EduGenius</h2>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <ul className="hidden space-x-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative px-1`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-full rounded-full bg-white"></span>
                  )}
                  {!isActive(link.href) && (
                    <span className="absolute w-0 origin-left group-hover:w-full duration-300 -bottom-0.5 left-0 h-[2.5px] rounded-full bg-white"></span>
                  )}

                </Link>
              </li>
            ))}
          </ul>

          <ThemeBtn />

          {/* Login Button for larger screens */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-dark-main hover:bg-light-bg hidden items-center rounded bg-white px-3 py-[4px] transition duration-200 lg:flex dark:text-black"
            >
              <LogIn className="mr-1.5" size={18} />
              Login
            </Link>
          </SignedOut>

          <SignedIn>
            <Suspense
              fallback={<div className="h-10 w-10 rounded-full">loading</div>}
            >
              <UserButton afterSignOutUrl="/" />
            </Suspense>
          </SignedIn>

          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger
              className="cursor-pointer lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-none bg-[#264D3F] px-4 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-main text-2xl font-bold">
                  EduGenius
                </SheetTitle>
                <SheetDescription className="text-gray-300">
                  Navigate through the site
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`transition-colors hover:text-gray-300 ${
                        isActive(link.href) ? "text-main font-bold" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Mobile Login Button */}

              <Link
                href="/sign-in"
                className="bg-main mt-6 flex items-center rounded-lg px-4 py-2 transition duration-300 hover:bg-white hover:text-gray-800"
              >
                <User className="mr-2" />
                Login
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
