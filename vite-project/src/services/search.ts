// Description: This file contains the services to fetch data from the API.


export const AllCompanies = async (page: number) => {
        try {
          let url = `${import.meta.env.VITE_API_URL}/allcompanies`;
      
          // Check if both `from` and `to` are non-empty strings
          if (page>=0) {
            url += `?page=${page}`;
          }
      
          const response = await fetch(url);
      
          // Check if the response is ok (status is 200-299)
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
      
          // Parse the JSON data
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching companies:", error);
          // You can return a default value or rethrow the error depending on your use case
          return null;
        }
      };


export const searchAutoComplete = (name: string) => {
        if (name !== '')
                return fetch(`${import.meta.env.VITE_API_URL}/search/${name}`).then((res) =>res.json())
        else
                return []
}


export const searchBySym = (sym: string, comp : string)  => {
        if (sym !== '')
                return fetch(`${import.meta.env.VITE_API_URL}/find?symbol=${encodeURIComponent(sym)}&company=${encodeURIComponent(comp)}`).then((res) =>res.json())
        else
                return []
}

