"use client";

import { PagePagination } from "@/components/shared/PagePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

// Sample data
const categoryData = [
  {
    id: 7,
    title: "Mastering TypeScript",
    category: "Programming",
    enrolledStudents: 110,
    price: 54.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 30,
  },
  {
    id: 8,
    title: "Intro to Graphic Design",
    category: "Design",
    enrolledStudents: 70,
    price: 34.99,
    status: "Draft",
    published: "Unpublished",
    seatAvailable: 50,
  },
  {
    id: 9,
    title: "Backend with Node.js",
    category: "Backend Development",
    enrolledStudents: 140,
    price: 59.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 25,
  },
  {
    id: 10,
    title: "Photography Essentials",
    category: "Photography",
    enrolledStudents: 95,
    price: 29.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 35,
  },
  {
    id: 11,
    title: "Machine Learning Basics",
    category: "Artificial Intelligence",
    enrolledStudents: 210,
    price: 89.99,
    status: "Draft",
    published: "Unpublished",
    seatAvailable: 20,
  },
  {
    id: 12,
    title: "Digital Marketing 101",
    category: "Marketing",
    enrolledStudents: 160,
    price: 45.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 40,
  },
  {
    id: 13,
    title: "iOS App Development",
    category: "Mobile Development",
    enrolledStudents: 100,
    price: 74.99,
    status: "Draft",
    published: "Unpublished",
    seatAvailable: 15,
  },
  {
    id: 14,
    title: "Cybersecurity Fundamentals",
    category: "Security",
    enrolledStudents: 180,
    price: 64.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 20,
  },
  {
    id: 15,
    title: "WordPress for Beginners",
    category: "CMS Development",
    enrolledStudents: 85,
    price: 39.99,
    status: "Approved",
    published: "Published",
    seatAvailable: 50,
  },
  {
    id: 16,
    title: "Cloud Computing with AWS",
    category: "Cloud Computing",
    enrolledStudents: 230,
    price: 99.99,
    status: "Draft",
    published: "Unpublished",
    seatAvailable: 18,
  },
];

// Columns Definition
const columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row, table }) => (
      <div className="text-center">
        {table.getSortedRowModel()?.rows.indexOf(row) + 1}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original.title}
      </h1>
    ),
  },
  {
    accessorKey: "enrolledStudents",
    header: "Enrolled",
    cell: ({ row }) => (
      <div className="text-center">{row.original.enrolledStudents}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => (
      <div className="text-center">${row.original.price.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "seatAvailable",
    header: "Seats Left",
    cell: ({ row }) => (
      <div className="text-center">{row.original.seatAvailable}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`px-1.5 ${
          row.original.status === "Approved"
            ? "text-green-600 border-green-600"
            : "text-yellow-600 border-yellow-600"
        }`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`px-1.5 ${
          row.original.published === "Published"
            ? "text-blue-600 border-blue-600"
            : "text-red-500 border-red-500"
        }`}
      >
        {row.original.published}
      </Badge>
    ),
  },
 
];

const Category = () => {
  const table = useReactTable({
    data: categoryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Mock pagination data (adjust based on your backend or requirements)
  const total = categoryData.length;
  const hasNextPage = false; // Set to true if you have more pages

  return (
    <div className="p-6">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4">
        Course Categories
      </h2>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-semibold text-gray-900 dark:text-gray-200 ${
                      header.id === "action" && "text-right"
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="dark:bg-dark-bg border-b bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {categoryData.length > 0 && (
        <PagePagination total={total} limit={10} hasNextPage={hasNextPage} />
      )}
    </div>
  );
};

export default Category;