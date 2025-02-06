import { useAnnotations } from '@context'
import { AnchorPen, Brush, Eraser, Blank } from './Tool'
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
  
  return CurrentTool ? <CurrentTool /> : <Blank />
}

const Annotation = () => {
  return (
    <Card>
      <Header />
      <AnnotationTool />
      <ClassList />
    </Card>
  )
}

export { Annotation }