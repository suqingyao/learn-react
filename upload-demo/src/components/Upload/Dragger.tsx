import { useState, DragEvent } from 'react';
import clsx from 'clsx';

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: React.ReactNode;
}

const Dragger = (props: DraggerProps) => {
  const { onFile, children } = props;

  const [dragOver, setDragOver] = useState(false);

  const cs = clsx('upload-dragger', {
    'is-dragover': dragOver
  });

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer?.files);
  };

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  return (
    <div
      className={cs}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default Dragger;
