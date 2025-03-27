import { BookOpenText, ShoppingCart, Smile, Users } from "lucide-react";

const data = [
  {
    icon: (
      <BookOpenText
        size={70}
        className="text-main mx-auto size-[70px] md:size-[90px]"
      />
    ),
    feature: "Total Course",
    value: "22 +",
  },
  {
    icon: (
      <Users
        size={70}
        className="text-main mx-auto size-[70px] md:size-[90px]"
      />
    ),
    feature: "Instructors",
    value: "9 +",
  },
  {
    icon: (
      <ShoppingCart
        size={70}
        className="text-main mx-auto size-[70px] md:size-[90px]"
      />
    ),
    feature: "Learners",
    value: "357 +",
  },
  {
    icon: (
      <Smile
        size={70}
        className="text-main mx-auto size-[70px] md:size-[90px]"
      />
    ),
    feature: "Satisfied",
    value: "2.35 %",
  },
];

const TotalCourse = () => {
  return (
    <section className="bg-dark-green dark:bg-black-light py-5 md:py-12">
      <div className="container mx-auto my-4 grid grid-cols-2 items-center gap-3 px-2 md:gap-6 md:px-5 lg:max-w-6xl lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-light-bg dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md px-2 py-3 text-center md:flex-row md:text-left"
          >
            <div>{item.icon}</div>
            <div>
              <h6 className="dark:text-light-bg text-xl font-medium text-black md:text-2xl">
                {item.feature}
              </h6>
              <p className="dark:text-light-bg text-3xl font-bold text-black md:text-4xl">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TotalCourse;
