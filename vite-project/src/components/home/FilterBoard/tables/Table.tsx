import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
// Define the data type



type DataType = {
  bsecode: string;
  changeindiiholdings1year: string;
  changeinfiiholdings1year: string;
  changeinpromoterholdings1year: string;
  latest_acquisition_date:string;
  closeprice: string;
  company: string;
  debttoequity: string;
  debttoequity3yearsback: string;
  evtoebitda: string;
  fiftytwowhdistance: string;
  fiftytwowl: string;
  fixedassets3yearsback: string;
  fixedassetslatestyear: string;
  holding_difference: string;
  industry: string;
  marketcapitalization: string;
  nsesymbol: string;
  patgrowthqoq: string;
  patgrowthttm: string;
  pbtgrowthttm: string;
  pricetobookvalue: string;
  pricetoearnings: string;
  pricetosales: string;
  promoterholdings: string;
  returns1m: string;
  returns1w: string;
  returns3m: string;
  returns6m: string;
  revenuegrowthttm: string;
  roce: string;
  sector: string;
  sma20d: string;
  strengthvsnifty500monthly: string;
  strengthvsnifty500weekly: string;
  symbol: string;
  total_shareholdingpost: string;
  total_shareholdingprior: string;
  totalnumofsecurity: string;
  totalvalueofsecurity: string;
  _id: string;
};



// Table component
const Table = ({ data }: { data: DataType[] }) => {
  // Memoize columns to avoid unnecessary re-renders

  console.log("data : ", data?.slice(0,1))
  const columns = useMemo<MRT_ColumnDef<DataType>[]>(
    () => [
      {
          accessorKey: 'company',
          header: 'Company',
      },
      {
          accessorKey: 'symbol',
          header: 'Symbol',
      },
      {
          accessorKey: 'promoterholdings',
          header: 'Promoter Holdings (%)',
      },
      {
          accessorKey: 'latest_acquisition_date',
          header: 'Last Acquisition Date',
      },
      {
          accessorKey: 'total_shareholdingprior',
          header: 'Shareholding Prior (%)',
      },
      {
          accessorKey: 'total_shareholdingpost',
          header: 'Shareholding Post (%)',
      },
      {
          accessorKey: 'totalnumofsecurity',
          header: 'No. of Securities Acquired/Disposed',
      },
      {
          accessorKey: 'totalvalueofsecurity',
          header: 'Value of Securities Acquired/Disposed (Rs.)',
      },
      {
          accessorKey: 'strengthvsnifty500monthly',
          header: 'Strength vs Nifty500 (Monthly)',
      },
      {
          accessorKey: 'strengthvsnifty500weekly',
          header: 'Strength vs Nifty500 (Weekly)',
      },
      {
          accessorKey: 'debttoequity',
          header: 'Debt to Equity',
      },
      {
          accessorKey: 'industry',
          header: 'Industry',
      },
      {
          accessorKey: 'marketcapitalization',
          header: 'Market Capitalization',
      },
      {
          accessorKey: 'pricetoearnings',
          header: 'Price to Earnings',
      },
      {
          accessorKey: 'pricetobookvalue',
          header: 'Price to Book Value',
      },
      {
          accessorKey: 'roce',
          header: 'Return on Capital Employed (%)',
      },
      {
          accessorKey: 'revenuegrowthttm',
          header: 'Revenue Growth (TTM)',
      },
      {
          accessorKey: 'closeprice',
          header: 'Close Price',
      },
      {
          accessorKey: 'changeindiiholdings1year',
          header: 'Change in Iii Holdings (1 Year)',
      },
      {
          accessorKey: 'changeinfiiholdings1year',
          header: 'Change in FII Holdings (1 Year)',
      },
      {
          accessorKey: 'changeinpromoterholdings1year',
          header: 'Change in Promoter Holdings (1 Year)',
      },
      {
          accessorKey: 'fiftytwowl',
          header: 'Fifty-Two Week Low',
      },
      {
          accessorKey: 'fiftytwowhdistance',
          header: 'Fifty-Two Week High Distance',
      },
      {
          accessorKey: 'fixedassets3yearsback',
          header: 'Fixed Assets (3 Years Back)',
      },
      {
          accessorKey: 'fixedassetslatestyear',
          header: 'Fixed Assets (Latest Year)',
      },
      {
          accessorKey: 'patgrowthqoq',
          header: 'PAT Growth (QoQ)',
      },
      {
          accessorKey: 'patgrowthttm',
          header: 'PAT Growth (TTM)',
      },
      {
          accessorKey: 'pbtgrowthttm',
          header: 'PBT Growth (TTM)',
      },
      {
          accessorKey: 'returns1m',
          header: 'Returns (1 Month)',
      },
      {
          accessorKey: 'returns1w',
          header: 'Returns (1 Week)',
      },
      {
          accessorKey: 'returns3m',
          header: 'Returns (3 Months)',
      },
      {
          accessorKey: 'returns6m',
          header: 'Returns (6 Months)',
      },
      {
          accessorKey: 'sma20d',
          header: 'SMA (20 Days)',
      },
      {
          accessorKey: 'evtoebitda',
          header: 'EV/EBITDA',
      },
  ],
   
    [] // Empty dependency array ensures this only runs once
  );


  const handleExportRows = (rows: any) => {
    const rowData = rows.map((row : any) => row?.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });
 
  return <MaterialReactTable
      columns={columns}
      data={data} // Directly pass the data
      enableSorting // Enable column sorting
      enablePagination // Enable pagination
      renderTopToolbarCustomActions = {({ table }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          
        </Box>
      )}
    />
};

export default Table;
