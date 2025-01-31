import React from 'react'
import Konva from 'konva'
import { Layer, Line } from 'react-konva'
import { useAnnotations } from '@context'

interface LayerManagerProps {
	children?: React.ReactNode
	layerRef?: React.RefObject<Konva.Layer>
}

const LayerManager: React.FC<LayerManagerProps> = ({ children, layerRef }) => {
	const { state } = useAnnotations()

	return (
		<Layer ref={layerRef}>
			{state.shapes.map((shape, index) => (
				<Line
					key={index}
					points={shape.points}
					stroke={shape.color}
					fill={shape.color}
					opacity={0.5}
					strokeWidth={shape.strokeWidth}
					tension={0}
					lineCap="round"
					lineJoin="round"
					closed={true}
				/>
			))}
			{children}
		</Layer>
	)
}

export default LayerManager
