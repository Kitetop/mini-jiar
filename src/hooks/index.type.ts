export type INoopFun<T extends () => unknown> = (...args: Parameters<T>) => ReturnType<T>;

export interface IDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}
