"use client";

import { EditCategoryModal } from "@/components/dashboard/admin/EditCategoryModal";
import {
  createDragColumn,
  createSelectionColumn,
} from "@/components/dashboard/data-table";
import DeleteBlogModal from "@/components/dashboard/instructor/DeleteBlogModal";
import CertificatePDF from "@/components/dashboard/student/CertificatePDF";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { Monitor, MonitorPlay, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export const categoryColumns = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original?.name}
      </h1>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.createdAt), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.updatedAt), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Actions</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(category._id)}
              >
                Copy category ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <EditCategoryModal category={category} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const blogColumns = [
  createDragColumn(),
  createSelectionColumn(),
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <div className="relative h-10 w-16">
        <Image
          src={row.original?.thumbnail}
          alt={row.original?.title}
          fill
          sizes="64px"
          className="rounded object-cover"
        />
      </div>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original?.title}
      </h1>
    ),
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.category?.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.createdAt), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.updatedAt), "PPP")}
        </Badge>
      </div>
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
    header: "Action",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Actions</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(blog._id)}
              >
                Copy Blog ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {/* <BlogAction /> */}
                <DeleteBlogModal blogId={blog._id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const instructorQuizColumns = [
  createDragColumn(),
  createSelectionColumn(),
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original.title}
      </h1>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "Category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.course.category.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Enrolled Student",
    header: "Enrolled Student",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.studentsCount}
        </Badge>
      </div>
    ),
  },
];

export const instructorAssignmentColumns = [
  createDragColumn(),
  createSelectionColumn(),
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original.title}
      </h1>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "Category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.course.category.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Enrolled Student",
    header: "Enrolled Student",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.studentsCount}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original.deadline), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Total Marks",
    header: "Total Marks",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.totalMarks}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Submissions Count",
    header: "Submissions Count",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.submissionsCount}
        </Badge>
      </div>
    ),
  },
];

export const instructorStudentColumns = [
  createDragColumn(),
  createSelectionColumn(),
  {
    accessorKey: "name",
    header: "	Name & Mail",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={row.original.profilePicture}
            alt={row.original.name}
          />
          <AvatarFallback>{row.original.name}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="max-w-xs truncate text-sm font-medium">
            {row.original.name}
          </h1>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.phone}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",

    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.address}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "Enrolled Courses",
    header: "Enrolled Course",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.enrolledCourses}
        </Badge>
      </div>
    ),
  },
];

export const studentCertificateColumns = [
  createDragColumn(),
  createSelectionColumn(),
  {
    accessorKey: "course.title",
    header: "Course",
    cell: ({ row }) => (
      <h1 className="max-w-xs truncate text-sm font-medium">
        {row.original?.course?.title}
      </h1>
    ),
    filterFn: "includesString",
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.createdAt), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {format(new Date(row.original?.updatedAt), "PPP")}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Actions</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(category?.certificateId)
                }
              >
                Copy certificate ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PDFDownloadLink
                  document={<CertificatePDF certificateData={row.original} />}
                  fileName={
                    (row.original.course?.title
                      ?.toLowerCase()
                      .replaceAll(" ", "-") || "certificate") + ".pdf"
                  }
                >
                  {({ loading }) => (loading ? "Generating..." : "Download")}
                </PDFDownloadLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
