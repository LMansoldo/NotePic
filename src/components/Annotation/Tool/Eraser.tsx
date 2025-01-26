import { useState, useRef } from 'react';
import Konva from 'konva';
import { Canvas } from '@components';
import LayerManager from '../LayerManager/LayerManager';
import LineDraw from '../LineDraw/LineDraw';

import { useAnnotations } from '@context';

const Eraser = () => {
  const { state, dispatch } = useAnnotations();
  const isErasing = useRef<boolean>(false);
  const eraseThreshold = 10;
	const isPointNearLine = (
		point: { x: number; y: number },
		linePoints: number[],
		threshold: number
	) => {
		for (let i = 0; i < linePoints.length - 2; i += 2) {
			const x1 = linePoints[i];
			const y1 = linePoints[i + 1];
			const x2 = linePoints[i + 2];
			const y2 = linePoints[i + 3];
	
			const distance =
				Math.abs((y2 - y1) * point.x - (x2 - x1) * point.y + x2 * y1 - y2 * x1) /
				Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
	
			if (distance <= threshold) return true;
		}
		return false;
	};
	
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isErasing.current = true;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (pointerPosition && state.mode === 'eraser') {
      const shapeIndex = state.shapes.findIndex((shape) =>
        isPointNearLine(pointerPosition, shape.points, eraseThreshold)
      );

      if (shapeIndex !== -1) {
        const newShapes = [...state.shapes];
        newShapes.splice(shapeIndex, 1);
        dispatch({ type: 'SET_SHAPES', payload: newShapes });
      }
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isErasing.current || state.mode !== 'eraser') return;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (pointerPosition) {
      const shapeIndex = state.shapes.findIndex((shape) =>
        isPointNearLine(pointerPosition, shape.points, eraseThreshold)
      );

      if (shapeIndex !== -1) {
        const newShapes = [...state.shapes];
        newShapes.splice(shapeIndex, 1);
        dispatch({ type: 'SET_SHAPES', payload: newShapes });
      }
    }
  };

  const handleMouseUp = () => {
    isErasing.current = false;
  };

  return (
    <Canvas
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <LayerManager />
    </Canvas>
  );
};

export { Eraser };
