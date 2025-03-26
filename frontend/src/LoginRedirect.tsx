import { useEffect } from 'react';

const LoginRedirect = () => {
  useEffect(() => {
    // Redirect to Django backend login endpoint
    window.location.href = 'http://127.0.0.1:8000/api/login/';
  }, []);

  return (
    <>
        <h1>Redirecting...</h1>
    </>
  );
};

export default LoginRedirect;