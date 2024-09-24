import { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './App.css';

interface ItemType {
  color: string;
}

interface BoxProps {
  color: string;
}

function Box({ color }: BoxProps) {
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: 'box',
    item: {
      color,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage());
  }, []);

  return (
    <div
      ref={ref}
      className={`box ${dragging ? 'dragging' : ''}`}
      style={{ backgroundColor: color || 'blue' }}></div>
  );
}

function Container() {
  const ref = useRef(null);
  const [boxes, setBoxes] = useState<ItemType[]>([]);

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop(item: ItemType) {
        setBoxes((boxes) => [...boxes, item]);
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div
      ref={ref}
      className="container">
      {boxes.map((box) => (
        <Box
          key={box.color}
          color={box.color}></Box>
      ))}
    </div>
  );
}

const DragDropLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }
  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}>
      {item.color} 拖拽中
    </div>
  );
};

function App() {
  return (
    <div>
      <Container></Container>
      <Box color="red"></Box>
      <Box color="green"></Box>
      <Box color="blue"></Box>
      <DragDropLayer></DragDropLayer>
    </div>
  );
}

export default App;
