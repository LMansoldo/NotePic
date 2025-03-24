import { Canvas } from '@components'
import { useAnnotations } from '@context'
import { useBrush } from '@hooks/useBrush'

const Brush = () => {
	const { state } = useAnnotations()
	const { points, handleStart, handleMove, handleEnd } = useBrush()

	const getImageUrl = () => {
    if (!state.imageSrc) return ''
    return `${state.imageSrc.url}${state.imageSrc.file_name}`
  }

	return (
    <Canvas
      onMouseUp={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
			<Canvas.Layer>
				<Canvas.Image src={getImageUrl()} listening={false} imageSmoothingEnabled={false}/>
			</Canvas.Layer>
      <Canvas.Layer>
				
        <Canvas.Line
          points={points}
          color={state.selectedClass?.color || '#532ee3'}
          strokeWidth={state.brushSize || 2}
        />
        {state.shapes.map((shape, index) => (
          <Canvas.Line
            key={index}
            points={shape.points}
            color={shape.color}
            strokeWidth={shape.strokeWidth}
            opacity={0.5}
            closed={true}
          />
        ))}
			
      </Canvas.Layer>

    </Canvas>
  )
}

export { Brush }
