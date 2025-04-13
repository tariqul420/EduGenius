"use client";

import { PagePagination } from "@/components/shared/PagePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ShadCN table components
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";
import CertificatePDF from "./CertificatePDF";

export default function CertificateTable({
  certificates = [],
  hasNextPage = false,
  total = 0,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "course.title",
        header: "Course Name",
        cell: ({ row }) => (
          <div className="max-w-xs truncate text-gray-700 dark:text-gray-300">
            {row.original.course?.title || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Issue Date",
        cell: ({ row }) => {
          const date = row.original.createdAt
            ? format(new Date(row.original.createdAt), "MMMM dd, yyyy")
            : "N/A";
          return (
            <div className="text-center text-gray-700 dark:text-gray-300">
              {date}
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const formattedFileName =
            (row.original.course?.title?.toLowerCase().replaceAll(" ", "-") ||
              "certificate") + ".pdf";

          return (
            <div className="flex justify-end">
              <PDFDownloadLink
                document={<CertificatePDF certificateData={row.original} />}
                fileName={formattedFileName}
                className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {({ loading }) => (loading ? "Generating..." : "Download")}
              </PDFDownloadLink>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: certificates,
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
                      header.column.columnDef.accessorKey === "createdAt" &&
                      "text-center"
                    } ${
                      header.column.columnDef.accessorKey === "action" &&
                      "text-right"
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {certificates.length > 0 ? (
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
