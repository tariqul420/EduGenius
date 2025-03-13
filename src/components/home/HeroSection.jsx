import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

function HeroSection() {
    return (
        <section className='bg-gradient-to-r from-[#264D3F] to-dark-green text-white py-12'>
            <div className='container m-auto lg:max-w-6xl flex flex-col lg:flex-row items-center gap-8'>
                {/* Text Content */}
                <div className='space-y-5 flex-1'>
                    <p className='text-2xl font-semibold'>#1 Platform for Online Learning</p>
                    <h2 className='text-6xl font-bold'>Enroll & <span className='text-green'>grow up</span> your skills today!</h2>
                    <p className='font-medium'>Explore new skills beyond the world of knowledge and get lost in freedom of creativity.</p>
                    <div className='flex items-center gap-4'>
                        <button className='px-6 py-3 border border-green bg-green rounded-md hover:bg-white hover:text-black hover:border-white flex items-center gap-2'>
                            Start Learning <FaArrowRight />
                        </button>
                        <button className='px-6 py-3 border border-green rounded-md hover:bg-white hover:text-black hover:border-white'>
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Image Grid */}
                <div className='flex-1 grid grid-cols-2 gap-4'>
                    <div className='relative h-64 rounded-lg shadow-lg overflow-hidden'>
                        <Image
                            src="/images/hero1.png"
                            alt="Hero 1"
                            fill
                            className='object-cover'
                            placeholder='blur'
                            blurDataURL='/images/hero1.png'
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className='relative h-48 rounded-lg shadow-lg overflow-hidden'>
                        <Image
                            src="/images/hero2.png"
                            alt="Hero 2"
                            fill
                            className='object-cover'
                            placeholder='blur'
                            blurDataURL='/images/hero2.png'
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className='relative h-48 rounded-lg shadow-lg overflow-hidden'>
                        <Image
                            src="/images/hero3.png"
                            alt="Hero 3"
                            fill
                            className='object-cover'
                            placeholder='blur'
                            blurDataURL='/images/hero3.png'
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className='relative h-64 rounded-lg shadow-lg overflow-hidden'>
                        <Image
                            src="/images/hero4.png"
                            alt="Hero 4"
                            fill
                            className='object-cover'
                            placeholder='blur'
                            blurDataURL='/images/hero4.png'
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;