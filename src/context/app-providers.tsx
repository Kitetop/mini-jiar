import { AuthProvider } from './auth-context';

import type { ReactNode } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
