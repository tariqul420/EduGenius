import React from 'react'
import TotalCourse from './components/TotalCourse'
import CourseSubjects from './components/CourseSubjects'
import TopInstructors from './components/TopInstructors'
import BecomeInstructor from './components/BecomeInstructor'
import OurAchieve from './components/OurAchieve'
import Testimonial from './components/Testimonial'

export default function Home() {
  return (
    <div className=''>
     
      <TopInstructors />

<BecomeInstructor />
      <TotalCourse></TotalCourse>
      <CourseSubjects></CourseSubjects>
      <OurAchieve></OurAchieve>
      <Testimonial></Testimonial>
    </div>
  )
}
