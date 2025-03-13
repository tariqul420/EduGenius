import React from 'react'
import TotalCourse from './components/TotalCourse'
import CourseSubjects from './components/CourseSubjects'
import TopInstructors from './components/TopInstructors'
import BecomeInstructor from './components/BecomeInstructor'

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
