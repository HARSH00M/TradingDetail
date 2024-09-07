export const Authenticate = async (email : string, password : string) => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/auth?email=${email}&password=${password}`;
  
      // Check if both `from` and `to` are non-empty strings
      
  
      const response = await fetch(url);
  
      // Check if the response is ok (status is 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
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
