// Utility file for handling localStorage operations

const CSV_KEY = 'cachedCsvData';
const COLUMNS_KEY = 'cachedCsvColumns';

// Function to save CSV data and columns to localStorage
export const saveCsvToLocalStorage = (csvData: object[], columns: string[]) => {
  localStorage.setItem(CSV_KEY, JSON.stringify(csvData));
  localStorage.setItem(COLUMNS_KEY, JSON.stringify(columns));
};

// Function to get cached CSV data from localStorage
export const getCsvFromLocalStorage = (): { csvData: object[]; columns: string[] } | null => {
  const csvData = localStorage.getItem(CSV_KEY);
  const columns = localStorage.getItem(COLUMNS_KEY);

  if (csvData && columns) {
    return {
      csvData: JSON.parse(csvData),
      columns: JSON.parse(columns),
    };
  }

  return null; // Return null if no data is found
};

// Function to remove cached CSV data from localStorage
export const removeCsvFromLocalStorage = () => {
  localStorage.removeItem(CSV_KEY);
  localStorage.removeItem(COLUMNS_KEY);
};
