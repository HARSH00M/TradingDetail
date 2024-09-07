
import { useLocation } from "react-router-dom";
import { searchBySym } from "../services/search";
import { Navigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import CompanyProfile from "../components/companyProfile";

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


  console.log(data)


  return (
    <div>

      <div>
        <CompanyProfile company={comp!} symbol={sym!} />
      </div>

      <div>
        {isLoading ? <div>Loading...</div> : null}
        {data ? <div className="mt-8"><Table data={data} /></div> : null}
        {error ? <div>Error: {error?.message}</div> : null}
      </div>
    </div>
  )
}
