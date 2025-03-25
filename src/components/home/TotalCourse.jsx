import { BookOpenText, ShoppingCart, Smile, Users } from "lucide-react";

const data = [
  {
    icon: (
      <BookOpenText
        size={100}
        className="text-main mx-auto text-6xl md:text-8xl"
      />
    ),
    feature: "Total Course",
    value: "22 +",
  },
  {
    icon: (
      <Users size={100} className="text-main mx-auto text-6xl md:text-8xl" />
    ),
    feature: "Instructors",
    value: "9 +",
  },
  {
    icon: (
      <ShoppingCart
        size={100}
        className="text-main mx-auto text-6xl md:text-8xl"
      />
    ),
    feature: "Learners",
    value: "357 +",
  },
  {
    icon: (
      <Smile size={100} className="text-main mx-auto text-6xl md:text-8xl" />
    ),
    feature: "Satisfied",
    value: "2.35 %",
  },
];

const TotalCourse = () => {
  return (
    <section className="bg-dark-green dark:bg-black-light mt-20">
      <div className="container mx-auto my-4 grid max-w-10/12 grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 lg:max-w-6xl lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left"
          >
            <div>{item.icon}</div>
            <div>
              <h6 className="text-xl font-medium text-white md:text-2xl">
                {item.feature}
              </h6>
              <p className="text-3xl font-bold text-white md:text-4xl">
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
