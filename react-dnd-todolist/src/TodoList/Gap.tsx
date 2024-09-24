import { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '../utils/cn';
import { useTodoListStore } from './store';

interface GapProps {
  id?: string;
}

const Gap = ({ id }: GapProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const addItem = useTodoListStore((state) => state.addItem);

  const [{ isOver }, drop] = useDrop({
    accept: 'new-item',
    drop: () => {
      addItem(
        {
          id: new Date().getTime() + '',
          status: 'todo',
          content: '待办事项',
        },
        id,
      );
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
      className={cn('h-10', isOver && 'bg-red-300')}
    ></div>
  );
};

export default Gap;
