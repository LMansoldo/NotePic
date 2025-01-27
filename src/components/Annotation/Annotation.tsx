import { useAnnotations } from '@context'
import { AnchorPen, Brush, Eraser } from '@components/Annotation/Tool'
import { ClassList, Card, Header } from '@components'

const Annotation = () => {
	const { state } = useAnnotations()

	return (
		<Card>
			<Header />
			{state && state.mode === 'anchorPen' && <AnchorPen />}
			{state && state.mode === 'brush' && <Brush />}
			{state && state.mode === 'eraser' && <Eraser />}
			<ClassList />
		</Card>
	)
}

export { Annotation }
