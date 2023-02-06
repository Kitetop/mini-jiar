import { useEffect, useState } from 'react';
import { isFunction, isNil } from '@kite/utils';
import { useMemoFun } from './memoFun';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export interface IFuncStorage {
  (): Storage;
}

export interface IStorgeOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  defaultValue?: T | IFuncUpdater<T>;
}

export function useLocalStorageState<T>(key: string, options?: IStorgeOptions<T>) {
  let storage: Storage | undefined;
  try {
    storage = window.localStorage;
  } catch {
    throw new Error('Can not create storage, maybe env is not support !');
  }

  /**
   * 序列化值
   * @param value
   * @returns
   */
  const serializer = (value: T) => {
    if (options?.serializer) {
      return options?.serializer(value);
    }
    return JSON.stringify(value);
  };

  /**
   * 反序列化值
   * @param value
   * @returns
   */
  const deserializer = (value: string) => {
    if (options?.deserializer) {
      return options?.deserializer(value);
    }
    return JSON.parse(value);
  };

  const getStoredValue = () => {
    try {
      const raw = storage?.getItem(key);
      if (raw) return deserializer(raw);
    } catch (e) {
      throw new Error();
    }
    // 值为空时返回默认值
    if (isFunction(options?.defaultValue)) {
      return options?.defaultValue();
    }
    return options?.defaultValue;
  };

  const [state, setState] = useState<T>(() => getStoredValue());

  useEffect(() => {
    setState(getStoredValue());
  }, [key]);

  const updateState = (value: T | IFuncUpdater<T>) => {
    const currentState = isFunction(value) ? value(state) : value;
    setState(currentState);
    // 如果值为空，那么就去除掉
    if (isNil(currentState)) {
      storage?.removeItem(key);
    } else {
      try {
        storage?.setItem(key, serializer(currentState));
      } catch (e) {
        throw new Error();
      }
    }
  };

  return [state, useMemoFun(updateState)] as const;
}
