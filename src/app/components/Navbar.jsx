"use client";

import Link from "next/link";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaBook } from 'react-icons/fa';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { LuX } from "react-icons/lu";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-[#264D3F] to-dark-green text-white p-4">
            <div className="w-11/12 mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold flex items-center">
                    <FaBook className="mr-2" />
                    EduGenius
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <HiMiniBars3BottomRight />
                </button>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    <ul className="flex space-x-6 items-center">
                        <li className="relative group">
                            <aside
                                href="/courses/category/development"
                                className="hover:text-gray-300 flex items-center border-2 border-green px-4 py-2 rounded transition duration-300"
                            >
                                Course
                                <IoIosArrowDown className="ml-2" />
                            </aside>

                            {/* Dropdown Menu */}
                            <div className="absolute hidden group-hover:block bg-white text-gray-800 mt-2 rounded-lg shadow-lg w-auto">
                                <h2 className="px-4 py-2 font-semibold border-b">Choose by Category</h2>
                                <div className="flex">
                                    <div className="w-1/2">
                                        <Link
                                            href="/courses/category/web-development"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Web Development
                                        </Link>
                                        <Link
                                            href="/courses/category/business"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Business
                                        </Link>
                                        <Link
                                            href="/courses/category/flutter"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Flutter
                                        </Link>
                                    </div>
                                    {/* Column 2 */}
                                    <div className="w-1/2">
                                        <Link
                                            href="/courses/category/data-science"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Data Science
                                        </Link>
                                        <Link
                                            href="/courses/category/mobile-development"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Mobile Development
                                        </Link>
                                        <Link
                                            href="/courses/category/design"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Design
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link href="/" className="hover:text-gray-300 flex items-center">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/courses" className="hover:text-gray-300 flex items-center">
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link href="/instructors" className="hover:text-gray-300 flex items-center">
                                Instructors
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Login Button */}
                <div className="hidden lg:block">
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-lg bg-green hover:bg-white hover:text-gray-800 transition duration-300 flex items-center"
                    >
                        <CiUser className="mr-2" />
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0  bg-opacity-50 z-50">
                    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-r from-[#264D3F] to-dark-green text-white p-4 shadow-lg">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <LuX />
                        </button>

                        {/* Mobile Menu Links */}
                        <ul className="flex flex-col space-y-4 mt-10">
                            <li>
                                <Link href="/" className="hover:text-gray-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-gray-300">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/instructors" className="hover:text-gray-300">
                                    Instructors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg bg-green hover:bg-white hover:text-gray-800 transition duration-300 flex items-center"
                                >
                                    <CiUser className="mr-2" />
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;