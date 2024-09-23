import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';  // CSV parsing library
import axios from 'axios';     // For making API calls
import { useDropzone } from 'react-dropzone';  // Drag-and-drop library
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { saveCsvToLocalStorage, getCsvFromLocalStorage, removeCsvFromLocalStorage } from './storageUtil';  // Import storage utility
import CheckboxCard from './checkboxCard';

// Define the structure of a CSV row (with dynamic keys)
interface CsvRow {
  [key: string]: string | number | undefined;
}

const CsvUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);       // Store parsed CSV data
  const [columns, setColumns] = useState<string[]>([]);       // Store columns from CSV
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);  // Store selected columns

  // Handle CSV file parsing when dropped
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];  // Get the first file from the array (CSV file)

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
  });

  // Handle column selection/deselection
  const handleColumnSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const columnName = event.target.value;
    const isSelected = selectedColumns.includes(columnName);

    // Toggle column selection
    if (isSelected) {
      setSelectedColumns(selectedColumns.filter(col => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Send selected data to the backend
  const handleSubmit = () => {
    const selectedData = csvData.map(row => {
      const filteredRow: CsvRow = {};
      selectedColumns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    axios.post('/api/upload-csv', { data: selectedData })
      .then((response) => {
        console.log('Data successfully sent to backend:', response.data);
        handleRemoveCsv();  // Clear the CSV data after sending it to the backend
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
  useEffect(() => {
    const cachedCsv : any = getCsvFromLocalStorage();
    if (cachedCsv) {
      setCsvData(cachedCsv.csvData);
      setColumns(cachedCsv.columns);
      setSelectedColumns(cachedCsv.columns);
    }
  }, []);  // Empty dependency array ensures this only runs once on mount

  // Memoized columns definition for MaterialReactTable
  const tableColumns = useMemo<MRT_ColumnDef<CsvRow>[]>(
    () => columns.map((col) => ({
      accessorKey: col,
      header: col.replace(/_/g, ' ').toUpperCase(),  // Convert column keys to a more readable format
    })),
    [columns]
  );

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

      {csvData.length > 0 && (
        <div>
          <h3 className='px-4 py-10 text-4xl text-gray-800 font-bold '>Deselect Columns to Send to Backend</h3>
          <form className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
            {columns.map((col) => (
              <CheckboxCard key={col}>
                <label className='flex gap-x-7 mx-4 items-center w-full'>
                  <input
                  className='form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 transition duration-150 ease-in-out'
                    type="checkbox"
                    value={col}
                    checked={selectedColumns.includes(col)}  // Check if the column is selected
                    onChange={handleColumnSelection}
                  />
                  {col}
                </label>
              </CheckboxCard>
            ))}
          </form>

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
