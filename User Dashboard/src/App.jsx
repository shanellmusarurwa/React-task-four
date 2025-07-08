
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RegistrationProvider } from './context/RegistrationContext';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
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
          {/* Public Registration Flow */}
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/address-search" element={<AddressSearch />} />
              <Route path="/address-details" element={<AddressDetails />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Dashboard */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Fallback Routes */}
            <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
        </RegistrationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
