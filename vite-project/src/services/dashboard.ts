import toast from "react-hot-toast";

type filterparameters = {
  fromdate : string | null,
  todate : string | null, 
  fromamount : string | null,
  toamount : string | null, 
  securitytype : string | null,
  modeofacquisition : string | null,
  transactiontype : string | null
} 




export const dashboard = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/insider/dashboard`;
  
      // Check if both `from` and `to` are non-empty strings
      
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

export const filtervalues = async () => {
  try {
    let url = `${import.meta.env.VITE_API_URL}/insider/filtervalues`;

    // Check if both `from` and `to` are non-empty strings
    
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

export const applyfilter = async (params : filterparameters ) => {
  try {

    var url = `${import.meta.env.VITE_API_URL}/insider/companywise`;

    // Check if both `from` and `to` are non-empty strings
    
    const promise = fetch(url, {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(params),
    });

    const response  = await toast.promise(promise,
      {
        loading: 'loading...',
        success: 'Data fetched successfully!',
        error: 'Failed to fetch!',
      },)
    
    
    // Check if the response is ok (status is 200-299)
    if (!response.ok) {
      toast.error("Error in Fetching", {position : 'bottom-center', duration : 4000});
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
