import { animated, useTransition } from '@react-spring/web';
import { cn } from '../utils/cn';
import { useTodoListStore } from './store';
import Item from './Item';
import Gap from './Gap';

interface ListProps {
  className?: string | string[];
}

const List = ({ className }: ListProps) => {
  const list = useTodoListStore((state) => state.list);

  const transitions = useTransition(list, {
    keys: list.map((item) => item.id),
    from: { transform: 'translate3d(100%, 0, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%, 0, 0)', opacity: 0 },
  });

  return (
    <div className={cn('h-full p-10', className)}>
      {list.length
        ? transitions((style, item) => {
            return (
              <animated.div
                key={item.id}
                style={style}
              >
                <Gap id={item.id} />
                <Item data={item} />
              </animated.div>
            );
          })
        : '暂无待办事项'}
      <Gap />
    </div>
  );
};

export default List;
