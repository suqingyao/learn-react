import { cloneElement, useLayoutEffect, useRef, useState } from 'react';
import { useMutateObserver } from '../hooks/useMutateObserver';

interface MutateObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

const MutateObserver = (props: MutateObserverProps) => {
  const { options, onMutate = () => {}, children } = props;

  const elementRef = useRef<HTMLElement>(null);

  const [target, setTarget] = useState<HTMLElement>();

  useMutateObserver(target!, onMutate, options);

  useLayoutEffect(() => {
    if (elementRef.current) {
      setTarget(elementRef.current);
    }
  }, []);

  if (!children) {
    return null;
  }

  return cloneElement(children, { ref: elementRef });
};

export default MutateObserver;
