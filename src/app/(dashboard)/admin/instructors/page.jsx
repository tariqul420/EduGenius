"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { PagePagination } from "@/components/shared/PagePagination";

// Sample data
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

// Updated columns
const columns = [
  {
    id: "serial",
    header: "SL",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.getValue("name")}
      </h1>
    ),
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.getValue("title")}
      </h1>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("salary")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={`px-1.5 ${
        row.original.status === "Active"
          ? "text-green-600 border-green-600"
          : "text-red-600 border-red-600"
      }`}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact Number",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("contact")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex justify-end">
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
        </div>
      );
    },
  },
];

export default function InstructorListTable({
  instructors = data,
  total = data.length,
  hasNextPage = false,
}) {
  const table = useReactTable({
    data: instructors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-semibold text-gray-900 dark:text-gray-200 ${
                      header.id === "actions" && "text-right"
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
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
                  className="dark:bg-dark-bg border-b bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No instructors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {instructors?.length > 0 && (
        <PagePagination total={total} limit={10} hasNextPage={hasNextPage} />
      )}
    </div>
  );
}