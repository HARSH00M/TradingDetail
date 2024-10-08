import DatePicker from './dateselector'
import DropDown from './dropdown'


type StateProps = {
  fromdate: string | null,
  todate: string | null,
  securitytype: string,
  modeofacquisition: string,
  transactiontype: string
}
type DataProps = {
  modeofacquisition: string[],
  securitytype: string[],
  transactiontype: string[]

}
export default function FilterSection({ filterstate, setState, data }: { filterstate: any, setState: any, data: DataProps }) {

  console.log(filterstate)
  console.log("Data2 : ", data)

  return (<div>
    <div>
      <h1>FilterSection</h1>
    </div>
    <div className='md:flex w-full md:flex-row py-4 gap-x-4'>
      <DatePicker statename={"fromdate"} setState={setState} />
      <DatePicker statename={"todate"} setState={setState} />
      <DropDown title={"modeofacquisition"} state={filterstate.modeofacquisition} data={data?.modeofacquisition} setState={setState} />
      <DropDown title={"securitytype"} state={filterstate.securitytype} data={data?.securitytype} setState={setState} />
      <DropDown title={"transactiontype"} state={filterstate.transactiontype} data={data?.transactiontype} setState={setState} />


    </div>
    <div>
      <button className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
        Apply
      </button>
      <button className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
        Reset 
      </button>
    </div>
  </div>)

}
