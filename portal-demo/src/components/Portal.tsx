import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  attach?: HTMLElement | string;
  children: React.ReactNode;
};

function getAttach(attach?: HTMLElement | string) {
  if (typeof attach === 'string') {
    return document.querySelector(attach);
  }
  return attach;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;

  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = 'portal-wrapper';
    return el;
  }, []);

  useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild(container);
    return () => {
      parentElement?.removeChild(container);
    };
  }, [container, attach]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Portal;
