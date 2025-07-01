import CheckCategory from "@/components/shared/check-category";

export function CourseFilterItem({ categories }) {
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
      <hr />
      <br />
      <div className="price-filter">
        <h2 className="mb-3 text-2xl">Price</h2>
        <div className="flex flex-col gap-2">
          <CheckCategory
            data={[
              { _id: "paid", name: "Paid", slug: "paid" },
              { _id: "free", name: "Free", slug: "free" },
            ]}
            keyCategory="priceCondition"
          />
        </div>
      </div>
      <hr />
      <br />
      <div className="level-filter">
        <h2 className="mb-3 text-2xl">Level</h2>
        <div className="flex flex-col gap-2">
          <CheckCategory
            data={[
              { _id: "beginner", name: "Beginner", slug: "Beginner" },
              {
                _id: "intermediate",
                name: "Intermediate",
                slug: "Intermediate",
              },
              { _id: "advanced", name: "Advanced", slug: "Advanced" },
            ]}
            keyCategory="level"
          />
        </div>
      </div>
    </>
  );
}

export default CourseFilterItem;
