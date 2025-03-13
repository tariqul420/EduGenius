import React from 'react'
import TotalCourse from '../components/home/TotalCourse'
import CourseSubjects from '../components/home/CourseSubjects'
import TopInstructors from '../components/home/TopInstructors'
import BecomeInstructor from '../components/home/BecomeInstructor'

export default function Home() {
  return (
    <div className=''>
      <TopInstructors />
      <BecomeInstructor />
      <TotalCourse />
      <CourseSubjects />
    </div>
  )
}
