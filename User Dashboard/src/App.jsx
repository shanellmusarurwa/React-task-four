import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RegistrationProvider } from './context/RegistrationContext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalInfo from './pages/PersonalInfo';
import AddressSearch from './pages/AddressSearch';
import AddressDetails from './pages/AddressDetails';
import RegistrationSuccess from './pages/RegistrationSuccess';
import Dashboard from './pages/Dashboard';
import './styles/main.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RegistrationProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
  
         {/* Registration Flow - Protected */}
          <Route path="/personal-info" element={<PrivateRoute><PersonalInfo /></PrivateRoute>} />
          <Route path="/address-search" element={<PrivateRoute><AddressSearch /></PrivateRoute>} />
          <Route path="/address-details" element={<PrivateRoute><AddressDetails /></PrivateRoute>} />
          <Route path="/registration-success" element={<PrivateRoute><RegistrationSuccess /></PrivateRoute>} />
  
        {/* Protected Dashboard */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
        </RegistrationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;