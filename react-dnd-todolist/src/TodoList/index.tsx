import { cn } from '../utils/cn';
import GarbageBin from '../GarbageBin';
import List from './List';
import NewItem from '../NewItem';

interface TodoListProps {
  items: string[];
}

const TodoList = ({ items }: TodoListProps) => {
  return (
    <div className={cn('w-1000 h-600 m-auto mt-100 p-10', 'border-2 border-black', 'flex justify-between items-start')}>
      <div className="flex-2 h-full mr-10  overflow-auto">
        <List />
      </div>
      <div className="flex-1 h-full flex flex-col justify-start">
        <NewItem />
        <GarbageBin className="mt-100" />
      </div>
    </div>
  );
};

export default TodoList;
