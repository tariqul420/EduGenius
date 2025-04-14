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
    name: "Munna Khan",
    title: "React Fundamentals",
    category: "Web Development",
    status: "Active",
    salary: "$1500",
    contact: "+880123456789",
  },
  {
    id: 2,
    name: "Ayesha Rahman",
    title: "Next.js Mastery",
    category: "Web Development",
    status: "Inactive",
    salary: "$1800",
    contact: "+880198765432",
  },
  {
    id: 3,
    name: "Salman Hossain",
    title: "Tailwind CSS Crash Course",
    category: "UI Design",
    status: "Active",
    salary: "$1000",
    contact: "+880156789432",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    title: "Node.js API Development",
    category: "Backend",
    status: "Active",
    salary: "$1700",
    contact: "+880134567890",
  },
  {
    id: 5,
    name: "Hasan Mahmud",
    title: "MongoDB for Beginners",
    category: "Database",
    status: "Inactive",
    salary: "$1200",
    contact: "+880178923456",
  },
  {
    id: 6,
    name: "Mehjabin Nishi",
    title: "Fullstack Project Bootcamp",
    category: "Full Stack",
    status: "Active",
    salary: "$2500",
    contact: "+880145678321",
  },
];

// Updated columns with serial number (SL) column
const columns = [
  {
    id: "serial",
    header: "SL",
    cell: ({ row }) => row.index + 1, // Dynamically display serial number
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("salary").replace("$", ""));
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
            status === "Active" ? "text-green-600" : "text-red-600"
          } font-semibold capitalize`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
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
            <DropdownMenuItem>Edit Information</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function InstructorListTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border p-4">
      <h1 className="text-center text-2xl md:text-5xl m-2">Instructor List</h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
