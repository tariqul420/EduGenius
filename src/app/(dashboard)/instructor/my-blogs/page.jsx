import BlogForm from "@/components/dashboard/instructor/BlogForm";
import BlogTable from "@/components/dashboard/instructor/BlogTable";
import { getBlogsByUser } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { auth } from "@clerk/nextjs/server";

export default async function MyBlogs({ searchParams }) {
  const { page } = await searchParams;
  const { sessionClaims } = await auth();
  const categories = await getCategory();
  const {
    blogs = [],
    total = 0,
    hasNextPage = false,
  } = await getBlogsByUser({
    userId: sessionClaims?.userId,
    page: Number(page) || 1,
    limit: 6,
  });

  const pathname = "/dashboard/my-blogs";

  return (
    <div className="container mx-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
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
            Showing {blogs?.length} Of {total} Results
          </p>
        </div>
        <BlogTable
          blog={blogs}
          userId={sessionClaims?.userId}
          categories={categories}
          pathname={pathname}
          hasNextPage={hasNextPage}
          total={total}
        />
      </section>
    </div>
  );
}
