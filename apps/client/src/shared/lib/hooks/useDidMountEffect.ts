import { useRef, useEffect } from 'react';

export function useDidMountEffect(executor: () => void, deps: any[]): void {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) executor();
    else didMount.current = true;
  }, deps);
}
