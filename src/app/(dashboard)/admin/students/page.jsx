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

const studentData = [
  {
    id: 1,
    name: "Ayesha Akter",
    email: "ayesha@email.com",
    course: "Mastering TypeScript",
    enrolledDate: "2025-03-20",
    status: "Active",
  },
  {
    id: 2,
    name: "Hasib Rahman",
    email: "hasib@email.com",
    course: "Backend with Node.js",
    enrolledDate: "2025-02-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat@email.com",
    course: "Intro to Graphic Design",
    enrolledDate: "2025-01-10",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    email: "tanvir@email.com",
    course: "Cloud Computing with AWS",
    enrolledDate: "2025-03-05",
    status: "Active",
  },
  {
    id: 5,
    name: "Rina Khatun",
    email: "rina@email.com",
    course: "Machine Learning Basics",
    enrolledDate: "2025-02-25",
    status: "Inactive",
  },
];

// Columns Definition
const columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row, table }) => (
      <div className="text-center">
        {table.getSortedRowModel()?.rows.indexOf(row) + 1 || row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original.name}
      </h1>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-center">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.course}
      </Badge>
    ),
  },
  {
    accessorKey: "enrolledDate",
    header: "Enrolled Date",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.enrolledDate}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`px-1.5 ${
          row.original.status === "Active"
            ? "text-green-600 border-green-600"
            : "text-red-600 border-red-600"
        }`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  
];

const StudentList = () => {
  const table = useReactTable({
    data: studentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Mock pagination data (adjust based on your backend or requirements)
  const total = studentData.length;
  const hasNextPage = false; // Set to true if you have more pages

  return (
    <div className="p-4">
      <h2 className="text-2xl lg:text-5xl font-bold mb-4 text-center">
        Student List
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
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {studentData.length > 0 && (
        <PagePagination total={total} limit={10} hasNextPage={hasNextPage} />
      )}
    </div>
  );
};

export default StudentList;