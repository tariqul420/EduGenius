import Image from "next/image";

const data = [
  {
    id: "1",
    img: "https://i.ibb.co/9kngr6fK/instructor1.png",
    name: "John Doe",
    designation: "CEO",
  },
  {
    id: "2",
    img: "https://i.ibb.co/XrvnsQTt/instructor2.png",
    name: "Sarah Lee",
    designation: "Project Manager",
  },
  {
    id: "3",
    img: "https://i.ibb.co/zTxZ50Rw/instructor3.png",
    name: "Michael Smith",
    designation: "Web Developer",
  },
  {
    id: "4",
    img: "https://i.ibb.co/39fqxjNQ/instructor4.png",
    name: "Emma Johnson",
    designation: "Architect",
  },
];

export default function TopInstructors() {
  return (
    <section className="bg-dark-green flex flex-col justify-center items-center py-12 mt-20">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-white">Top Rated Instructors</h1>
      <p className="text-base text-white mt-2">
        Learn from the best in the industry.
      </p>

      {/* Instructors Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white group rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center hover:bg-green hover:-translate-y-2 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-48 h-48 overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Instructor Details */}
            <h3 className="text-center text-lg mt-4 font-semibold text-gray-800 group-hover:text-white">
              {item.name}
            </h3>
            <p className="text-center text-base text-gray-600 group-hover:text-gray-200">
              {item.designation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}