"use client";

import { PagePagination } from "@/components/shared/PagePagination";
import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import { Monitor, MonitorPlay } from "lucide-react";
import Image from "next/image";
import BlogAction from "./BlogAction";

export default function BlogTable({
  blog = [],
  userId,
  categories,
  pathname,
  hasNextPage,
  total = 0,
}) {
  const columns = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <div className="relative h-10 w-16">
          <Image
            src={row.original.thumbnail || "/placeholder.jpg"}
            alt={row.original.title || "Thumbnail"}
            fill
            sizes="64px"
            className="rounded object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-sm font-medium">
          {row.original.title || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "category.name",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.category?.name || "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.createdAt
            ? format(new Date(row.original.createdAt), "MMMM dd, yyyy")
            : "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.updatedAt
            ? format(new Date(row.original.updatedAt), "MMMM dd, yyyy")
            : "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "liveNow",
      header: "Live Now",
      cell: ({ row }) => (
        <div className="flex items-center">
          <a
            target="_blank"
            href={row.original.slug ? `/blogs/${row.original.slug}` : "#"}
            className="group relative inline-flex items-center"
            rel="noopener noreferrer"
          >
            <Monitor
              size={20}
              className="text-gray-700 transition-opacity duration-300 ease-in-out group-hover:opacity-0 dark:text-gray-200"
            />
            <MonitorPlay
              size={20}
              className="absolute text-gray-700 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:text-gray-200"
            />
          </a>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <BlogAction
          blogId={row.original._id}
          userId={userId}
          categories={categories}
          pathname={pathname}
          blog={row.original}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: blog,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <div className="overflow-hidden rounded-lg border">
        <Table aria-label="Blogs table">
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
                  className="h-24 text-center text-gray-500"
                >
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {total > 0 && (
        <PagePagination total={total} limit={10} hasNextPage={hasNextPage} />
      )}
    </section>
  );
}
