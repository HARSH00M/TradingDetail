import { useEffect, useState } from "react"
import { applyfilter, filtervalues } from "../../../services/dashboard";
import FilterSection from "./components/filtersection";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../spinner";
import Table from './tables/Table'



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
    refetchOnWindowFocus : false,
    refetchOnMount : false
  });
  

  const {data : tabledata, isFetching, refetch} = useQuery({
    queryKey : ['table'], 
    queryFn : () => applyfilter({from : state.fromdate, to : state.todate, securitytype : state.securitytype, modeofacquisition : state.modeofacquisition, transactiontype : state.transactiontype}),
    enabled : false,
  })


  useEffect(()=>{
    refetch()
  }, [])

 
  function reset(){
    setState({
    fromdate: null,
    todate: null,
    securitytype: null,
    modeofacquisition: null,
    transactiontype:  null
    })
    refetch();

  }
  function apply(){
    refetch()
  }



  return (
    <div className="md:min-h-screen shadow-md shadow-black/30 flex flex-col items-center justify-center w-full">

      <FilterSection apply={apply} reset={reset} filterstate={state} setState={setState} data={data}/>


     <div className="overflow-clip w-96 md:w-full md:overflow-x-auto md:min-w-screen  md:max-w-screen-lg">
     {tabledata ? 
      <Table data={tabledata}/> : isFetching ? <Spinner/> : null
     }
     </div>
      
    </div>
  )
}
