
import { Link } from "react-router-dom"
import {motion} from 'framer-motion'


export default function Card({index, value} : {index : number, value : any}) {


  return (
    <Link key={index}  to={`/details?sym=${value.symbol}&comp=${value.company}`} >
            <motion.div
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{
    type: "tween",
    stiffness: 250,
    damping: 20
  }} role="button"
              className=" flex flex-row h-20 my-3 bg-blue-100 justify-center border rounded-lg px-2">
              <div className='w-5 mx-4 h-full bg-blue-600 shadow-md'></div>
              <div className='flex flex-col h-full justify-center container'>
                <h1 className="text-lg font-semibold text-gray-900">{value.company}</h1>
                <h2 className="text-sm font-normal">{value.symbol}</h2>
              </div>
            </motion.div>
          </Link>
  )
}
