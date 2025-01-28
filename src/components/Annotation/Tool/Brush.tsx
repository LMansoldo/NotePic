import { useState, useRef } from 'react'
import Konva from 'konva'
import { Canvas } from '@components'
import LayerManager from '../LayerManager/LayerManager'
import LineDraw from '../LineDraw/LineDraw'
import { useAnnotations } from '@context'

const Brush = () => {
	const { state, dispatch } = useAnnotations()
	const isDrawing = useRef<boolean>(false)
	const [points, setPoints] = useState<number[]>([])
	const closeThreshold = 10

	const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
		isDrawing.current = true

		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()

		if (pointerPosition) {
			setPoints([pointerPosition.x, pointerPosition.y])
		}
	}

	const handleTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
		isDrawing.current = true

		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()

		if (pointerPosition) {
			setPoints([pointerPosition.x, pointerPosition.y])
		}
	}

	const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
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
	}

	const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
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
	}

	const handleMouseUp = () => {
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
	}

	return (
		<Canvas
			onMouseUp={handleMouseUp}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleMouseUp}
		>
			<LayerManager>
				<LineDraw
					points={points}
					color={state.selectedClass?.color || '#532ee3'}
					strokeWidth={state.brushSize || 2}
				/>
				{state.shapes.map((shape, index) => (
					<LineDraw
						key={index}
						points={shape.points}
						color={shape.color}
						strokeWidth={shape.strokeWidth}
					/>
				))}
			</LayerManager>
		</Canvas>
	)
}

export { Brush }
