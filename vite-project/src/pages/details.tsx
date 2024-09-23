
import { useLocation } from "react-router-dom";
import { searchBySym } from "../services/search";
import { Navigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import CompanyProfile from "../components/CompanyProfile/companyProfile";
import Spinner from "../components/spinner";
import NewCompanyProfile from "../components/CompanyProfile/newCompanyProfile";

export default function Details({ }) {
  const location = useLocation();

  // Create an instance of URLSearchParams to extract query parameters
  const searchParams = new URLSearchParams(location.search);

  // Extract specific query parameters
  const sym = searchParams.get('sym');
  const comp = searchParams.get('comp');


  const checkInp = sym && comp ? true : false;

  if (!checkInp) {
    return <Navigate to="/not-found" />;
  }
  // React Query hook for fetching data dynamically

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchBySym', sym, comp],
    queryFn: () => searchBySym(sym!, comp!), // Fetching function
  }
  );



  return (
    <div  className="h-full">

      <div>
      {isLoading ? <Spinner/>: null}

        {data && data.stock ? <NewCompanyProfile data={data?.stock} name={comp}/> : null}
        {data && !data.stock ? <CompanyProfile company={comp!} symbol={sym!} /> : null}

        
      </div>

      <div className="md:px-8 px-2 ">
        {data ? <div className="mt-8"><Table data={data.promoters} /></div> : null}
        {error ? <div>Error: {error?.message}</div> : null}
      </div>
    </div>
  )
}
