/**
 * 主要包含数据类型判断、处理的方法
 */
import {
  isEmpty as _isEmpty,
  isNil,
  isUndefined,
  isObject,
  isString,
  isFunction,
  isArray,
  inRange,
  cloneDeep,
  extend,
  merge,
  omitBy
} from 'lodash-es';

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

export {
  isString,
  isUndefined,
  isNil,
  isObject,
  isFunction,
  isArray,
  inRange,
  cloneDeep,
  extend,
  merge,
  omitBy
};
