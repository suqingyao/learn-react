import { useDrag } from 'react-dnd';
import { cn } from './utils/cn';
import { useEffect, useRef } from 'react';

interface NewItemProps {
  className?: string | string[];
}

const NewItem = ({ className }: NewItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'new-item',
    item: {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    drag(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'h-100 border-2 border-black',
        'leading-100 text-center text-2xl',
        'bg-green-300',
        'cursor-move select-none',
        isDragging && 'border-dashed bg-white',
        className,
      )}
    >
      新的待办事项
    </div>
  );
};

export default NewItem;
