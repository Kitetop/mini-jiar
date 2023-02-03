import { useAuth } from './custom-context';

import type { IRequestOptions } from 'lib';

// 仅仅只是需要传递auth
export function useClientWithAuth<T, P>(
  api: (extralOptions: IRequestOptions<P>) => Promise<T>
): () => Promise<T>;
// 需要传递参数和auth
export function useClientWithAuth<T, P>(
  api: (data: P, extralOptions: IRequestOptions<P>) => Promise<T>
): (data: P) => Promise<T>;

/**
 * 携带用户token的请求
 *
 * 适用于组件本身对Auth信息没有需求，只是api请求需要用户信息时使用
 * 若组件本身已经使用了Auth信息，那么可以直接调用封装的api方法
 * @param api
 * @returns
 */
export function useClientWithAuth<T, P>(
  api: (data: P, extralOptions: IRequestOptions) => Promise<T>
) {
  const { user } = useAuth();
  /**
   * 函数的length代表参数个数
   * 使用参数的个数来区分重载
   */
  if (api.length === 1)
    return () => (<(extralOptions: IRequestOptions) => Promise<T>>api)({ token: user?.token });

  return (data: P) => api(data, { token: user?.token });
}
