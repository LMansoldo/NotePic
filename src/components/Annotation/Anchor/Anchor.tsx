import React from 'react'
import { Circle } from 'react-konva'

interface Anchor {
	x: number
	y: number
}

interface AnchorsProps {
	points: Anchor[]
	onAnchorDrag: (index: number, x: number, y: number) => void
}

const Anchors: React.FC<AnchorsProps> = ({ points, onAnchorDrag }) => {
	return (
		<>
			{points.map((point, index) => (
				<Circle
					key={index}
					x={point.x}
					y={point.y}
					radius={4}
					stroke="#000"
					strokeWidth={1}
					fill="#FFF"
					draggable
					onDragMove={(e) => onAnchorDrag(index, e.target.x(), e.target.y())}
				/>
			))}
		</>
	)
}

export default Anchors
