
export default function Skeleton() {
    return (
        <div>
            <div className="bg-white p-2 sm:p-4 w-[350px] h-[200px]  md:w-[500px] md:h-[350px] rounded-2xl shadow-lg flex items-center border-2 sm:flex-row gap-5 select-none ">
                <div className="flex flex-col flex-1 gap-5 sm:p-2">
                    <div className="flex flex-1 flex-col gap-3 ">
                        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl" ></div>
                        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl" ></div>
                        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl" ></div>
                        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl" ></div>
                        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl" ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
