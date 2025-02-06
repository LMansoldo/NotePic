import { useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node'
import { useAnnotations } from '@context';
import { Shape, Point } from '@types'

export const useAnchorPen = () => {
  const { state, dispatch } = useAnnotations();
	const [currentPoints, setCurrentPoints] = useState<Point[]>([])

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (state.mode !== 'anchorPen') return

    const stage = e.target.getStage()
    const pointerPosition = stage?.getPointerPosition()
    
    if (!pointerPosition) return

    const intersection = stage?.getIntersection(pointerPosition)
    if (intersection) return

    const newPoints = [
      ...currentPoints,
      { x: pointerPosition.x, y: pointerPosition.y },
    ]

    if (newPoints.length > 1) {
      const startPoint = newPoints[0]
      const endPoint = newPoints[newPoints.length - 1]
      const distance = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) +
          Math.pow(endPoint.y - startPoint.y, 2)
      )

      const closeThreshold = 20
      if (distance <= closeThreshold) {
        const newShape = {
          type: 'anchorPen' as const,
          points: newPoints.flatMap((point) => [point.x, point.y]),
          color: state.selectedClass?.color || '#000000',
          strokeWidth: state.brushSize || 2,
        } as Shape

        dispatch({ type: 'ADD_SHAPE', payload: newShape })
        setCurrentPoints([])
        return
      }
    }

    setCurrentPoints(newPoints)
  }

  const handleAnchorDrag = (index: number, x: number, y: number) => {
    const newPoints = [...currentPoints]
    newPoints[index] = { x, y }
    setCurrentPoints(newPoints)
  }


  return { currentPoints, handleStageClick, handleAnchorDrag };
};