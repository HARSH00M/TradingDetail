
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaIndustry, FaUpload } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export default function Mobile() {
  return (
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
                    <Link to="/upload" className="flex items-center cursor-pointer flex-col gap-y-1">
                        <FaUpload className="text-white size-10 border rounded-full p-2 "/>
                        <p className="text-xs text-gray-300">Upload</p>
                    </Link>
                </div>
            </div>
  )
}
