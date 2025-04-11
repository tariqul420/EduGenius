import { PagePagination } from "@/components/shared/PagePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Monitor, MonitorPlay } from "lucide-react";
import Image from "next/image";
import BlogAction from "./BlogAction";

export default function BlogTable({
  blog,
  userId,
  categories,
  pathname,
  hasNextPage,
  total = 0,
}) {
  return (
    <section>
      <div className="dark:bg-dark-bg rounded-lg bg-white shadow">
        <Table>
          <TableHeader className={"rounded-lg"}>
            <TableRow className="dark:bg-dark-bg rounded-t-lg border-b bg-gray-100">
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Thumbnail</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="font-semibold">Updated At</TableHead>
              <TableHead className="font-semibold">Live Now</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blog.length > 0 ? (
              blog.map((item, index) => {
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
                    className="dark:hover:bg-dark-input border-b hover:bg-gray-50"
                  >
                    <TableCell className="dark:text-medium-bg text-gray-700">
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
                    <TableCell className="dark:text-medium-bg max-w-xs truncate text-gray-700">
                      {item?.title.slice(0, 50)}{" "}
                      {item?.title.length > 50 && "..."}
                    </TableCell>
                    <TableCell className="dark:text-medium-bg text-gray-700">
                      {item.category?.name || "N/A"}
                    </TableCell>
                    <TableCell className="dark:text-medium-bg text-gray-700">
                      {createDate}
                    </TableCell>
                    <TableCell className="dark:text-medium-bg text-gray-700">
                      {updateDate}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-700 dark:text-gray-300">
                      <a
                        target="_blank"
                        href={`/blogs/${item?.slug}`}
                        className="group relative inline-block"
                      >
                        <Monitor
                          size={20}
                          className="transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                        />
                        <MonitorPlay
                          size={20}
                          className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                        />
                      </a>
                    </TableCell>
                    <BlogAction
                      blogId={item._id}
                      userId={userId}
                      categories={categories}
                      pathname={pathname}
                      blog={item}
                    />
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* {hasNextPage && <LoadMore />} */}
      {/* Pagination */}
      {total > 0 && (
        <PagePagination total={total} limit={6} hasNextPage={hasNextPage} />
      )}
    </section>
  );
}
