import { motion } from 'framer-motion'


export default function NewCompanyProfile(props : any) {

    const data = props.data
    const name = props.name;

    const details = [
        {name : 'Market Cap', value : '₹' + data.marketcapitalization + ' Cr'},
        {name : 'PE Ratio', value : data.pricetoearnings},
        {name : 'PS Ratio', value : data.pricetosales},
        {name : 'Book Value', value : data.pricetobookvalue},
        {name : 'Debt to Equity', value : data.debttoequity},
        {name : 'Promoter Holdings', value : data.promoterholdings},
        {name : 'ROCE', value : data.roce + " %"},
    ]
    const returns = [
        {name : '1 W', value : data.returns1w},
        {name : '1 M', value : data.returns1m},
        {name : '3 M', value : data.returns3m},
        {name : '6 M', value : data.returns6m},
    ]


    return (
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
                type: "just",
                stiffness: 260,
                damping: 20
            }} role="button"
            className=' flex my-10 p-4 border-gray-500 '>



            <div className='mx-12 md:mx-44 flex-col justify-center items-center h-full '>
                <div className='flex flex-col gap-y-2 py-4'>
                    <div className='flex flex-row border gap-x-4'>
                    <div className='h-full px-2 py-8 bg-blue-500 shadow-md'></div>
                    <div className=''>
                        <h1 className='text-2xl md:text-4xl text-gray-900 font-serif md:px-4'>{name}</h1>
                        <h1 className='text-xl md:text-xl text-gray-700 md:px-4'>{'NSE : ' + data._id}</h1>
                    </div>
                    </div>
                    
                </div>

                <div className='md:border shadow-md border-gray-300 shadow-gray-200 rounded p-4'>
                    <div className='grid md:grid-cols-3 grid-cols-1'>
                        {details.map((detail, index) => (
                            <div key={index} className='flex gap-x-2 items-center p-2 '> 
                                <p className='text-gray-600 text-lg font-semibold'>{detail.name} :</p>
                                <p className='text-gray-600 text-lg'>{detail.value || null}</p>
                            </div>
                        ))}
                    </div>
                    <div className='my-2'>
                        <p className='text-gray-700 text-lg font-semibold'>Returns</p>
                        <hr className='border-t-2 border-gray-300 my-0 md:my-1'/>
                        <div className='grid md:grid-flow-col grid-cols-1'>
                        {returns.map((detail, index) => (
                            <div key={index} className='flex gap-x-2 items-center px-6'> 
                                <p className='text-gray-600 text-xl font-semibold '>{detail.name} :</p>
                                <p className='text-gray-600 text-xl'>{detail.value} %</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    
                </div>

            </div>
        </motion.div>
    )
}

