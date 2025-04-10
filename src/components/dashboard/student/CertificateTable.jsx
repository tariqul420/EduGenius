"use client";

import { PagePagination } from "@/components/shared/PagePagination";
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
  hasNextPage,
  total,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "course.title",
        header: "Course Name",
        cell: ({ row }) => (
          <div className="dark:text-medium-bg max-w-xs truncate text-gray-700">
            {row.original.course?.title}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Issue Date",
        cell: ({ row }) => {
          const formattedDate = format(
            new Date(row.original.createdAt),
            "MMMM dd, yyyy",
          );
          return (
            <div className="dark:text-medium-bg text-gray-700">
              {formattedDate}
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const formattedFileName =
            row.original.course?.title.toLowerCase().replaceAll(" ", "-") +
            ".pdf";

          return (
            <div className="flex justify-end">
              <PDFDownloadLink
                document={<CertificatePDF certificateData={row.original} />}
                fileName={formattedFileName}
                className="bg-main hover:bg-main dark:bg-main dark:hover:bg-main rounded px-3 py-1 text-sm font-medium text-white"
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
    <section className="overflow-x-auto">
      <div className="dark:bg-dark-bg rounded-lg border bg-white shadow">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 font-semibold ${
                      header.column.columnDef.accessorKey === "issueDate"
                        ? "text-center"
                        : "text-left"
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="dark:hover:bg-dark-input border-b hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="dark:text-medium-bg px-6 py-4 text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <PagePagination total={total} limit={6} hasNextPage={hasNextPage} />
      )}
    </section>
  );
}
