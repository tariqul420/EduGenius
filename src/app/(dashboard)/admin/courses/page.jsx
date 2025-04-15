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

// Columns Definition
const columns = [
  {
    header: "SL",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "enrolledStudents",
    header: "Enrolled Students",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("enrolledStudents")}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={`px-1.5 ${
        row.original.status === "Approved"
          ? "text-green-600 border-green-600"
          : "text-red-600 border-red-600"
      }`}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("published")}
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
              <DropdownMenuItem>Edit course</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function CoursesAdminTable({
  courses = data,
  total = data.length,
  hasNextPage = false,
}) {
  const table = useReactTable({
    data: courses,
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
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {courses?.length > 0 && (
        <PagePagination total={total} limit={10} hasNextPage={hasNextPage} />
      )}
    </div>
  );
}