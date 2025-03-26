import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginRedirect = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
          // Get the code from URL parameters
          logout();
          navigate('/');
        };
        handleCallback();
      }, [navigate, logout]);

  return (
    <>
        <h1>Logging out...</h1>
    </>
  );
};

export default LoginRedirect;