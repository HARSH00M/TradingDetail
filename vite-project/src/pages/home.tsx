import CompanyApexChart from "../components/home/dashboard/companywise";
import IndustryApexChart from "../components/home/dashboard/industrywise";
import SectorApexChart from "../components/home/dashboard/sectorwise";
import FilterBoard from "../components/home/FilterBoard/main";
import Search from "../components/search/search";
// import Table from "../components/Table";

export default function Home() {


  
  return (
    <div className="flex min-h-screen justify-center items-center flex-col mb-20 md:mb-0 ">
      <h1 className="text-4xl font-semibold font-serif">Filytics</h1>
      <Search />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 justify-center items-center">
          <IndustryApexChart/>
          <SectorApexChart/>
          <CompanyApexChart/>
      </div>
      <div>
      <hr className='border-gray-300 my-12' />
        <FilterBoard/>
      </div>
      <div>
      </div>
    </div>
  );
}
