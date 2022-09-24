import { debounce } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUnMount } from './lifeCycle';
import type { IDebounceOptions, noop } from './index.type';

export function useDebounceFn<T extends noop<Parameters<T>>>(
  fn: T,
  options: IDebounceOptions = {}
) {
  // 缓存一下fn
  const fnRef = useRef(fn);

  const debounced = useMemo(() => debounce<T>(fnRef.current, options.wait ?? 1000, options), []);
  /**
   * unMount之后cancel掉
   */
  useUnMount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancle: debounced.cancel
  };
}

/**
 * 对于频繁变化的value进行防抖，一定时间间隔后的value才会被更新
 * @param value
 * @param options
 * @returns
 */
export function useDebounce<T>(value: T, options?: IDebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}
