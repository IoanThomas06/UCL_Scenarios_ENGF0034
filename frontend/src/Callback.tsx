import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the code from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      if (!email) {
        console.error('Authentication error');
        navigate('/');
        return;
      }
      else{
        console.log(email);
        login(email);
        navigate('/');
      }
    };
    handleCallback();
  }, [navigate, login]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Processing login...</span>
      </div>
    </div>
  );
};

export default Callback;