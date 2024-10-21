import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
// Define the data type



type DataType = {
  acquirerdisposer : string,
acquisitiondatefrom : string,
formatted_acquisitiondatefrom : string,
formatted_acquisitiondateto : string,
formatted_intimationdate : string,
acquisitiondateto : string,
broadcastdatetime : string,
categoryofperson : string,
company : string,
derivativecontractspecification : string,
derivativetypesecurity : string,
exchange : string,
id : string,
intimationdate : string,
modeofacquisition : string,
notionalvaluebuy : string,
notionalvaluesell : string,
numofsecurityacquireddisposed : string,
numofsecuritypost : string,
numofsecurityprior : string,
numofunitscontractbuy : string,
numofunitscontractsell : string,
regulation : string,
remark : string,
securitytypeacquireddisposed : string,
securitytypepost : string,
securitytypeprior : string,
shareholdingpost : string,
shareholdingprior : string,
symbol : string,
transactiontype : string,
valueofsecurityacquireddisposed : string,
xbrl : string
}


// Table component
const Table = ({ data }: { data: DataType[] }) => {
  // Memoize columns to avoid unnecessary re-renders

  
  console.log("data from tables", data);
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
        accessorKey: 'acquirerdisposer',
        header: 'Acquirer/Disposer Name',
      },
      // {
      //   accessorKey: 'numofsecurityprior',
      //   header: 'No. of Securities Prior',
      // },
      
      {
        accessorKey: 'shareholdingprior',
        header: 'Shareholding Prior (%)',
      },
      {
        accessorKey: 'numofsecurityacquireddisposed',
        header: 'No. of Securities Acquired/Disposed',
      },
      {
        accessorKey: 'valueofsecurityacquireddisposed',
        header: 'Value of Securities Acquired/Disposed(Rs.)',
      },
      {
        accessorKey: 'transactiontype',
        header: 'Acquisition/Disposed Type',
      },
      {
        accessorKey: 'formatted_acquisitiondatefrom',
        header: 'Allotment/Acquisition Date From',
      },
      {
        accessorKey: 'formatted_acquisitiondateto',
        header: 'Allotment/Acquisition Date To',
      },
      {
        accessorKey: 'formatted_intimationdate',
        header: 'Initmation To Company Date',
      },
      {
        accessorKey: 'modeofacquisition',
        header: 'Mode of Acquisition',
      },
      {
        accessorKey: 'industry',
        header: 'Industry',
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
