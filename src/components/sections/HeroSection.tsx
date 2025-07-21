"use client"
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export default function HeroSection() {
    return (
        <>
            <Navbar />
            <section className="min-h-max bg-white dark:bg-gray-950">
                <div className="absolute top-0 inset-x-0 h-64 flex items-start">
                    <div className="h-24 w-2/3 bg-gradient-to-br from-purple-500 opacity-20 blur-2xl dark:from-purple-700 dark:invisible dark:opacity-40">
                    </div>
                    <div className="h-20 w-3/5 bg-gradient-to-r from-blue-600 opacity-40 blur-2xl dark:from-purple-700 dark:opacity-40">
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2/5 aspect-[2/0.5] bg-gradient-to-br from-purple-600 to-violet-400 rounded-full opacity-50 blur-2xl">
                </div>
                <div className="relative mx-auto pt-32 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
                    <h1 className="text-gray-900 dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight">
                        We create, we design, we develop Modern tools.
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt saepe atque enim quasi a ipsum
                        asperiores necessitatibus deleniti, sint quo vel corporis dignissimos
                    </p>
                    <div className="flex justify-center items-center flex-wrap mx-auto gap-4">
                        <Link href="#" className="flex items-center h-12 px-6 rounded-full bg-purple-600 text-white border border-purple-600">
                            Hire us Now
                        </Link>
                        <Link href="#" className="flex items-center h-12 px-6 rounded-full bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                            Learn more
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}