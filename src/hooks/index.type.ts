export type noop<T extends unknown[]> = (...args: T) => unknown;

export interface IDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}
