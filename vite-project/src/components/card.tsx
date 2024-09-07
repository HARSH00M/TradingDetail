
import { Link } from "react-router-dom"


export default function Card({index, value} : {index : number, value : any}) {


  return (
    <Link key={index}  to={`/details?sym=${value.symbol}&comp=${value.company}`} >
            <div role="button"
              className=" flex flex-row h-20 my-3">
              <div className='w-5 mx-4 h-full bg-cyan-400/70 shadow-md'></div>
              <div className='flex flex-col h-full container'>
                <h1 className="text-lg font-semibold text-gray-900">{value.company}</h1>
                <h2 className="text-sm font-normal">{value.symbol}</h2>
              </div>
            </div>
          </Link>
  )
}
