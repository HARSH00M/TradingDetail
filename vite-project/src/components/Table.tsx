import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

// Define the data type
[
  "acquirerdisposer",
  "acquisitiondatefrom",
  "acquisitiondateto",
  "broadcastdatetime",
  "categoryofperson",
  "company",
  "derivativecontractspecification",
  "derivativetypesecurity",
  "exchange",
  "id",
  "intimationdate",
  "modeofacquisition",
  "notionalvaluebuy",
  "notionalvaluesell",
  "numofsecurityacquireddisposed",
  "numofsecuritypost",
  "numofsecurityprior",
  "numofunitscontractbuy",
  "numofunitscontractsell",
  "regulation",
  "remark",
  "securitytypeacquireddisposed",
  "securitytypepost",
  "securitytypeprior",
  "shareholdingpost",
  "shareholdingprior",
  "symbol",
  "transactiontype",
  "valueofsecurityacquireddisposed",
  "xbrl"
]


type DataType = {
  acquirerdisposer : string,
acquisitiondatefrom : string,
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
        accessorKey: 'acquirerdisposer',
        header: 'Acquirer/Disposer Name',
      },
      {
        accessorKey: 'categoryofperson',
        header: 'Category of Person',
      },
      {
        accessorKey: 'numofsecurityprior',
        header: 'No. of Securities Prior',
      },
      
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
        header: 'Value of Securities Acquired/Disposed',
      },
      {
        accessorKey: 'acquisitiondatefrom',
        header: 'Allotment/Acquisition Date From',
      },
      {
        accessorKey: 'acquisitiondateto',
        header: 'Allotment/Acquisition Date To',
      },
      {
        accessorKey: 'transactiontype',
        header: 'Transaction Type',
      },
      {
        accessorKey: 'numofsecuritypost',
        header: 'No. of Securities Post',
      },
      {
        accessorKey: 'shareholdingpost',
        header: 'Post Shareholding (%)',
      },
      {
        accessorKey: 'modeofacquisition',
        header: 'Mode of Acquisition',
      },
      {
        accessorKey: 'intimationdate',
        header: 'Initmation To Company Date',
      }

    ],
    [] // Empty dependency array ensures this only runs once
  );

 
  return <MaterialReactTable
      columns={columns}
      data={data} // Directly pass the data
      enableSorting // Enable column sorting
      enablePagination // Enable pagination
    />
};

export default Table;
