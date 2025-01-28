import { useState } from 'react'
import Konva from 'konva'
import { Canvas } from '@components'
import LayerManager from '../LayerManager/LayerManager'
import { Circle } from 'react-konva'
import { useAnnotations } from '@context'

const Eraser = () => {
	const { state, dispatch } = useAnnotations()
	const eraseThreshold = 5
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
			const x1 = linePoints[i]
			const y1 = linePoints[i + 1]
			const x2 = linePoints[i + 2]
			const y2 = linePoints[i + 3]

			const distance =
				Math.abs(
					(y2 - y1) * point.x - (x2 - x1) * point.y + x2 * y1 - y2 * x1,
				) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))

			if (distance <= threshold) return true
		}
		return false
	}

	const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()
		if (pointerPosition) {
			setEraserPosition(pointerPosition)
		}
	}

	const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()

		if (pointerPosition) {
			setEraserPosition(pointerPosition)
			eraseShape(pointerPosition)
		}
	}

	const eraseShape = (pointerPosition: { x: number; y: number }) => {
		const shapeIndex = state.shapes.findIndex((shape) =>
			isPointNearLine(pointerPosition, shape.points, eraseThreshold),
		)

		if (shapeIndex !== -1) {
			const newShapes = [...state.shapes]
			newShapes.splice(shapeIndex, 1)
			dispatch({ type: 'SET_SHAPES', payload: newShapes })
		}
	}

	return (
		<Canvas onClick={handleClick} onMouseMove={handleMouseMove}>
			<LayerManager>
				{eraserPosition && (
					<Circle
						x={eraserPosition.x}
						y={eraserPosition.y}
						radius={eraseThreshold}
						stroke="#000"
						fill="#FFF"
						strokeWidth={1}
					/>
				)}
			</LayerManager>
		</Canvas>
	)
}

export { Eraser }
