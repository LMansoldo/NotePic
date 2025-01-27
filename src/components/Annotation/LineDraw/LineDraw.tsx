import React from 'react'
import { Line } from 'react-konva'

interface LineDrawProps {
	points: number[]
	color: string
	strokeWidth: number
}

const LineDraw: React.FC<LineDrawProps> = ({ points, color, strokeWidth }) => {
	return (
		<Line
			points={points}
			stroke={color}
			strokeWidth={strokeWidth}
			tension={0}
			lineCap="round"
			lineJoin="round"
			opacity={0.3}
		/>
	)
}

export default LineDraw
