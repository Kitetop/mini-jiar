import { useDebounceFn } from 'hooks';
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, options?: any) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}
