import { useState } from "react"
import { applyfilter, filtervalues } from "../../../services/dashboard";
import FilterSection from "./filtersection";
import { useQuery } from "@tanstack/react-query";
import Table from "../../Table";



type StateProps = {
  fromdate: string ,
  todate: string ,
  securitytype: string | null,
  modeofacquisition: string | null,
  transactiontype: string | null
}
export default function FilterBoard() {
  const [state, setState] = useState<StateProps>({
    fromdate: '2024-06-01',
    todate: '2024-06-02',
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


  console.log("data : ",tabledata.data)


  return (
    <div className="min-h-screen">
      {/* filter section */}
      <FilterSection filterstate={state} setState={setState} data={data}/>
     <div className="overflow-x-scroll max-w-screen md:max-w-screen-lg">
     {tabledata.data ? 
      <Table data={tabledata.data}/> : null
      }
     </div>
      
    </div>
  )
}
