import { useEffect, useRef, useState } from "react"
import { applyfilter} from "../../../services/dashboard";
// import { applyfilter, filtervalues } from "../../../services/dashboard";
import FilterSection from "./components/filtersection";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../spinner";
import Table from './tables/Table'
import toast from "react-hot-toast";
import selected_date from "./components/selected_date";



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

  // const { data } = useQuery({
  //   queryKey: ['filtervalues'],
  //   queryFn: () => filtervalues(),
  //   refetchOnWindowFocus : false,
  //   refetchOnMount : false
  // });
  

  const {data : tabledata, isFetched, refetch} = useQuery({
    queryKey : ['table'], 
    queryFn : () => applyfilter({
      fromdate : state.fromdate, 
      todate : state.todate, 
      securitytype : state.securitytype, 
      modeofacquisition : state.modeofacquisition, 
      transactiontype : state.transactiontype,
      fromamount : fromAmountRef.current ? fromAmountRef.current.value : null,
      toamount : toAmountRef.current ? toAmountRef.current.value : null,
    }),
    enabled : false,
  })

 

  useEffect(() => {
    if (
      state.fromdate === null &&
      state.todate === null &&
      state.securitytype === null &&
      state.modeofacquisition === null &&
      state.transactiontype === null
    ) {
      // Call refetch after the state has been fully reset
      refetch();
    }
  }, [state]); 

 
  function reset(){
    setState({
    fromdate: null,
    todate: null,
    securitytype: null,
    modeofacquisition: null,
    transactiontype:  null
    })

    toast.success("filter reset", { position : 'bottom-right', iconTheme : {
      primary: '#000',
      secondary: '#fff',
    } })

    if(fromAmountRef.current)
    fromAmountRef.current.value = '';
    if(toAmountRef.current)
    toAmountRef.current.value = '';
  

  }
  function apply(){
    refetch()
  }


  const fromAmountRef = useRef<HTMLInputElement>(null);
  const toAmountRef = useRef<HTMLInputElement>(null);

    



  return (
    <div className="md:min-h-screen shadow-md shadow-black/30 flex flex-col items-center justify-center w-full">

      {/* <FilterSection apply={apply} reset={reset} filterstate={state} setState={setState} data={data}/> */}
      <FilterSection apply={apply} reset={reset}  setState={setState} toamountref={toAmountRef} fromamountref={fromAmountRef} />
    

     {tabledata?.between  ? selected_date(tabledata.between[0], tabledata.between[1]) : null}

     <div className="overflow-clip w-96 md:w-full md:overflow-x-auto md:min-w-screen  md:max-w-screen-lg">
     {tabledata?.data ? 
      <Table data={tabledata?.data}/> : isFetched ? <Spinner/> : null
     }
     </div>
      
    </div>
  )
}
