import { BookOpenText, ShoppingCart, Smile, Users } from "lucide-react";

const data = [
  {
    icon: <BookOpenText size={100} className="mx-auto text-6xl md:text-8xl text-primary" />,
    feature: "Total Course",
    value: "22 +"
  },
  {
    icon: <Users size={100} className="mx-auto text-6xl md:text-8xl text-primary" />,
    feature: "Instructors",
    value: "9 +"
  },
  {
    icon: <ShoppingCart size={100} className="mx-auto text-6xl md:text-8xl text-primary" />,
    feature: "Learners",
    value: "357 +"
  },
  {
    icon: <Smile size={100} className="mx-auto text-6xl md:text-8xl text-primary" />,
    feature: "Satisfied",
    value: "2.35 %"
  },
];

const TotalCourse = () => {
  return (
    <section className="bg-dark-green dark:bg-black-light mt-20">
      <div className="container mx-auto lg:max-w-6xl my-4 max-w-10/12 py-12 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div key={index} className="items-center flex flex-col md:flex-row gap-4 text-center md:text-left">
            <div>
              {item.icon}
            </div>
            <div>
              <h6 className="text-white text-xl md:text-2xl font-medium">{item.feature}</h6>
              <p className="text-3xl md:text-4xl text-white font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TotalCourse;