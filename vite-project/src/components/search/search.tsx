import { useQuery } from "@tanstack/react-query";
import { searchAutoComplete } from "../../services/search";
import List from "./list";
import { useState } from "react";

export default function Search() {



  const [searchTerm, setSearchTerm] = useState<string>(''); // State to trigger query fetch
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // React Query hook for fetching data dynamically
  const { data } = useQuery({
    queryKey: ['data', searchTerm],
    queryFn: () => searchAutoComplete(searchTerm), 
    refetchOnMount : false,
    refetchOnWindowFocus : false// Fetching function
  }
  );


  return (
    <div>
      <div className={`w-full mx-auto max-w-sm min-w-[${600}px] my-8`}>
        <div className="relative">
          <input
            onChange={(e) => handleChange(e)}
            className={`w-full h-[50px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-600 hover:border-slate-900 shadow-sm focus:shadow`}
            placeholder="Company Name"
          />
          <button
            className="absolute top-3 right-2 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>

            Search
          </button>
          {data?.length>0 ? <List data={data} /> : null}
          

        </div>
      </div>

    </div>
  )
}
