"use client";
import Image from "next/image";

export default function TopInstructors() {
  const data = [
    {
      id: "1",
      img: "https://i.ibb.co.com/9kngr6fK/instructor1.png",
      name: "John Doe",
      designation: "CEO",
    },
    {
      id: "2",
      img: "https://i.ibb.co.com/XrvnsQTt/instructor2.png",
      name: "Sarah Lee",
      designation: "Project Manager",
    },
    {
      id: "3",
      img: "https://i.ibb.co.com/zTxZ50Rw/instructor3.png",
      name: "Michael Smith",
      designation: "Web Developer",
    },
    {
      id: "4",
      img: "https://i.ibb.co.com/39fqxjNQ/instructor4.png",
      name: "Emma Johnson",
      designation: "Architect",
    },
  ];
  return (
    <div className="bg-[#264D3F] flex flex-col justify-center items-center py-12">
      <h1 className="text-2xl font-bold text-white">Top Rated Instructor</h1>
      <p className="text-base text-white">Top Rated Instructor</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 justify-between items-center gap-10 text-white mt-5">
        {data.map((item) => (
          <div key={item.id} className="p-3">
            <Image src={item?.img} width={250} height={100} alt={item.name} />
            <h2 className="text-center text-lg mt-2">{item?.name}</h2>
            <p className="text-center text-base">{item?.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
