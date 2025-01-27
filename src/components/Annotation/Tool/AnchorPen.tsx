import { useState } from 'react';
import { useAnnotations } from '@context';
import { Canvas } from '@components';
import Anchors from '../Anchor/Anchor';
import LayerManager from '../LayerManager/LayerManager';
import LineDraw from '../LineDraw/LineDraw';
import { KonvaEventObject } from 'konva/lib/Node';
import { Shape } from '@types';

interface Point {
  x: number;
  y: number;
}

const AnchorPen = () => {
  const { state, dispatch } = useAnnotations();
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (state.mode !== 'anchorPen') return;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (!pointerPosition) return;


    const intersection = stage?.getIntersection(pointerPosition);
    if (intersection) {
      return;
    }

    const newPoints = [
      ...currentPoints,
      { x: pointerPosition.x, y: pointerPosition.y },
    ];

    if (newPoints.length > 1) {
      const startPoint = newPoints[0];
      const endPoint = newPoints[newPoints.length - 1];

      const distance = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
      );

      const closeThreshold = 30;

      if (distance <= closeThreshold) {
        const newShape = {
          type: 'anchorPen' as const,
          points: newPoints.flatMap((point) => [point.x, point.y]),
          color: state.selectedClass?.color || '#000000',
          strokeWidth: state.brushSize || 2,
        } as Shape;

        dispatch({ type: 'ADD_SHAPE', payload: newShape });
        setCurrentPoints([]);
        return;
      }
    }

    setCurrentPoints(newPoints);
  };

  const handleAnchorDrag = (index: number, x: number, y: number) => {
    const newPoints = [...currentPoints];
    newPoints[index] = { x, y };
    setCurrentPoints(newPoints);
  };

  return (
      <Canvas onClick={handleStageClick}>
        <LayerManager>
          <LineDraw
            points={currentPoints.flatMap((point) => [point.x, point.y])}
            color={state.selectedClass?.color || '#532ee3'}
            strokeWidth={10}
          />
          <Anchors points={currentPoints} onAnchorDrag={handleAnchorDrag} />
          {state.shapes.map((shape, index) => (
            <LineDraw
              key={index}
              points={shape.points}
              color={shape.color}
              strokeWidth={6}
            />
          ))}
        </LayerManager>
      </Canvas>
  );
};

export { AnchorPen };