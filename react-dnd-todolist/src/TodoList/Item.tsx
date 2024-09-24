import { useRef, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { cn } from '../utils/cn';
import { ListItem, useTodoListStore } from './store';

interface ItemProps {
  data: ListItem;
}

const Item = ({ data }: ItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const updateItem = useTodoListStore((state) => state.updateItem);

  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  const [{ isDragging }, drag] = useDrag({
    type: 'list-item',
    item: {
      id: data.id,
    },
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
        'h-100 border-2 border-black bg-blue-300 p-10',
        'flex justify-start items-center',
        'text-xl tracking-wide',
        isDragging && 'border-dashed bg-white',
      )}
      onDoubleClick={() => {
        setEditing(true);
      }}
    >
      <input
        type="checkbox"
        className="w-40 h-40 mr-10"
        checked={data.status === 'done'}
        onChange={(e) => {
          updateItem({
            ...data,
            status: e.target.checked ? 'done' : 'todo',
          });
        }}
      />
      {editing ? (
        <input
          value={editContent}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
          onBlur={() => {
            setEditing(false);
            updateItem({
              ...data,
              content: editContent,
            });
          }}
        />
      ) : (
        <p>{data.content}</p>
      )}
    </div>
  );
};

export default Item;
