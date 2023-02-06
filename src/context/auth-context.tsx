import { createContext, useState, type ReactNode } from 'react';
import { getUserInfoByTokenApi, loginApi, registerApi, type ILoginUser } from 'api';
import { useLocalStorageState, useMount } from 'hooks';

import type { XUserInfoAttr } from '@kite/jira-server';

// AuthContext提供给下层组件的value类型
export interface IAuthContextValue {
  user: ILoginUser | null;
  login: (userInfo: Omit<XUserInfoAttr, 'id'>) => Promise<void>;
  register: (registerInfo: Omit<XUserInfoAttr, 'id'>) => Promise<void>;
  logout: () => void;
}

export const AUTH_KEY = 'JIAR_TOKEN';

export const AuthContext = createContext<IAuthContextValue | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 系统全局的用户信息
  const [loginUser, setLoginUser] = useState<ILoginUser | null>(null);

  const [token, updateUserToken] = useLocalStorageState<string | undefined>(AUTH_KEY);

  /**
   * 用户登陆接口
   * @param userInfo
   * @returns
   */
  const login = (userInfo: Omit<XUserInfoAttr, 'id'>) => {
    return loginApi(userInfo)
      .then(user => {
        updateUserToken(user.token);
        setLoginUser(user);
      })
      .catch(({ message = '' }) => {
        message && alert(message);
      });
  };

  /**
   * 用户注册接口
   * @param registerInfo
   * @returns
   */
  const register = (registerInfo: Omit<XUserInfoAttr, 'id'>) => {
    return registerApi(registerInfo)
      .then(({ message }) => alert(message))
      .catch(({ message }) => alert(message));
  };

  /**
   * 用户登出接口
   */
  const logout = () => {
    setLoginUser(null);
  };

  /**
   * Mount的时候如果有token那么要用token信息去取得最新的用户信息
   */
  useMount(() => {
    if (token) {
      getUserInfoByTokenApi(token).then(setLoginUser);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user: loginUser,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
