import { useMemo, useRef } from 'react';
import type { INoopFun } from './index.type';

/**
 * 用于缓存方法，在一定程度上可以替换 useCallBack
 * @param fn
 * @returns
 */
export function useMemoFun<T extends INoopFun<T>>(fn: T) {
  const fnRef = useRef<T>(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoFun = useRef<INoopFun<T>>();

  // 使用第一次创建生成的引用地址，避免地址变化
  if (!memoFun.current) {
    memoFun.current = (...args) => {
      return fnRef.current(...args);
    };
  }
  return memoFun.current;
}
