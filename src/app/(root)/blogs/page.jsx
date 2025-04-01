import FilterBar from "@/components/blogs/FilterBar";
import FilterItem from "@/components/blogs/FilterItem";
import InsightsCard from "@/components/home/InsightsCard";
import LoadMore from "@/components/shared/LoadMore";
import NoResult from "@/components/shared/NoResult";
import { getBlogs } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";

const BlogPage = async ({ searchParams }) => {
  const { category } = await searchParams;
  const { search } = await searchParams;
  const { page } = await searchParams;

  const categoryParams = category || "";

  const {
    blogs = [],
    total = 0,
    hasNextPage = false,
  } = await getBlogs({
    categories: categoryParams.split(","),
    search,
    page: Number(page) || 1,
    limit: 4,
  });

  const categories = await getCategory();

  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5 lg:max-w-6xl">
        {/* Filter Bar */}
        <FilterBar blogs={blogs} total={total} categories={categories} />

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 lg:grid-cols-12">
          {/* Blog Posts Section */}
          <div className="lg:col-span-9">
            {blogs?.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {blogs?.map((blog) => (
                  <InsightsCard key={blog?.slug} insights={blog} />
                ))}
                <div className="col-span-2">{hasNextPage && <LoadMore />}</div>
              </div>
            ) : (
              <NoResult />
            )}
          </div>

          {/* Fixed Sidebar (Categories) */}
          <div className="courses-filter col-span-3 hidden rounded px-4 py-1.5 shadow-md lg:block">
            <FilterItem categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
