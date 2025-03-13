"use client";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiGraduationCapFill } from "react-icons/ri";

function Navbar() {
    const pathname = usePathname();

    const isActive = (path) => {
        return pathname === path;
    };

    return (
        <nav className="bg-gradient-to-r from-[#264D3F] to-dark-green text-white p-4">
            <div className="container lg:max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-3xl">
                    <RiGraduationCapFill className="text-green" />
                    <h2 className="font-bold text-xl">EduGenius</h2>
                </Link>

                {/* Right Side */}
                <div className="flex items-center space-x-6">
                    {/* Navigation Links for larger screens */}
                    <ul className="hidden lg:flex space-x-6">
                        <li>
                            <Link
                                href="/"
                                className={`hover:text-gray-300 ${isActive("/") ? "text-green font-bold" : ""
                                    }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/courses"
                                className={`hover:text-gray-300 ${isActive("/courses") ? "text-green font-bold" : ""
                                    }`}
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/instructors"
                                className={`hover:text-gray-300 ${isActive("/instructors") ? "text-green font-bold" : ""
                                    }`}
                            >
                                Instructors
                            </Link>
                        </li>
                    </ul>

                    {/* Login Button */}
                    <Link
                        href="/login"
                        className="hidden lg:flex px-4 py-2 rounded-lg bg-green hover:bg-white hover:text-gray-800 transition duration-300 items-center"
                    >
                        <CiUser className="mr-2" />
                        Login
                    </Link>

                    {/* Sheet for smaller screens */}
                    <Sheet>
                        <SheetTrigger className="cursor-pointer" asChild>
                            <HiMenuAlt3 size={24} />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    Hello World
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    Hello World
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    Hello World
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;