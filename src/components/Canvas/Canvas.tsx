import React from 'react';
import { Stage, StageProps } from 'react-konva';

interface CanvasProps {
  children: React.ReactNode
  props: StageProps
}

const Canvas: React.FC<CanvasProps> = ({
		children,
	...props
	}) => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
			{...props}
    >
			{children}
    </Stage>
  );
};

export { Canvas };