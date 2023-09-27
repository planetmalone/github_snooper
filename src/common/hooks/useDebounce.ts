import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useDebounce = (fn: Function, delay: number, dependencies: DependencyList = []) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const createTimeout = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => callback.current(), delay);
  }, [delay]);

  useEffect(() => {
    createTimeout();
    // Need to disable this rule for a dynamic dependency list. Don't worry. It's safe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  return useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);
};