import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Image from "next/image";
import BlogAction from "./BlogAction";

export default function BlogTable({ blog }) {
  if (!Array.isArray(blog) || blog.length === 0) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">
        No blogs available
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              No
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Thumbnail
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Title
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Category
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Created At
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Updated At
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              See Blog
            </TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-gray-100">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blog.map((item, index) => {
            const createDate = format(
              new Date(item?.createdAt),
              "MMMM dd, yyyy",
            );
            const updateDate = format(
              new Date(item?.updatedAt),
              "MMMM dd, yyyy",
            );
            return (
              <TableRow
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {index + 1}.
                </TableCell>
                <TableCell>
                  <div className="relative h-10 w-16">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="rounded object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate text-gray-700 dark:text-gray-300">
                  {item?.title.slice(0, 50)} {item?.title.length > 50 && "..."}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {item.category?.name || "N/A"}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {createDate}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {updateDate}
                </TableCell>
                <TableCell className="text-dark-btn max-w-xs truncate dark:text-gray-300">
                  <a target="_blank" href={`/blogs/${item?.slug}`}>
                    See Blog
                  </a>
                </TableCell>
                <BlogAction blogId={item?._id} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
