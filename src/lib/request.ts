import qs from 'qs';

export type IRequestOptionsData = Record<string | number, unknown>;
export interface IRequestOptions<T = IRequestOptionsData> extends RequestInit {
  token?: string;
  data?: T;
}

export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST'
}

export function stringifyParams<T = { [K: string]: unknown }>(params: T) {
  return qs.stringify(params);
}

/**
 * 向后端请求数据
 * @param url
 * @param param
 * @returns
 */
export async function http<T, P = IRequestOptionsData>(
  url: string,
  { token, data, ...other }: IRequestOptions<P>
): Promise<T> {
  const baseConfig = {
    method: REQUEST_METHODS.GET,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...other
  };

  if (baseConfig.method.toUpperCase() === REQUEST_METHODS.GET) {
    url += data ? `?${stringifyParams(data)}` : '';
  } else {
    baseConfig.body = JSON.stringify(data || {});
  }

  return fetch(url, baseConfig).then(async res => {
    if (res.status === 401) {
      // TODO: 清除token
    }
    const result: T = await res.json();
    if (res.ok) return result;
    return Promise.reject(result);
  });
}
