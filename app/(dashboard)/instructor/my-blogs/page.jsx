import { auth } from "@clerk/nextjs/server";

import DataTable from "@/components/dashboard/data-table";
import BlogForm from "@/components/dashboard/instructor/blog-form";
import { blogColumns } from "@/components/dashboard/table-columns";
import { getBlogsByInstructor } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";

export default async function MyBlogs({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { sessionClaims } = await auth();
  const categories = await getCategory();

  const { blogs, pagination } = await getBlogsByInstructor({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });

  const pathname = "/instructor/my-blogs";

  return (
    <div className="@container/main mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      <section>
        <BlogForm
          userId={sessionClaims?.userId}
          categories={categories}
          pathname={pathname}
          isUpdate={false}
        />
      </section>
      <section className="mt-4">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={blogs || []}
          columns={blogColumns || []}
          uniqueIdProperty="_id"
        />
      </section>
    </div>
  );
}
