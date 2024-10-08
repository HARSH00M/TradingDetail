import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { dashboard } from "../../../services/dashboard";
import formatCrores from '../../utilities/formatCrores';



const SectorApexChart = () => {


  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboard(),
  });

  

  // Ensure data exists and has data2
  if (!data || !data.data2 || !Array.isArray(data.data2)) {
    return <div>No data available</div>;
  }


  // Prepare data for the chart
  const categories = data.data2.map((item: any) => item.sector);
  const series = data.data2.map((item: any) => formatCrores(item.total_value));


  // Define the options for ApexChart
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      width : 500
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories.slice(0,7),
    }
  };

  // Format the series data
  const formattedSeries = [{name : "transactions", data: series.slice(0,7) }];

  // Check if the data is valid
  const isSeriesValid = Array.isArray(formattedSeries) && formattedSeries.length > 0 && formattedSeries[0].data.length > 0;
  const isCategoriesValid = Array.isArray(categories) && categories.length > 0;

  // If both series and categories are valid, render the chart
  return (
    <div>
      {isSeriesValid && isCategoriesValid ? (
        <ReactApexChart 
          options={options} 
          series={formattedSeries} 
          type="bar" 
          height={350} 
          width={500}
        />
      ) : (
        <p>No data available for the chart.</p>
      )}
    </div>
  );
}

export default SectorApexChart;
