"use client";

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
import { GraduationCap, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function Navbar() {
    const pathname = usePathname();

    // Function to check if a link is active
    const isActive = (path) => pathname === path;

    // Navigation links data
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/instructors", label: "Instructors" },
    ];

    return (
        <nav className="bg-gradient-to-r sticky top-0 z-[20] from-[#264D3F] to-dark-green text-white p-4">
            <div className="container lg:max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-3xl">
                    <GraduationCap className="text-green" />
                    <h2 className="font-bold text-xl">EduGenius</h2>
                </Link>

                {/* Right Side */}
                <div className="flex items-center space-x-6">
                    <ul className="hidden lg:flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`hover:text-gray-300 transition-colors ${isActive(link.href) ? "text-green font-bold" : ""
                                        }`}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Login Button for larger screens */}
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="hidden lg:flex px-4 py-2 rounded-lg bg-green hover:bg-white hover:text-gray-800 transition duration-300 items-center">
                            <User className="mr-2" />
                            Login
                        </Link>
                    </SignedOut>

                    <SignedIn>
                        <Suspense
                            fallback={<div className="h-10 w-10 rounded-full">loading</div>}>
                            <UserButton afterSignOutUrl="/" />
                        </Suspense>
                    </SignedIn>

                    {/* Mobile Menu (Sheet) */}
                    <Sheet>
                        <SheetTrigger
                            className="cursor-pointer lg:hidden"
                            aria-label="Open menu">
                            <Menu size={24} />
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-[#264D3F] text-white px-4 border-none">
                            <SheetHeader>
                                <SheetTitle className="text-2xl font-bold text-green">
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
                                            className={`hover:text-gray-300 transition-colors ${isActive(link.href) ? "text-green font-bold" : ""
                                                }`}>
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>

                            {/* Mobile Login Button */}

                            <Link
                                href="/sign-in"
                                className="mt-6 py-2 rounded-lg bg-green hover:bg-white hover:text-gray-800 transition duration-300 flex items-center px-4">
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
