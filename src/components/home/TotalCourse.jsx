
"use client";
import { BookOpenText, ShoppingCart, Smile, Users } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const data = [
  {
    icon: (
      <BookOpenText className="text-main mx-auto size-[50px] md:size-[70px]" />
    ),
    feature: "Total Course",
    value: 22,
    suffix: " +",
  },
  {
    icon: <Users className="text-main mx-auto size-[50px] md:size-[70px]" />,
    feature: "Instructors",
    value: 9,
    suffix: " +",
  },
  {
    icon: (
      <ShoppingCart className="text-main mx-auto size-[50px] md:size-[70px]" />
    ),
    feature: "Learners",
    value: 357,
    suffix: " +",
  },
  {
    icon: <Smile className="text-main mx-auto size-[50px] md:size-[70px]" />,
    feature: "Satisfied",
    value: 2.35,
    suffix: " %",
    decimals: 2,
  },
];

const TotalCourse = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      className="bg-dark-green dark:bg-black-light py-5 md:py-12"
      ref={ref}
    >
      <div className="container mx-auto my-4 grid grid-cols-2 items-center gap-3 px-2 md:gap-6 md:px-5 lg:max-w-6xl lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-light-bg dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border px-2 py-3 text-center shadow-2xl"
          >
            <div>{item.icon}</div>
            <div>
              <p className="dark:text-light-bg text-3xl font-bold text-black md:text-4xl">
                {inView ? (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2.5}
                    suffix={item.suffix}
                    decimals={item.decimals || 0}
                  />
                ) : (
                  "0"
                )}
              </p>
              <h6 className="dark:text-light-bg text-xl font-medium text-black md:text-2xl">
                {item.feature}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TotalCourse;
