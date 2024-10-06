import CompanyApexChart from "../components/home/dashboard/companywise";
import IndustryApexChart from "../components/home/dashboard/industrywise";
import SectorApexChart from "../components/home/dashboard/sectorwise";
import FilterBoard from "../components/home/FilterBoard/main";
import Search from "../components/search/search";
// import Table from "../components/Table";

export default function Home() {
  

  


  
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <h1 className="text-4xl font-semibold font-serif">Site Name</h1>
      <Search />
      
      <div className="grid grid-cols-2 gap-5 p-5">
          <IndustryApexChart/>
          <SectorApexChart/>
          <CompanyApexChart/>
      </div>
      <div>
        <FilterBoard/>
      </div>
      <div>
      </div>
    </div>
  );
}
