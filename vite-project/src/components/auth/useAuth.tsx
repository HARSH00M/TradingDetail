import { useState, useContext, createContext } from 'react';

// Create a context for authentication
export const AuthContext = createContext<boolean>(false);

export const useAuth = () => useContext(AuthContext);


type Props = {
    children: string | JSX.Element | JSX.Element[] 
  }

const AuthProvider = ({ children } : Props) => {
  
  
const user = localStorage.getItem('user')
const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);
  if(user){
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
