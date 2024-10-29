import DatePicker from './dateselector';
import DropDown from './dropdown';

type DataProps = {
  modeofacquisition: string[],
  securitytype: string[],
  transactiontype: string[]
}

export default function FilterSection({ reset, filterstate, setState, data }: { reset: any, filterstate: any, setState: any, data: DataProps }) {
  return (
    <div className='md:px-14 flex flex-col justify-center items-center w-5/6'>
      <div className='flex w-full md:py-8'>
        <h1 className='mx-auto text-xl md:text-3xl text-gray-700 font-semibold'>Recent Transactions Happened</h1>
      </div>

      <div className='flex justify-center md:justify-start items-center py-4 gap-y-2 gap-x-2 flex-wrap md:gap-x-4'>
        
        {/* Pass the current date values from filterstate to DatePicker */}
        <DatePicker statename="fromdate" setState={setState} value={filterstate.fromdate} />
        
        <p>to</p>

        <DatePicker statename="todate" setState={setState} value={filterstate.todate} />

        <DropDown title="modeofacquisition" state={filterstate.modeofacquisition} data={data?.modeofacquisition} setState={setState} />
        <DropDown title="securitytype" state={filterstate.securitytype} data={data?.securitytype} setState={setState} />
        <DropDown title="transactiontype" state={filterstate.transactiontype} data={data?.transactiontype} setState={setState} />

        <button onClick={reset} className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
          Reset 
        </button>
      </div>
    </div>
  );
}
