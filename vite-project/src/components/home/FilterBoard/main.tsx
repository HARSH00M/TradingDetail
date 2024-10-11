import { useState } from "react"
import { applyfilter, filtervalues } from "../../../services/dashboard";
import FilterSection from "./filtersection";
import { useQuery } from "@tanstack/react-query";
import Table from "../../Table";



type StateProps = {
  fromdate: string | null,
  todate: string | null,
  securitytype: string | null,
  modeofacquisition: string | null,
  transactiontype: string | null
}
export default function FilterBoard() {
  const [state, setState] = useState<StateProps>({
    fromdate: null,
    todate: null,
    securitytype: null,
    modeofacquisition: null,
    transactiontype:  null
  })

  const { data } = useQuery({
    queryKey: ['filtervalues'],
    queryFn: () => filtervalues(),
  });

  const tabledata = useQuery({
    queryKey : ['table', state], 
    queryFn : () => applyfilter({from : state.fromdate, to : state.todate, securitytype : state.securitytype, modeofacquisition : state.modeofacquisition, transactiontype : state.transactiontype}),
  })

  function apply(){
    console.log("apply")
  }
  function reset(){
    console.log("reset") 
  }

  console.log("data : ",tabledata.data)


  return (
    <div className="min-h-screen">
      filter section
      <FilterSection apply={apply} reset={reset} filterstate={state} setState={setState} data={data}/>
     <div className="overflow-x-scroll max-w-screen md:max-w-screen-lg">
     {tabledata.data ? 
      <Table data={tabledata.data}/> : null
      }
     </div>
      
    </div>
  )
}
