import { useEffect, useRef } from 'react';
import { cn } from './utils/cn';
import { useDrop } from 'react-dnd';
import { useTodoListStore } from './TodoList/store';

interface GarbageBinProps {
  className?: string | string[];
}

const GarbageBin = ({ className }: GarbageBinProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const deleteItem = useTodoListStore((state) => state.deleteItem);

  const [{ isOver }, drop] = useDrop({
    accept: 'list-item',
    drop: (item: { id: string }) => {
      deleteItem(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'h-200 border-2 border-black',
        'bg-orange-300',
        'leading-200 text-center text-2xl',
        'cursor-move select-none',
        isOver && 'bg-red-300',
        className,
      )}
    >
      垃圾箱
    </div>
  );
};

export default GarbageBin;
