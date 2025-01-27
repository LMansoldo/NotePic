import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';
import styles from './Canvas.module.css'

interface CanvasProps {
  children: React.ReactNode;
  onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onDblClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseDown?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseMove?: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseUp?: () => void;
  onTouchStart?: (e: Konva.KonvaEventObject<TouchEvent>) => void;
  onTouchMove?: (e: Konva.KonvaEventObject<TouchEvent>) => void;
  onTouchEnd?: (e: Konva.KonvaEventObject<TouchEvent>) => void;
}

const Canvas: React.FC<CanvasProps> = ({ children, ...props }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth, 1024),
    height: Math.min(window.innerHeight, 768),
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 1024 ? window.innerWidth : 1024;
      const newHeight = window.innerHeight < 768 ? window.innerHeight - 150 : 768;
      setDimensions({
        width: newWidth,
        height: newHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden', cursor: 'crosshair' }}>
      <Stage
				width={dimensions.width}
				height={dimensions.height - 100}
        ref={stageRef}
        className={styles.canvasContainer}
        {...props}
      >
        {children}
      </Stage>
    </div>
  );
};

export { Canvas };