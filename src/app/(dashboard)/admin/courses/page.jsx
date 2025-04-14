"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    category: "Programming",
    enrolledStudents: 120,
    price: 49.99,
    status: "Approved",
    published: "Published",
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    category: "Web Design",
    enrolledStudents: 80,
    price: 39.99,
    status: "Draft",
    published: "Unpublished",
  },
  {
    id: 3,
    title: "React for Beginners",
    category: "Frontend Development",
    enrolledStudents: 150,
    price: 59.99,
    status: "Approved",
    published: "Published",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    category: "Computer Science",
    enrolledStudents: 200,
    price: 69.99,
    status: "Draft",
    published: "Unpublished",
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    category: "Design",
    enrolledStudents: 95,
    price: 44.99,
    status: "Approved",
    published: "Published",
  },
  {
    id: 6,
    title: "Python for Data Science",
    category: "Data Science",
    enrolledStudents: 300,
    price: 79.99,
    status: "Draft",
    published: "Unpublished",
  },
];

const columns = [
  {
    header: "SL",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>; // SL number based on row index
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "enrolledStudents",
    header: "Enrolled Students",
    cell: ({ row }) => <div>{row.getValue("enrolledStudents")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`${
            status === "Approved" ? "text-green-600" : "text-yellow-600"
          } capitalize`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      const published = row.getValue("published");
      return (
        <div
          className={`${
            published === "Published" ? "text-blue-600" : "text-red-600"
          } capitalize`}
        >
          {published}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.id)}
            >
              Copy course ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit course</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function CoursesAdminTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border p-4">
      <h1 className="text-center text-2xl md:text-5xl m-2">Course Selling History</h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
