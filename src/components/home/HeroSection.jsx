import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

function HeroSection() {
    return (
        <section className='bg-gradient-to-r from-[#264D3F] to-dark-green text-white py-12'>
            <div className='container m-auto lg:max-w-6xl'>
                <div className='space-y-5 flex-1/2'>
                    <p className='text-2xl font-semibold'>#1 Platform for Online Learning</p>
                    <h2 className='text-6xl font-bold'>Enroll & <span className='text-green'>grow up</span> your skills today!</h2>
                    <p className='font-medium'>Explore new skills beyond the world of knowledge and get lost in freedom of creativity.</p>
                    <div className='flex items-center gap-4'>
                        <button className='px-6 py-3 border  border-green bg-green rounded-md hover:bg-white hover:text-black hover:border-white flex items-center gap-2'>Start Learning <FaArrowRight /></button>
                        <button className='px-6 py-3 border  border-green rounded-md hover:bg-white hover:text-black hover:border-white'>Get Start</button>
                    </div>
                </div>
                <div className='flex-1/2'>

                </div>
            </div>
        </section>
    )
}

export default HeroSection