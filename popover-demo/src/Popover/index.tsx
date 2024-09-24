import {
  FloatingArrow,
  arrow,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react';
import { PropsWithChildren, useMemo, useRef, useState } from 'react';

import './index.css';
import { createPortal } from 'react-dom';

type Alignment = 'start' | 'end';
type Side = 'top' | 'right' | 'bottom' | 'left';
type AlignmentPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: Side | AlignmentPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Popover = (props: PopoverProps) => {
  const {
    open,
    onOpenChange,
    content,
    children,
    trigger = 'hover',
    placement = 'bottom',
    className,
    style
  } = props;

  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef
      }),
      flip()
    ]
  });

  const click = useClick(context, {
    enabled: trigger === 'click'
  });

  const hover = useHover(context, {
    enabled: trigger === 'hover'
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, dismiss]);

  const el = useMemo(() => {
    const el = document.createElement('div');
    el.className = 'popover-wrapper';
    document.body.appendChild(el);
    return el;
  }, []);

  const floating = isOpen && (
    <div
      className="popover-floating"
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps}
    >
      {content}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
      />
    </div>
  );

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps}
        className={className}
        style={style}
      >
        {children}
      </span>

      {createPortal(floating, el)}
    </>
  );
};

export default Popover;
