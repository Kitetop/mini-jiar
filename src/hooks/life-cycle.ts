import { useEffect, useRef } from 'react';

export function useMount(callback: () => void) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current();
  }, []);
}

export function useUnMount(callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(
    () => () => {
      callbackRef.current();
    },
    []
  );
}
