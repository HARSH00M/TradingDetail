import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

// Define the data type
type DataType = {
  symbol: string;
  company: string;
  acquirer_disposer_name: string;
  category_of_person: string;
  no_of_security_prior: string;
  shareholding_prior_percentage: string;
  no_of_securities_acquired_disposed: string;
  value_of_security_acquired_disposed: string;
  transaction_type: string;
  type_of_security_post: string;
  no_of_security_post: string;
  post_shareholding_percentage: string;
  allotment_acquisition_date_from: string;
  allotment_acquisition_date_to: string;
  initmation_to_company_date: string;
  mode_of_acquisition: string;
  exchange: string;
  broadcast_date_time: string;
};

// Table component
const Table = ({ data }: { data: DataType[] }) => {
  // Memoize columns to avoid unnecessary re-renders
  const columns = useMemo<MRT_ColumnDef<DataType>[]>(
    () => [
      {
        accessorKey: 'acquirer_disposer_name',
        header: 'Acquirer/Disposer Name',
      },
      {
        accessorKey: 'category_of_person',
        header: 'Category of Person',
      },
      {
        accessorKey: 'no_of_security_prior',
        header: 'No. of Securities Prior',
      },
      {
        accessorKey: 'shareholding_prior_percentage',
        header: 'Shareholding Prior (%)',
      },
      {
        accessorKey: 'no_of_securities_acquired_disposed',
        header: 'No. of Securities Acquired/Disposed',
      },
      {
        accessorKey: 'allotment_acquisition_date_from',
        header: 'Allotment/Acquisition Date From',
      },
      {
        accessorKey: 'allotment_acquisition_date_to',
        header: 'Allotment/Acquisition Date To',
      },
      {
        accessorKey: 'transaction_type',
        header: 'Transaction Type',
      },
      {
        accessorKey: 'no_of_security_post',
        header: 'No. of Securities Post',
      },
      {
        accessorKey: 'post_shareholding_percentage',
        header: 'Post Shareholding (%)',
      },
      {
        accessorKey: 'mode_of_acquisition',
        header: 'Mode of Acquisition',
      },
      {
        accessorKey: 'initmation_to_company_date',
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
