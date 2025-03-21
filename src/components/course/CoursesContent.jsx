"use client";

import useProvider from '@/hooks/useProvider';
import React from 'react'
import CourseCard from '../shared/CourseCard';

export default function CoursesContent({ courses }) {

    const { isGridCol } = useProvider();

    return (
        <div
            className={`courses col-span-12 grid gap-5 lg:col-span-8 ${isGridCol ? "grid-cols-1 gap-5" : "sm:grid-cols-2"}`}>
            {
                courses?.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                    />
                ))
            }
        </div>
    )
}
