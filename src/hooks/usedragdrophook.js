import { useState } from 'react';

const useDragDropHook = (onDropCallback) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (typeof onDropCallback === 'function') {
      const file = event.dataTransfer.files[0];
      onDropCallback(file);
    }
  };
  return {
    dragOverProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    isDragging,
  };
};

export default useDragDropHook;
