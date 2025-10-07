import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import MainRoutes from './components/MainRoutes';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import { useAuth } from './contexts/AuthContext';
import PageLoader from './components/PageLoader';
import ForgotPasswordPage from './pages/ForgotPassword';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      {/* Public routes that are inaccessible when logged in */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />} />
      <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPasswordPage />} />
      
      {/* All other routes are protected */}
      <Route path="/*" element={
        <ProtectedRoute>
          <Layout>
            <MainRoutes />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
