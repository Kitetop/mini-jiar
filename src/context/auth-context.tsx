import { createContext, useState } from 'react';

import type { XUserInfoAttr } from '@kite/jira-server';
import type { ReactNode } from 'react';

// 可供系统直接读取的用户属性
type ILoginUser = Omit<XUserInfoAttr, 'id' | 'password'>;
// AuthContext提供给下层主见的value类型
export interface IAuthContextValue {
  user: ILoginUser | null;
  login: (userInfo: Omit<XUserInfoAttr, 'id'>) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextValue | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 系统全局的用户信息
  const [loginUser, setLoginUser] = useState<ILoginUser | null>(null);

  /**
   * 用户登陆接口
   * @param userInfo
   * @returns
   */
  const login = (userInfo: Omit<XUserInfoAttr, 'id'>) => {
    return fetch('login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }).then(async response => {
      if (response.ok) {
        const user = (await response.json()) as ILoginUser;
        // TODO: some operation with token
        return setLoginUser(user);
      }
      return Promise.reject(userInfo);
    });
  };

  /**
   * 用户登出接口
   */
  const logout = () => {
    setLoginUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: loginUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
