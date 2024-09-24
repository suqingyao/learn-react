import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './App2.css';

interface CardItem {
  id: string;
  content: string;
}

interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: (dragIndex: number, hoverIndex: number) => void;
}

interface DragData {
  id: string;
  index: number;
}

function Card({ data, index, swapIndex }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ dragging }, drag] = useDrag({
    type: 'card',
    item: {
      id: data.id,
      index,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    // drop: (item: DragData) => {
    //   console.log(item);
    //   swapIndex(index, item.index);
    // },
    hover(item: DragData) {
      swapIndex(index, item.index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={`card ${dragging ? 'dragging' : ''}`}
    >
      {data.content}
    </div>
  );
}

function App() {
  const [cardList, setCardList] = useState<CardItem[]>([
    { id: '1', content: 'Card 1' },
    { id: '2', content: 'Card 2' },
    { id: '3', content: 'Card 3' },
  ]);

  const swapIndex = useCallback((dragIndex: number, hoverIndex: number) => {
    const temp = cardList[dragIndex];
    cardList[dragIndex] = cardList[hoverIndex];
    cardList[hoverIndex] = temp;

    setCardList([...cardList]);
  }, []);

  return (
    <div className="card-list">
      {cardList.map((card, index) => (
        <Card
          key={card.id}
          data={card}
          index={index}
          swapIndex={swapIndex}
        />
      ))}
    </div>
  );
}

export default App;
