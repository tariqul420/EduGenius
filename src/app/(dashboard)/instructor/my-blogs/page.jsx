import AddBlog from "@/components/dashboard/instructor/AddBlog";
import { getCategory } from "@/lib/actions/category.action";
import { auth } from "@clerk/nextjs/server";

export default async function MyBlogs() {
  const { sessionClaims } = await auth();
  const categories = await getCategory();

  const pathname = "/dashboard/my-blogs";

  return (
    <section className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <AddBlog
          userId={sessionClaims?.userId}
          categories={categories}
          pathname={pathname}
        />
      </div>
    </section>
  );
}
