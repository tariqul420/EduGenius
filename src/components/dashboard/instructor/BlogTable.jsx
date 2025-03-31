import LoadMore from "@/components/shared/LoadMore";
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

export default function BlogTable({
  blog,
  userId,
  categories,
  pathname,
  hasNextPage,
}) {
  if (!Array.isArray(blog) || blog.length === 0) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">
        No blogs available
      </div>
    );
  }

  return (
    <section>
      <div className="dark:bg-dark-bg rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="dark:bg-dark-hover border-b bg-gray-100 dark:border-gray-700">
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Thumbnail</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="font-semibold">Updated At</TableHead>
              <TableHead className="font-semibold">See Blog</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
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
                  className="dark:hover:bg-dark-hover border-b hover:bg-gray-50"
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
                  <TableCell className="text-dark-btn max-w-xs truncate dark:text-gray-300">
                    <a target="_blank" href={`/blogs/${item?.slug}`}>
                      See Blog
                    </a>
                  </TableCell>
                  <BlogAction
                    blogId={item._id}
                    userId={userId}
                    categories={categories}
                    pathname={pathname}
                    blog={item} // Pass the full blog object
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {hasNextPage && <LoadMore />}
    </section>
  );
}
