import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

type DataType = {
  // Define all necessary fields here
  company: string;
  symbol: string;
  acquirerdisposer: string;
  shareholdingprior: string;
  numofsecurityacquireddisposed: string;
  valueofsecurityacquireddisposed: string;
  transactiontype: string;
  formatted_acquisitiondatefrom: string;
  formatted_acquisitiondateto: string;
  formatted_intimationdate: string;
  modeofacquisition: string;
  industry: string;
};

const Table = ({ data }: { data: DataType[] }) => {
  const columns = useMemo<MRT_ColumnDef<DataType>[]>(
    () => [
      { accessorKey: 'company', header: 'Company' },
      { accessorKey: 'symbol', header: 'Symbol' },
      { accessorKey: 'acquirerdisposer', header: 'Acquirer/Disposer Name' },
      { accessorKey: 'shareholdingprior', header: 'Shareholding Prior (%)' },
      { accessorKey: 'numofsecurityacquireddisposed', header: 'No. of Securities Acquired/Disposed' },
      { accessorKey: 'valueofsecurityacquireddisposed', header: 'Value of Securities Acquired/Disposed(Rs.)' },
      { accessorKey: 'transactiontype', header: 'Acquisition/Disposed Type' },
      { accessorKey: 'formatted_acquisitiondatefrom', header: 'Allotment/Acquisition Date From' },
      { accessorKey: 'formatted_acquisitiondateto', header: 'Allotment/Acquisition Date To' },
      { accessorKey: 'formatted_intimationdate', header: 'Intimation To Company Date' },
      { accessorKey: 'modeofacquisition', header: 'Mode of Acquisition' },
      { accessorKey: 'industry', header: 'Industry' },
    ],
    []
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableSorting
        enablePagination
        enableFullScreenToggle
      />
    </div>
  );
};

export default Table;
