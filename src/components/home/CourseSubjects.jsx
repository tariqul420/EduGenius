import React from "react";

const CourseSubjects = () => {
  return (
    <>
      <div className=" text-center py-4 ">
        <h1 className="text-4xl  font-bold">Course By Subjects</h1>
        <p className=" text-gray-600">
          Find your desired course from the wide range of subjects.
        </p>
      </div>
      {/* all subjects */}
      <div className=" max-w-10/12 py-4  p-8  mx-auto grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/social sience.png" alt="" />
          <p className="uppercase">social science</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/chemistry110.png" alt="" />
          <p className="uppercase">Chemistry</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/economy.png" alt="" />
          <p className="uppercase">Economy</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/arts.png" alt="" />
          <p className="uppercase">Arts</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/general knowladge.png" alt="" />
          <p className="uppercase">General Knowladge</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/highher math.png" alt="" />
          <p className="uppercase">Higher Math</p>
        </div>
        <div className="flex items-center p-2  border-white shadow-md  border transition-transform duration-300 hover:scale-110 gap-2">
          <img src="/geomatry.png" alt="" />
          <p className="uppercase">Geomatry</p>
        </div>
      </div>
    </>
  );
};

export default CourseSubjects;
