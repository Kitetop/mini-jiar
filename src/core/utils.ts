import { isEmpty as _isEmpty, isNil, isObject, isString, omitBy, cloneDeep } from 'lodash-es';

/**
 * 排除callback返回值为true的值
 * @param value
 * @param callback
 * @returns
 */
export function omitEmptyObjectValue(
  value: object,
  callback: (value: unknown, key?: string) => boolean
) {
  return omitBy(value, callback);
}

/**
 * 判断value是否为空
 * @param value
 * @returns
 */
export function isEmpty(value: unknown) {
  if (isString(value)) return !value;

  if (isObject(value)) return _isEmpty(value);

  return isNil(value);
}

export { cloneDeep, isString, isObject };
