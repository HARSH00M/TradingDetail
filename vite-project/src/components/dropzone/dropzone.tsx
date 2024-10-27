import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';  // CSV parsing library
import axios from 'axios';     // For making API calls
import { useDropzone } from 'react-dropzone';  // Drag-and-drop library
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { saveCsvToLocalStorage, removeCsvFromLocalStorage } from '../storageUtil';  // Import storage utility
import { useNavigate } from 'react-router-dom';

// Define the structure of a CSV row (with dynamic keys)
interface CsvRow {
  [key: string]: string | number | undefined;
}


function filedetails(file : File) {
  return (
    <div className='p-4 text-gray-700'>
      <div>Name : </div>
      <div className='text-lg font-bold text-gray-700' >{file.name}</div>
      <div>Size : </div>
      <div>
        {(file.size/1000000).toPrecision(3)+' mb'}
      </div>
    </div>
  )
}

const CsvUploader: React.FC = () => {

  const navigate = useNavigate();
  const [csvData, setCsvData] = useState<CsvRow[]>([]);       // Store parsed CSV data
  const [columns, setColumns] = useState<string[]>([]);       // Store columns from CSV
  const [loader, setLoader] = useState<boolean>(false);       // Store columns from CSV
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);  // Store selected columns
  const [file, setFile] = useState<File|null>(null)

  // Handle CSV file parsing when dropped
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];  // Get the first file from the array (CSV file)
    setFile(file)
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const data = result.data as CsvRow[];
          const cols = Object.keys(data[0]);
          setCsvData(data);
          setColumns(cols);
          setSelectedColumns(cols);  // Automatically select all columns by default

          // Save the data to localStorage for persistence
          saveCsvToLocalStorage(data, cols);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        },
      });
    }
  };

  // Hook for dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple : false
  });


  // Send selected data to the backend
  const handleSubmit = () => {
    setLoader(true)

    axios.post('http://localhost:3000/tables/ifupload',
    //  { data: selectedData }
    {data : "Hello"}
     )
      .then((response) => {
        console.log('Data successfully sent to backend:', response.data);
        handleRemoveCsv();  // Clear the CSV data after sending it to the backend
        setLoader(false);
        return navigate('/history');

      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };

  // Remove CSV from the site (clear localStorage and reset states)
  const handleRemoveCsv = () => {
    removeCsvFromLocalStorage();  // Clear the cached CSV data
    setCsvData([]);               // Reset the data in the UI
    setColumns([]);
    setSelectedColumns([]);
  };

  // Check localStorage for cached CSV data on component mount
  // useEffect(() => {
  //   const cachedCsv : any = getCsvFromLocalStorage();
  //   if (cachedCsv) {
  //     setCsvData(cachedCsv.csvData);
  //     setColumns(cachedCsv.columns);
  //     setSelectedColumns(cachedCsv.columns);
  //   }
  // }, []);  // Empty dependency array ensures this only runs once on mount

  console.log(columns)
  console.log(csvData)
  // Memoized columns definition for MaterialReactTable
  const tableColumns = useMemo<MRT_ColumnDef<CsvRow>[]>(
    () => columns.map((col) => ({
      accessorKey: col,
      header: col.replace(/_/g, ' ').toUpperCase(),  // Convert column keys to a more readable format
    })),
    [columns]
  );

  if(loader){
    return <div>loading</div>
  }
  return (
    <div style={{ padding: '20px' }}>
      <h2 className='px-4 py-10 text-3xl text-gray-800 font-bold '>Upload CSV File</h2>
      
      {/* Drag-and-Drop Area */}
      <div
        {...getRootProps()}
        
        style={{
          border: '2px dashed #aaa',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: isDragActive ? '#e0f7fa' : '#f9f9f9',
        cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className=' text-gray-800 '>Drop the files here ...</p>
        ) : (
          <p className='text-gray-800  '>Drag and drop a CSV file here, or <span className='text-blue-500'>click </span>to select a file</p>
        )}
      </div>

      {file ? filedetails(file) : null}
       
      {csvData.length > 0 && (
        <div>

          <div className='w-full flex py-4 px-2 md:py-8 items-center'>
          <button onClick={handleSubmit} disabled={selectedColumns.length === 0} data-ripple-light="true" className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-500 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" >
            Submit Selected Columns
          </button>

          <button onClick={handleRemoveCsv} data-ripple-light="true" className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-500 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            Remove CSV
          </button>
            </div>
          <h3 className='px-4 py-2 text-2xl text-gray-800 font-bold' >CSV Data Preview</h3>
          <MaterialReactTable
            columns={tableColumns}
            data={csvData}  // Directly pass the parsed CSV data
            enableSorting    // Enable sorting functionality
            enablePagination // Enable pagination functionality
          />
        </div>
      )}
    </div>
  );
};

export default CsvUploader;