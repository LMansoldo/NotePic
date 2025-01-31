import { useAnnotations } from '@context'
import { AnchorPen, Brush, Eraser } from './Tool'
import { ClassList, Card, Header } from '@components'

const toolComponents = {
  anchorPen: AnchorPen,
  brush: Brush,
  eraser: Eraser,
} as const

type ToolType = keyof typeof toolComponents

const AnnotationTool = () => {
  const { state } = useAnnotations()
  const CurrentTool = toolComponents[state.mode as ToolType]
  
  return CurrentTool ? <CurrentTool /> : null
}

const Annotation = () => {
  const { state } = useAnnotations()

  const getImageUrl = () => {
    if (!state.imageSrc) return ''
    return `${state.imageSrc.url}${state.imageSrc.file_name}`
  }

  return (
    <Card imgSrc={getImageUrl()}>
      <Header />
      <AnnotationTool />
      <ClassList />
    </Card>
  )
}

export { Annotation }