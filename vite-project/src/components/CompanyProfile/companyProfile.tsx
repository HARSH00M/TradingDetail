import {motion} from 'framer-motion'


export default function CompanyProfile({ company, symbol }: { company: string, symbol: string }) {

    return (
        <motion.div 
        initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }} role="button"
        className='h-40 flex flex-row my-10'>
            <div className='mx-12 md:mx-44 flex justify-center items-center h-full '>
            <div className='h-full w-3 bg-cyan-400/70 shadow-md'></div>
                <div className='px-4'>
                    <h1 className='text-4xl text-gray-900 font-serif'>{company}</h1>
                    <h4 className='text-xl text-gray-800'> {symbol}</h4>
                </div>

            </div>
        </motion.div>
    )
}
