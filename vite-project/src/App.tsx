import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
import NoPage from './pages/nopage';
import Layout from './pages/layout';
import Allcompanies from './pages/companies';
import ProtectedRoute from './components/auth/protected';
import AuthProvider  from './components/auth/useAuth';
import Login from './pages/login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/allcompanies" element={<Allcompanies />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
