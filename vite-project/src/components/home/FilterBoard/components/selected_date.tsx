
export default function selected_date(from : number, to : number) {
  return (
    <div className="flex w-full justify-center text-lg  text-gray-700 gap-4">
        <p>
            from : <span className='text-blue-500 underline underline-offset-4 decoration-gray-400'>{from}</span> 
        </p>
        <p>
            to : <span className='text-blue-500 underline underline-offset-4 decoration-gray-400'>{to}</span>
        </p>
    </div>
  )
}
