import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import React from "react";
  
  const categoryData = [
    {
      id: 7,
      title: "Mastering TypeScript",
      category: "Programming",
      enrolledStudents: 110,
      price: 54.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 30,
    },
    {
      id: 8,
      title: "Intro to Graphic Design",
      category: "Design",
      enrolledStudents: 70,
      price: 34.99,
      status: "Draft",
      published: "Unpublished",
      seatAvailable: 50,
    },
    {
      id: 9,
      title: "Backend with Node.js",
      category: "Backend Development",
      enrolledStudents: 140,
      price: 59.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 25,
    },
    {
      id: 10,
      title: "Photography Essentials",
      category: "Photography",
      enrolledStudents: 95,
      price: 29.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 35,
    },
    {
      id: 11,
      title: "Machine Learning Basics",
      category: "Artificial Intelligence",
      enrolledStudents: 210,
      price: 89.99,
      status: "Draft",
      published: "Unpublished",
      seatAvailable: 20,
    },
    {
      id: 12,
      title: "Digital Marketing 101",
      category: "Marketing",
      enrolledStudents: 160,
      price: 45.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 40,
    },
    {
      id: 13,
      title: "iOS App Development",
      category: "Mobile Development",
      enrolledStudents: 100,
      price: 74.99,
      status: "Draft",
      published: "Unpublished",
      seatAvailable: 15,
    },
    {
      id: 14,
      title: "Cybersecurity Fundamentals",
      category: "Security",
      enrolledStudents: 180,
      price: 64.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 20,
    },
    {
      id: 15,
      title: "WordPress for Beginners",
      category: "CMS Development",
      enrolledStudents: 85,
      price: 39.99,
      status: "Approved",
      published: "Published",
      seatAvailable: 50,
    },
    {
      id: 16,
      title: "Cloud Computing with AWS",
      category: "Cloud Computing",
      enrolledStudents: 230,
      price: 99.99,
      status: "Draft",
      published: "Unpublished",
      seatAvailable: 18,
    },
  ];
  
  const Category = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl lg:text-5xl font-bold text-center mb-4">Course Categories</h2>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <Table className="min-w-full border border-gray-200">
            <TableHeader className=" text-gray-700 text-sm font-semibold">
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Course Title</TableHead>
                <TableHead className="text-center">Enrolled</TableHead>
                <TableHead className="text-center">Price ($)</TableHead>
                <TableHead className="text-center">Seats Left</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className=" transition-all duration-200"
                >
                  <td className="text-center p-2">{index + 1}</td>
                  <td className="text-center p-2">{item.category}</td>
                  <td className="text-center p-2">{item.title}</td>
                  <td className="text-center p-2">{item.enrolledStudents}</td>
                  <td className="text-center p-2">${item.price.toFixed(2)}</td>
                  <td className="text-center p-2">{item.seatAvailable}</td>
                  <td
                    className={`text-center p-2 font-medium ${
                      item.status === "Approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td
                    className={`text-center p-2 font-medium ${
                      item.published === "Published"
                        ? "text-blue-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.published}
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };
  
  export default Category;
  