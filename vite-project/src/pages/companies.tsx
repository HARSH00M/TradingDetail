
import {
  useQuery,
} from '@tanstack/react-query'

import { AllCompanies } from '../services/search'
import Search from '../components/search'
import Pagination from '../components/pagination'
import { useState } from 'react'
import Card from '../components/card'

export default function Allcompanies() {
  const [currentPage, setCurrentPage ] = useState<number>(0)


  const { isPending, error, data } = useQuery({
    queryKey: ['allcompanies', currentPage ],
    queryFn: ()=>AllCompanies(currentPage),
  })



  


  if (data){
    var Data = data.allCompanies;
    console.log("data : ",Data)
    var pages = data.pages
  }


  if (data)
    return (
      <div className="relative text-gray-700 bg-white  w-full flex flex-col justify-center items-center my-8">
        <Search  />
        <nav className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 justify-between p-2 font-sans text-base font-normal text-blue-gray-700">
          {Data.map((value : any, index : number) => <Card key={index} index={index} value={value} />
          )}
        </nav>
        <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    )

  if (isPending) return <div>Loading...</div>

  if (error) return <div>
An error has occurred:  {error.message}
  </div>


}





