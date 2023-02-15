import { isEmpty, omitBy } from './lodash';

export function omitObjectValueByFunc(
  value: object,
  callback: (value: unknown, key?: string) => boolean
) {
  return omitBy(value, callback);
}

/**
 * 排除callback返回值为true的值
 * @param value
 * @param callback
 * @returns
 */
export function omitEmptyObjectValue(value: object) {
  return omitObjectValueByFunc(value, v => isEmpty(v));
}
