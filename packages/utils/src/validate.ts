/**
 * 主要包含数据类型判断、处理的方法
 */
import {
  isEmpty as _isEmpty,
  isNil,
  isUndefined,
  isObject,
  isString,
  omitBy,
  isFunction,
  isArray,
  inRange
} from 'lodash-es';

export function omitObjectValueByFunc(
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

/**
 * 排除callback返回值为true的值
 * @param value
 * @param callback
 * @returns
 */
export function omitEmptyObjectValue(value: object) {
  return omitObjectValueByFunc(value, v => isEmpty(v));
}

export { isString, isUndefined, isNil, isObject, isFunction, isArray, inRange };
