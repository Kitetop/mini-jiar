import qs from 'qs';

export function stringifyParams<T = { [K: string]: unknown }>(params: T) {
  return qs.stringify(params);
}
