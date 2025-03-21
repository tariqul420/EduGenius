import InsightsCard from "@/components/home/InsightsCard";
import CheckCategory from "@/components/shared/CheckCategory";
import SearchInput from "@/components/shared/SearchInput";
import { getBlogs } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";

const BlogDetails = async ({ searchParams }) => {
  const { category } = await searchParams;
  const { search } = await searchParams;

  const categoryParams = category || "";

  const data = await getBlogs({ categories: categoryParams.split(","), search });
  const categories = await getCategory();

  const blogs = data?.blogs || [];
  const total = data?.total || 0;
  const hasNextPage = data.hasNextPage || false;
  const { blogs: featured } = await getBlogs({ sort: "popular", limit: 6 });

  return (
    <div className="container mx-auto px-4 py-6 lg:max-w-6xl">
      {/* Header */}
      <div className="mb-8 items-center text-center justify-between md:flex max-sm:space-y-2">
        <h1 className="text-3xl font-semibold">All Posts</h1>
        <p className="text-gray-600 md:ml-80">
          Showing {blogs.length} results of {total}
        </p>
        <div>
          <SearchInput />
        </div>
      </div>
      <hr className="mb-8 border-t-2 border-gray-500" />
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Blog Posts Section */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <InsightsCard key={blog?.slug} insights={blog} />
              ))}
          </div>
        </div>

        {/* Sidebar (Categories) */}
        <div className="rounded-lg p-6 md:col-span-1">
          <h2 className="mb-4 text-2xl font-semibold">All Categories</h2>

          <div className="flex flex-col gap-5">
            <CheckCategory
              data={JSON.parse(JSON.stringify(categories))}
              keyCategory="category"
            />
          </div>
        </div>
      </div>

      {/* Featured Blog */}
      <div className="container lg:max-w-6xl mx-auto my-12 rounded-md px-4 py-6">
        {/* Header */}
        <div className=" text-center  md:flex  items-center mb-8">
          <h1 className="text-3xl font-semibold">Featured Blog</h1>

        </div>
        <hr className="border-t-2 border-gray-500 mb-8" />
        {/* Main Content */}
        <div className="  grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Blog Posts Section */}
          <section className="md:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
              {featured?.length > 0 &&
                featured.map((blog) => (
                  <InsightsCard key={blog?.slug} insights={blog} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
