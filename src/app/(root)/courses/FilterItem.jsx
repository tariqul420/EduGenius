import CheckCategory from "@/components/shared/CheckCategory";

const FilterItem = () => {
  return (
    <>
        <div className="category-filter">
          <h2 className="text-2xl">All Categories</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
              <CheckCategory id='webDesign' label='Web Design' keyCategory='category' />
            </li>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='webDevelopment' label='Web Development' keyCategory='category' />
            </li>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='flutte' label='Flutter' keyCategory='category' />
            </li>
          </ul>
        </div>
        <hr />
        <br />
        <div className="price-filter">
          <h2 className="text-2xl">Price</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='paid' label='Paid' keyCategory='priceCondition' />
            </li>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='free' label='Free' keyCategory='priceCondition' />
            </li>
          </ul>
        </div>
        <hr />
        <br />
        <div className="level-filter">
          <h2 className="text-2xl">Level</h2>
          <ul>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='beginner' label='Beginner' keyCategory='level' />
            </li>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='intermediate' label='Intermediate' keyCategory='level' />
            </li>
            <li className="flex gap-1.5 items-center">
            <CheckCategory id='advanced' label='Advanced' keyCategory='level' />
            </li>
          </ul>
        </div>
    </>
  );
};

export default FilterItem;
