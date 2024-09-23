import ApexChart from "../components/dashboard/chart";
import Search from "../components/search/search";

export default function Home() {
  
  


  
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <h1 className="text-4xl font-semibold font-serif">Site Name</h1>
      <Search />
      
      <div className="grid grid-cols-3 gap-5 p-5">
          <ApexChart />
        <p>Search by Company</p>
      </div>
    </div>
  );
}
