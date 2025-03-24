import { useState } from 'react';
import Konva from 'konva'
import { useAnnotations } from '@context';

export const useEraser = () => {
  const { state, dispatch } = useAnnotations();
  const eraseThreshold = 5;
  const [eraserPosition, setEraserPosition] = useState<{
    x: number
    y: number
  } | null>(null)


  const isPointNearLine = (
    point: { x: number; y: number },
    linePoints: number[],
    threshold: number,
  ) => {
    for (let i = 0; i < linePoints.length - 2; i += 2) {
      const start = { x: linePoints[i], y: linePoints[i + 1] }
      const end = { x: linePoints[i + 2], y: linePoints[i + 3] }
  
      const dx = end.x - start.x
      const dy = end.y - start.y
      const length = Math.sqrt(dx * dx + dy * dy)
      
      const t = Math.max(0, Math.min(1, 
        ((point.x - start.x) * dx + (point.y - start.y) * dy) / (length * length)
      ))
  
      const proj = {
        x: start.x + t * dx,
        y: start.y + t * dy
      }
  
      const distance = Math.sqrt(
        Math.pow(point.x - proj.x, 2) + Math.pow(point.y - proj.y, 2)
      )
  
      if (distance <= threshold) return true
    }

    if (linePoints.length >= 4) {
      const start = { x: linePoints[linePoints.length - 2], y: linePoints[linePoints.length - 1] }
      const end = { x: linePoints[0], y: linePoints[1] }
      
      const dx = end.x - start.x
      const dy = end.y - start.y
      const length = Math.sqrt(dx * dx + dy * dy)
      
      const t = Math.max(0, Math.min(1, 
        ((point.x - start.x) * dx + (point.y - start.y) * dy) / (length * length)
      ))
  
      const proj = {
        x: start.x + t * dx,
        y: start.y + t * dy
      }
  
      const distance = Math.sqrt(
        Math.pow(point.x - proj.x, 2) + Math.pow(point.y - proj.y, 2)
      )
  
      if (distance <= threshold) return true
    }
    return false
  }

  const eraseShape = (pointerPosition: { x: number; y: number }) => {
    const newShapes = state.shapes.filter((shape) => {
      for (let i = 0; i < shape.points.length - 1; i += 2) {
        if (isPointNearLine(pointerPosition, shape.points, eraseThreshold)) {
          return false
        }
      }
      return true
    })
  
    if (newShapes.length !== state.shapes.length) {
      dispatch({ type: 'SET_SHAPES', payload: newShapes })
    }
  }


  const handleErase = (e: Konva.KonvaEventObject<MouseEvent>) => {
			const stage = e.target.getStage()
			const pointerPosition = stage?.getPointerPosition()
			if (pointerPosition) {
				eraseShape(pointerPosition)
				setEraserPosition(pointerPosition)
			}
		}
	

  return { eraserPosition, handleErase };
};
