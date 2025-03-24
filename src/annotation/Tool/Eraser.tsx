import { Canvas } from '@components'
import { useAnnotations } from '@context'
import { useEraser } from '@hooks/useEraser'

const Eraser = () => {
  const { state } = useAnnotations()
  const { eraserPosition, handleErase } = useEraser()

  const getImageUrl = () => {
    if (!state.imageSrc) return ''
    return `${state.imageSrc.url}${state.imageSrc.file_name}`
  }

  return (
    <Canvas
    onClick={handleErase}
    >
      <Canvas.Layer>
				<Canvas.Image src={getImageUrl()} listening={false} imageSmoothingEnabled={false}/>
			</Canvas.Layer>
      <Canvas.Layer>
        {eraserPosition && (
          <Canvas.Circle
            x={eraserPosition.x}
            y={eraserPosition.y}
            radius={5}
            fill="rgba(255,0,0,0.3)"
            stroke="red"
            strokeWidth={1}
            listening={false}
          />
        )}
      </Canvas.Layer>
    </Canvas>
  )
}

export { Eraser }