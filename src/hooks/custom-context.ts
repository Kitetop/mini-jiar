import { useContext } from 'react';
import { isEmpty } from '@kite/utils';
import { AuthContext } from 'context/auth-context';

import type { Context } from 'react';

/**
 * 获得自定义Context的工厂方法
 * @param context
 * @returns
 */
function useCustomContext<T>(context: Context<T>): NonNullable<T> {
  const c = useContext(context);
  if (!isEmpty(c)) {
    return <NonNullable<T>>c;
  }
  throw new Error('This context is not Exist!');
}

// 用户信息相关的Context
export const useAuth = () => useCustomContext(AuthContext);
