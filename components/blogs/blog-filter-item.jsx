import CheckCategory from "@/components/shared/CheckCategory";

export function BlogFilterItem({ categories }) {
  return (
    <>
      <div className="category-filter">
        <h2 className="text-2xl">All Categories</h2>
        <ul>
          {categories?.length > 0 ? (
            <li className="">
              <CheckCategory data={categories} keyCategory="category" />
            </li>
          ) : (
            <p>No categories found.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default BlogFilterItem;
