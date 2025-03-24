import { Canvas } from '@components'
import { useAnnotations } from '@context'

const Blank = () => {
  const { state } = useAnnotations()

  const getImageUrl = () => {
    if (!state.imageSrc) return ''
    return `${state.imageSrc.url}${state.imageSrc.file_name}`
  }

  return (
    <Canvas>
      <Canvas.Layer>
        <Canvas.Image src={getImageUrl()} />
      </Canvas.Layer>
    </Canvas>
  )
}

export { Blank }