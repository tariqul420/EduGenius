import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Monitor } from "lucide-react";

// BlogTableSkeleton Component
function BlogTableSkeleton({ total = 6 }) {
  return (
    <section>
      <div className="dark:bg-dark-bg rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="dark:bg-dark-hover border-b bg-gray-100 dark:border-gray-700">
              <TableHead>
                <Skeleton className="h-5 w-12" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(6)].map((_, index) => (
              <TableRow
                key={index}
                className="dark:hover:bg-dark-input border-b hover:bg-gray-50"
              >
                <TableCell>
                  <Skeleton className="h-5 w-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Monitor size={20} className="text-gray-400" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Skeleton */}
      {total > 0 && (
        <div className="mt-4 flex justify-end">
          <Skeleton className="h-10 w-64" />
        </div>
      )}
    </section>
  );
}

// MyBlogsSkeleton Component
export default function MyBlogsSkeleton() {
  return (
    <div className="container mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      <section>
        {/* BlogForm Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </section>

      <section className="mt-4">
        <BlogTableSkeleton />
      </section>
    </div>
  );
}
