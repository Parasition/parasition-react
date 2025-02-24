import { useContext } from 'react';
import { AuthContext } from 'providers/authprovider';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth context must be with in the inside the auth provider'
    );
  }
  return context;
};

export { useAuthContext };
