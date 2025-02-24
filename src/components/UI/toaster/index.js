import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  const successStyle = {
    background: 'green',
    color: '#fff',
    border: '1px solid green',
    borderRadius: '8px',
    padding: '16px',
  };

  const errorStyle = {
    background: 'red',
    color: '#fff',
    border: '1px solid red',
    borderRadius: '8px',
    padding: '16px',
  };

  return (
    <Toaster
      toastOptions={{
        success: {
          style: successStyle,
        },
        error: {
          style: errorStyle,
        },
      }}
      position="bottom-center"
    />
  );
};

export { Toast };
