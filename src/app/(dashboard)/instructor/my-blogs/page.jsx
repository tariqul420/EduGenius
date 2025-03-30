import BlogForm from "@/components/dashboard/instructor/BlogForm";
import BlogTable from "@/components/dashboard/instructor/BlogTable";
import { getBlogsByUser } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { auth } from "@clerk/nextjs/server";

export default async function MyBlogs() {
  const { sessionClaims } = await auth();
  const categories = await getCategory();
  const blogs = await getBlogsByUser({ userId: sessionClaims?.userId });

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
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          My Blogs
        </h1>
        <BlogTable
          blog={blogs?.blogs}
          userId={sessionClaims?.userId}
          categories={categories}
          pathname={pathname}
        />
      </section>
    </div>
  );
}
