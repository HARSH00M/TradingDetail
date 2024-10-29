import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
import NotFound from './pages/notfound';
// import Layout from './pages/layout';
import Allcompanies from './pages/companies';
// import ProtectedRoute from './components/auth/protected';
// import AuthProvider  from './components/auth/useAuth';
import Login from './pages/login';
import Layout from './pages/layout';
//import CsvUploader from './components/upload/upload';
import Uploadhistory from './pages/uploadhistory';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}> */}
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/allcompanies" element={<Allcompanies />} />
          {/* <Route path="/test" element={<CsvUploader/>} /> */}
          <Route path="/history" element={<Uploadhistory/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};

export default App;
