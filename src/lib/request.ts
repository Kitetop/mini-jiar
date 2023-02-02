import qs from 'qs';

interface IRequestOptions extends RequestInit {
  token?: string;
  data?: Record<string | number, unknown>;
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
export async function http<T>(url: string, { token, data, ...other }: IRequestOptions): Promise<T> {
  const baseConfig = {
    method: REQUEST_METHODS.GET,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...other
  };

  if (baseConfig.method.toUpperCase() === REQUEST_METHODS.GET) {
    url += `?${stringifyParams(data)}`;
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
