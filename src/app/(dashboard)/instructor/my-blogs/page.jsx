import AddBlog from "@/components/dashboard/instructor/AddBlog";
import BlogTable from "@/components/dashboard/instructor/BlogTable";
import { getBlogsByUser } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { auth } from "@clerk/nextjs/server";

export default async function MyBlogs() {
  const { sessionClaims } = await auth();
  const categories = await getCategory();
  const blogs = await getBlogsByUser({ userId: sessionClaims?.userId });

  const pathname = "/dashboard/my-blogs";

  const handleDelete = (blogId) => {
    // Example delete logic
    console.log(blogId);
    // Add API call here, e.g., await deleteBlog(blogId);
    // Optionally revalidate: revalidatePath("/dashboard");
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <section>
        <AddBlog
          userId={sessionClaims?.userId}
          categories={categories}
          pathname={pathname}
        />
      </section>
      <section className="mt-4">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          My Blogs
        </h1>

        <BlogTable blog={blogs?.blogs} />
      </section>
    </div>
  );
}
