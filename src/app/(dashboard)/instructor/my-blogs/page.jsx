import BlogForm from "@/components/dashboard/instructor/BlogForm";
import BlogTable from "@/components/dashboard/instructor/BlogTable";
import { getBlogsByInstructor } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { auth } from "@clerk/nextjs/server";

export default async function MyBlogs({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { sessionClaims } = await auth();
  const categories = await getCategory();

  const { blogs, pagination } = await getBlogsByInstructor();

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
        <div className="flex items-center justify-between">
          <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            My Blogs
          </h1>
          <p className="dark:text-medium-bg text-sm font-medium text-gray-600">
            {/* Showing {blogs?.length} Of {total} Results */}
          </p>
        </div>
        <BlogTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={blogs || []}
        />
      </section>
    </div>
  );
}
