import { http, REQUEST_METHODS } from 'lib';

import type { XBaseResponseWithMsg, XUserInfoAttr } from '@kite/jira-server';

// 可供系统直接读取的用户属性
export type ILoginUser = Omit<XUserInfoAttr, 'id' | 'password'>;

/**
 * 用户登陆请求接口
 * @param data
 * @returns
 */
export async function loginApi(data: Omit<XUserInfoAttr, 'id'>) {
  return http<ILoginUser>('login', {
    method: REQUEST_METHODS.POST,
    data
  });
}
/**
 * 用户注册请求接口
 * @param data
 * @returns
 */
export async function registerApi(data: Omit<XUserInfoAttr, 'id'>) {
  return http<XBaseResponseWithMsg>('register', {
    method: REQUEST_METHODS.POST,
    data
  });
}
