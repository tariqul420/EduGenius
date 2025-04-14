"use client";

import { PagePagination } from "@/components/shared/PagePagination";
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
import { useMemo } from "react";

export default function AssignmentTable({
  assignment = [],
  hasNextPage = false,
  total = 0,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
      },
      {
        accessorKey: "dateLine",
        header: "Date Line",
      },
      {
        accessorKey: "mark",
        header: "Mark",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button variant="default">Enroll</Button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: assignment,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <div className="dark:bg-dark-bg rounded-lg bg-white shadow">
        <Table aria-label="Certificates table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-semibold text-gray-900 dark:text-gray-200 ${
                      header.column.columnDef.accessorKey === "action" &&
                      "text-right"
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
            {assignment?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="dark:bg-dark-bg rounded-t-lg border-b bg-gray-100"
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
                  className="py-10 text-center"
                >
                  No certificates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <PagePagination total={total} limit={6} hasNextPage={hasNextPage} />
      )}
    </section>
  );
}
