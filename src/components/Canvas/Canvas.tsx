import React from 'react'
import Konva from 'konva'
import { Stage } from 'react-konva'

interface CanvasProps {
	children: React.ReactNode
	onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onDblClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseDown?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseMove?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseUp?: () => void
}

const Canvas: React.FC<CanvasProps> = ({ children, ...props }) => {
	return (
		<Stage width={window.innerWidth} height={window.innerHeight} {...props}>
			{children}
		</Stage>
	)
}

export { Canvas }
