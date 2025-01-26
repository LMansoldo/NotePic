import { useState, useRef } from 'react';
import Konva from 'konva';
import { Canvas } from '@components'
import LayerManager from '../LayerManager/LayerManager';
import LineDraw from '../LineDraw/LineDraw';

import { useAnnotations } from '@context';

const Brush = () => {
  const { state, dispatch } = useAnnotations();
  const isDrawing = useRef<boolean>(false);
  const [points, setPoints] = useState<number[]>([])

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (pointerPosition) {
      setPoints([pointerPosition.x, pointerPosition.y]);
    }
  };

  const handleMouseMove =(e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (pointerPosition) {
      setPoints((prev) => [...prev, pointerPosition.x, pointerPosition.y]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;

      const newShape = {
        type: 'brush' as const,
        points: points,
        color: state.selectedClass?.color || '#000000',
        strokeWidth: state.brushSize || 2,
      };

      dispatch({ type: 'ADD_SHAPE', payload: newShape }); 
      setPoints([]); 
    }
  }


	return (
    <Canvas 
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <LayerManager>
        <LineDraw
          points={points}
          color={state.selectedClass?.color || '#532ee3'}
          strokeWidth={state.brushSize || 2}
        />
      </LayerManager>
    </Canvas>
	)

};

export { Brush }