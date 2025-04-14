import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import React from "react";
  
  const studentData = [
    {
      id: 1,
      name: "Ayesha Akter",
      email: "ayesha@email.com",
      course: "Mastering TypeScript",
      enrolledDate: "2025-03-20",
      status: "Active",
    },
    {
      id: 2,
      name: "Hasib Rahman",
      email: "hasib@email.com",
      course: "Backend with Node.js",
      enrolledDate: "2025-02-15",
      status: "Active",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      email: "nusrat@email.com",
      course: "Intro to Graphic Design",
      enrolledDate: "2025-01-10",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Tanvir Ahmed",
      email: "tanvir@email.com",
      course: "Cloud Computing with AWS",
      enrolledDate: "2025-03-05",
      status: "Active",
    },
    {
      id: 5,
      name: "Rina Khatun",
      email: "rina@email.com",
      course: "Machine Learning Basics",
      enrolledDate: "2025-02-25",
      status: "Inactive",
    },
  ];
  
  const StudentList = () => {
    return (
      <div className="p-4 rounded-xl border  shadow">
        <h2 className=" text-2xl lg:text-5xl  font-bold mb-4 text-center">Student List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Course</TableHead>
              <TableHead className="text-center">Enrolled Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student, index) => (
              <TableRow key={student.id}>
                <TableHead className="text-center">{index + 1}</TableHead>
                <TableHead className="text-center">{student.name}</TableHead>
                <TableHead className="text-center">{student.email}</TableHead>
                <TableHead className="text-center">{student.course}</TableHead>
                <TableHead className="text-center">{student.enrolledDate}</TableHead>
                <TableHead className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.status === "Active"
                        ? " text-green-600"
                        : " text-red-600"
                    }`}
                  >
                    {student.status}
                  </span>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default StudentList;
  