"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
    {
        title: 'Home Page',
        desc: 'Welcome your campus community with an elegant landing experience.',
        details: 'The homepage gives an overview of recent campus activity, quick access to features, and promotes engagement right from the start.',
        image: '/home.jpg',
    },
    {
        title: 'Discussion Page',
        desc: 'Collaborate and chat with fellow students and organizers.',
        details: 'Threads, replies, and real-time conversations allow meaningful academic and social interaction in one place.',
        image: '/discussions.jpg',
    },
    {
        title: 'Events Page',
        desc: 'Discover and join upcoming lectures, fests, and hackathons.',
        details: 'Explore curated event feeds and RSVP with one click. Never miss what’s happening around you.',
        image: '/events.jpg',
    },
     {
        title: 'Discover Page',
        desc: 'Explore new opportunities and resources tailored for you.',
        details: 'Uncover hidden gems within your campus community and beyond.',
        image: '/discover.jpg',
    },
    {
        title: 'Profile Page',
        desc: 'Manage your interests, participation history, and more.',
        details: 'Showcase your campus journey, from events attended to clubs joined — all in one unified profile.',
        image: '/profile.jpg',
    },
]

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        if (!isPlaying) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [isPlaying])

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[currentIndex].title}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between 
  rounded-3xl shadow-xl p-6 md:p-10 min-h-[240px] 
  backdrop-blur-md bg-white/10 dark:bg-white/5"

                >
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            {slides[currentIndex].title}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                            {slides[currentIndex].desc}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto md:mx-0">
                            {slides[currentIndex].details}
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src={slides[currentIndex].image}
                            alt={slides[currentIndex].title}
                            width={200}
                            height={400}
                            className="rounded-xl object-contain"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-3 mt-4">
                <button
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="w-9 h-9 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
                >
                    {isPlaying ? (
                        <span className="text-xl">⏸</span>
                    ) : (
                        <span className="text-xl">▶️</span>
                    )}
                </button>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === currentIndex
                                ? 'bg-gray-900 dark:bg-white'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
