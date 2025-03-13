import { FaUserGraduate } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdMenuBook, MdOutlineSentimentSatisfiedAlt } from "react-icons/md";
const TotalCourse = () => {
  return (
    <div className="bg-dark-green">
      <div className="container mx-auto lg:max-w-6xl my-4 p-12 max-w-10/12 py-4 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <div className="text-center   items-center   ">
          <MdMenuBook className="mx-auto text-8xl text-green"></MdMenuBook>
          <h6 className="text-white">Total Course</h6>
          <p className="text-4xl text-white">50 +</p>
        </div>
        <div className="text-center   ">
          <IoPeopleSharp className="mx-auto text-8xl text-green" />
          <h6 className="text-white">Instructors</h6>
          <p className="text-4xl text-white ">10 +</p>
        </div>

        <div className="text-center   ">
          <FaUserGraduate className="mx-auto text-8xl text-green" />
          <h6 className="text-white">Learners</h6>
          <p className="text-4xl text-white ">1003 +</p>
        </div>
        <div className="text-center ">
          <MdOutlineSentimentSatisfiedAlt className=" mx-auto text-8xl text-green" />
          <h6 className="text-white">Satisfied</h6>
          <p className="text-4xl text-white">4.45 %</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCourse;
