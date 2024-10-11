import { useState } from "react"
import { applyfilter, filtervalues } from "../../../services/dashboard";
import FilterSection from "./filtersection";
import { useQuery } from "@tanstack/react-query";
import Table from "../../Table";
import Spinner from "../../spinner";



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
  

  const {data : tabledata} = useQuery({
    queryKey : ['table', state], 
    queryFn : () => applyfilter({from : state.fromdate, to : state.todate, securitytype : state.securitytype, modeofacquisition : state.modeofacquisition, transactiontype : state.transactiontype}),
  })

 
  function reset(){
    setState({
      fromdate: null,
      todate: null,
      securitytype: null,
      modeofacquisition: null,
      transactiontype:  null
    })
  }



  return (
    <div className="md:min-h-screen shadow-md shadow-black/30 flex flex-col items-center justify-center">

      <FilterSection reset={reset} filterstate={state} setState={setState} data={data}/>


     <div className="md:min-w-screen max-w-screen md:max-w-screen-lg">
     {tabledata ? 
      <Table data={tabledata}/> : <Spinner/>
     }
     </div>
      
    </div>
  )
}
