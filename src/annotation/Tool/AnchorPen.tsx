import { useAnnotations } from '@context'
import { Canvas } from '@components'
import { useAnchorPen } from '@hooks/useAnchorPen'

const AnchorPen = () => {
  const { state } = useAnnotations()
  const { handleStageClick, handleAnchorDrag, currentPoints } = useAnchorPen()

  const getImageUrl = () => {
    if (!state.imageSrc) return ''
    return `${state.imageSrc.url}${state.imageSrc.file_name}`
  }

  return (
    <Canvas onClick={handleStageClick}>
      <Canvas.Layer>
				<Canvas.Image src={getImageUrl()} listening={false} imageSmoothingEnabled={false}/>
			</Canvas.Layer>
      <Canvas.Layer>
        <Canvas.Line
          points={currentPoints.flatMap((point) => [point.x, point.y])}
          color={state.selectedClass?.color || '#532ee3'}
          strokeWidth={5}
        />
        
        <Canvas.Anchors
          points={currentPoints}
          onDrag={handleAnchorDrag}
        />

        {state.shapes.map((shape, index) => (
          <Canvas.Line
            key={index}
            points={shape.points}
            color={shape.color}
            strokeWidth={4}
          />
        ))}
      </Canvas.Layer>
    </Canvas>
  )
}

export { AnchorPen }