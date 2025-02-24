import React from 'react';
import { AppRoutes } from 'routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'providers/authprovider';
import { Toast } from 'components/UI/toaster';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
