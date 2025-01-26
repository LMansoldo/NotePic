import { useState } from 'react'
import { useAnnotations } from '@context'
import { Canvas } from '@components'
import Anchors from '../Anchor/Anchor'
import LayerManager from '../LayerManager/LayerManager'
import LineDraw from '../LineDraw/LineDraw'
import { KonvaEventObject } from 'konva/lib/Node'
import { Shape } from '@types'

interface Point {
	x: number
	y: number
}

const AnchorPen = () => {
	const { state, dispatch } = useAnnotations()
	const [currentPoints, setCurrentPoints] = useState<Point[]>([])

	const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
		if (state.mode !== 'anchorPen') return

		const stage = e.target.getStage()
		const pointerPosition = stage?.getPointerPosition()

		if (pointerPosition) {
			setCurrentPoints((prev) => [
				...prev,
				{ x: pointerPosition.x, y: pointerPosition.y },
			])
		}
	}

	const handleFinishLine = () => {
		if (currentPoints.length < 2) return

		const newShape = {
			type: 'anchorPen' as const,
			points: currentPoints.flatMap((point) => [point.x, point.y]),
			color: state.selectedClass?.color || '#000000',
			strokeWidth: state.brushSize || 2,
		} as Shape

		dispatch({ type: 'ADD_SHAPE', payload: newShape })
		setCurrentPoints([])
	}

	const handleAnchorDrag = (index: number, x: number, y: number) => {
		const newPoints = [...currentPoints]
		newPoints[index] = { x, y }
		setCurrentPoints(newPoints)
	}

	return (
		<Canvas onClick={handleStageClick} onDblClick={handleFinishLine}>
			<LayerManager>
				<LineDraw
					points={currentPoints.flatMap((point) => [point.x, point.y])}
					color={state.selectedClass?.color || '#532ee3'}
					strokeWidth={state.brushSize || 2}
				/>
				<Anchors points={currentPoints} onAnchorDrag={handleAnchorDrag} />
			</LayerManager>
		</Canvas>
	)
}

export { AnchorPen }
