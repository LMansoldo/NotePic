import { useState, useRef } from 'react';
import Konva from 'konva'
import { useAnnotations } from '@context';

export const useBrush = () => {
  const { state, dispatch } = useAnnotations();
  const isDrawing = useRef(false);
  const [points, setPoints] = useState<number[]>([])
  const closeThreshold = 10

  const handleStart = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    isDrawing.current = true;
    const pointerPosition = e.target.getStage()?.getPointerPosition();
    if (pointerPosition) setPoints([pointerPosition.x, pointerPosition.y]);
  };

  const handleMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
		if (!isDrawing.current) return
		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()

		if (pointerPosition) {
			const intersection = stage?.getIntersection(pointerPosition)
			if (intersection) {
				return
			}
			setPoints((prev) => [...prev, pointerPosition.x, pointerPosition.y])
		}
  };

  const handleEnd = () => {
		if (isDrawing.current) {
			isDrawing.current = false

			const startPoint = { x: points[0], y: points[1] }
			const endPoint = {
				x: points[points.length - 2],
				y: points[points.length - 1],
			}

			const distance = Math.sqrt(
				Math.pow(endPoint.x - startPoint.x, 2) +
					Math.pow(endPoint.y - startPoint.y, 2),
			)
			console.log(distance <= closeThreshold)
			if (distance <= closeThreshold) {
				const newShape = {
					type: 'brush' as const,
					points: points,
					color: state.selectedClass?.color || '#000000',
					strokeWidth: state.brushSize || 2,
				}

				dispatch({ type: 'ADD_SHAPE', payload: newShape })
				setPoints([])
			} else {
				setPoints((prev) => [...prev, points[0], points[1]])
			}
		}
  };

  return { points, handleStart, handleMove, handleEnd };
};
