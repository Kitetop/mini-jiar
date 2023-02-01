import { useContext } from 'react';
import { AuthContext } from 'context/auth-context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }
  throw new Error('This context is not Exist!');
};
