"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useMemo, useRef, useState } from "react";
import CertificateLicense from "./CertificateLicense";

export default function CertificateTable({ certificates = [] }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const certificateRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: "course.title",
        header: "Course Name",
        cell: ({ row }) => (
          <div className="dark:text-medium-bg max-w-xs truncate text-gray-700">
            {row.original.course.title}
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
        cell: ({ row }) => (
          <div className="flex justify-end">
            <button
              onClick={() => handleDownload(row.original)}
              className="bg-main cursor-pointer rounded px-3 py-1 text-sm font-medium text-white"
            >
              Download
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleDownload = async (certificate) => {
    setSelectedCertificate(certificate);
    const element = certificateRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProperties.height * width) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, width, height);

      pdf.save("certificate.pdf");
    } catch (e) {
      console.error("Error downloading certificate:", e);
    }
  };

  const table = useReactTable({
    data: certificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="overflow-x-auto">
      <div className="dark:bg-dark-bg mx-4 rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="dark:bg-dark-hover border-b bg-gray-100 dark:border-gray-700"
              >
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

      {/* Hidden Certificate Template */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        {selectedCertificate && (
          <CertificateLicense
            certificateRef={certificateRef}
            certificateData={selectedCertificate}
          />
        )}
      </div>
    </section>
  );
}
