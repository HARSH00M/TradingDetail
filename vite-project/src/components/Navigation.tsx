import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaIndustry } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export default function NavigationBar() {



    return (
        <nav
            className="md:sticky fixed bottom-0 md:top-0  z-[2147] w-full max-w-full bg-gray-900 rounded-none shadow-lg shadow-black/50 h-max  bg-opacity-90 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
            <div className="md:flex hidden text-white items-center justify-between text-blue-gray-900">
                <Link to='/'
                    className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                    {/* <img src="/Finlytics.png" alt="Finlytics" className="h-14" /> */}
                    Finlytics
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden mr-4 lg:block">
                        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link to="/" className="flex items-center">
                                    Home
                                </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link to="/allcompanies" className="flex items-center">
                                    Companies
                                </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link to="/about" className="flex items-center">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                        {/* <div className="flex items-center gap-x-1">
                            <a href='/login'
                                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                type="button">
                                <span>Log In</span>
                            </a>
                            <a href='/register'
                                className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                 >
                                <span>Sign in</span>
                            </a>
                        </div> */}
                        {/* :
                        <div className='flex gap-x-5'>
                            <a href='/create' className='px-4 py-2 flex items-center font-sans text-xs font-bold  bg-green-500 text-white uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none '>Create Blog</a>
                        </div> */}

                    <button
                        className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div className="md:hidden w-full flex flex-row ">
                <div className="w-full bg-slate-800 flex flex-row justify-evenly py-2">
                    <Link to="/" className="flex items-center cursor-pointer flex-col gap-y-1">
                        <IoMdHome className="text-white size-10 border rounded-full p-2 "/>
                        <p className="text-xs text-gray-300">Home</p>
                    </Link>
                    <Link to="/search" className="flex items-center cursor-pointer  flex-col gap-y-1">
                        <FaSearch className="text-white size-10 border rounded-full p-2 "/>
                        <p className="text-xs text-gray-300">Search</p>
                    </Link>
                    <Link to="/allcompanies" className="flex items-center cursor-pointer flex-col gap-y-1">
                        <FaIndustry className="text-white size-10 border rounded-full p-2 "/>
                        <p className="text-xs text-gray-300">Industry</p>
                    </Link>
                </div>
            </div>
        </nav>

    )
}
