import { Link } from "react-router-dom"

export default function List({ data }: { data: any[] }) {
        return (
            <div className="absolute w-full mt-2 z-[400]">
                <div className="relative flex flex-col text-gray-700 shadow-md  rounded-xl border w-full  bg-white">
                    <div className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 overflow-y-auto max-h-64 ">
                        {
                            data.map((item, index) => <Link key={index} to={`/details?sym=${item.symbol}&comp=${item.company}`}
                                className="flex items-center w-full p-3 leading-tight bg-white/90 hover:text-gray-600 hover:bg-cyan-400 text-gray-800 border-slate-700 shadow-lg transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                {item.company}
                            </Link>)
                        }

                    </div>
                </div>
            </div>
        )
    
}
