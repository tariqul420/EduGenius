"use client";

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
import { formUrlQuery } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

// Columns Definition
const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original.title}
      </h1>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.startDate}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "dateLine",
    header: "Date Line",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.dateLine}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "mark",
    header: "Mark",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.mark}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="default">Enroll</Button>
      </div>
    ),
  },
];

// Main Component
export default function AssignmentTable({
  assignment = [],
  pageSize = 10,
  pageIndex = 1,
  total = 0,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pagination, setPagination] = React.useState({
    pageIndex: pageIndex - 1,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data: assignment,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),
  });

  return (
    <section className="flex w-full flex-col gap-6 px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <Table aria-label="Assignments table">
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
                  No assignments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {total > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {pageIndex} of {Math.ceil(total / pageSize)}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => {
                const newPageIndex = pageIndex - 1;
                const newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: "pageIndex",
                  value: newPageIndex.toString(),
                });
                table.previousPage();
                router.push(newUrl, { scroll: false });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => {
                const newPageIndex = pageIndex + 1;
                const newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: "pageIndex",
                  value: newPageIndex.toString(),
                });
                table.nextPage();
                router.push(newUrl, { scroll: false });
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
