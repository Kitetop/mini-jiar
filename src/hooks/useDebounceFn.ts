import { debounce } from 'lodash-es';
import { useMemo, useRef } from 'react';

type noop<T extends unknown[]> = (...args: T) => unknown;

export function useDebounceFn<T extends noop<Parameters<T>>>(fn: T, options?: any) {
  // 缓存一下fn options
  const fnRef = useRef(fn);
  const optionsRef = useRef(options);

  const debounced = useMemo(
    () => debounce<T>(fnRef.current, optionsRef.current?.wait ?? 1000, optionsRef.current),
    []
  );
  return {
    run: debounced,
    cancle: debounced.cancel
  };
}
