import React from 'react'
import TotalCourse from './components/TotalCourse'
import CourseSubjects from './components/CourseSubjects'

export default function Home() {
  return (
    <div className=''>
      <h1 className='text-4xl text-center text-green'>Welcome to our Edu Genius Website</h1>
      <p className='text-2xl'>AI-Powered Course Management System</p>
      <TotalCourse></TotalCourse>
      <CourseSubjects></CourseSubjects>
    </div>
  )
}
