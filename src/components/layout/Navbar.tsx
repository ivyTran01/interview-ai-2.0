"use client"
import {useState} from "react";
import Link from "next/link";

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false)
    const toggleNavbar = () => {
        setOpenNavbar(openNavbar => !openNavbar)
    }
    return (
        <header className="fixed left-0 top-0 w-full flex items-center h-24 z-40">
            <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
                <div className="flex items-center min-w-max">
                    <Link href="/" className="font-semibold flex items-center gap-x-2">
                        <div className="flex items-center -space-x-3">
                            <span className="h-6 aspect-square bg-purple-600 dark:bg-purple-500 rounded-full flex" />
                            <span className="h-6 aspect-square bg-violet-600 dark:bg-violet-400 blur rounded-full flex" />
                        </div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">Agency</span>
                    </Link>
                </div>
                <div className={`
                absolute top-full  left-0 bg-white dark:bg-gray-950 lg:!bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none lg:w-max lg:space-x-16 lg:top-0 lg:relative  lg:flex duration-300 lg:transition-none ease-linear
                ${openNavbar ? "translate-y-0 opacity-0 visible" : "translate-y-10 opacity-0 invisible lg:visible  lg:translate-y-0 lg:opacity-100"}
            `}>
                    <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
                        <li>
                            <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">Portfolio</Link>
                        </li>
                        <li>
                            <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">Company</Link>
                        </li>
                        <li>
                            <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">Products</Link>
                        </li>
                        <li>
                            <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">Resources</Link>
                        </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4  lg:min-w-max mt-10 lg:mt-0">
                        <Link href="#" className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full bg-gray-100 dark:bg-gray-900 text-purple-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                            Get It touch
                        </Link>
                    </div>
                </div>
                <div className="flex items-center lg:hidden">
                    <button onClick={() => { toggleNavbar() }} aria-label="Toggle navbar" className="outline-none border-l border-l-gray-100 dark:border-l-gray-800 pl-3 relative py-3 children:flex">
                    <span aria-hidden="true" className={`
                                    h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
                                    ${openNavbar ? "rotate-45 translate-y-[0.33rem]" : ""}
                                `} />
                        <span aria-hidden="true" className={`
                                    mt-2 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
                                    ${openNavbar ? "-rotate-45 -translate-y-[0.33rem]" : ""}
                                `} />
                    </button>
                </div>
            </nav>
        </header>

    )
}

export default Navbar;