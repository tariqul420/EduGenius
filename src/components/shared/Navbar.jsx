"use client";

import ThemeBtn from "@/components/shared/ThemeBtn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  AlignJustify,
  GraduationCap,
  LogIn,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Navbar() {
  const { isSignedIn } = useUser();
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
    { href: "/blogs", label: "Blog" },
    { href: "/courses", label: "Courses" },
    { href: "/instructors", label: "Instructors" },
  ];

  return (
    <nav
      className={`from-white to-white shadow-sm dark:from-dark-bg dark:to-dark-bg sticky top-0 z-[20] bg-gradient-to-r p-4 text-black dark:text-white ${showNavbar ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between lg:max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-3xl">
          <GraduationCap size={26} className="text-main" />
          <h2 className="text-2xl font-semibold">EduGenius</h2>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <ul className="hidden space-x-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`group relative px-1`}>
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-full rounded-full bg-black dark:bg-white"></span>
                  )}
                  {!isActive(link.href) && (
                    <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-0 origin-left rounded-full bg-black dark:bg-white duration-300 group-hover:w-full"></span>
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
              className="text-dark-main border shadow hover:bg-light-bg hidden items-center rounded bg-white px-3 py-[5px] transition duration-200 lg:flex dark:text-black"
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

          {/* Mobile Menu (Sheet)========================= */}
          <Sheet>
            <SheetTrigger
              className="text-dark-main hover:bg-light-bg cursor-pointer rounded bg-white px-1 py-1 lg:hidden dark:text-black"
              aria-label="Open menu"
            >
              <AlignJustify />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-light-bg dark:bg-dark-bg border-none px-2 text-white"
            >
              {/* Sheet Close Icon */}
              <SheetClose asChild>
                <button className="bg-light-bg hover:bg-medium-bg text-dark-main absolute top-3 right-2 z-10 cursor-pointer rounded border p-1 transition dark:text-black">
                  <X className="h-5 w-5" />
                </button>
              </SheetClose>

              {/* Sheet Header */}
              <SheetHeader className="w-fit px-2">
                <SheetTitle className="text-main dark:text-light-bg text-2xl font-medium">
                  <Link href="/">EduGenius</Link>
                </SheetTitle>
              </SheetHeader>
              <hr />

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col space-y-4 px-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className={`group dark:text-light-bg relative px-1 text-black`}
                      >
                        {link.label}
                        {isActive(link.href) && (
                          <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-full rounded-full bg-black dark:bg-white"></span>
                        )}
                        {!isActive(link.href) && (
                          <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-0 origin-left rounded-full bg-black duration-300 group-hover:w-full dark:bg-white"></span>
                        )}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              {/* Mobile Login Button */}
              {!isSignedIn && (
                <SheetClose asChild>
                  <Link
                    href="/sign-in"
                    className="bg-main hover:bg-medium-bg mt-3 flex w-fit items-center rounded py-2 pr-6 pl-1.5 transition duration-200 hover:text-gray-800"
                  >
                    <LogIn className="mr-1.5" size={18} />
                    Login
                  </Link>
                </SheetClose>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
