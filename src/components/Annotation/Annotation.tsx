import { useAnnotations } from '@context'
import { ToolSelector } from './ToolSelector'
import { AnchorPen, Brush } from '@components/Annotation/Tool'

const Annotation = () => {
	const { state } = useAnnotations()

	return (
		<>
			<ToolSelector />
			{state && state.mode === 'anchorPen' && <AnchorPen />}
			{state && state.mode === 'brush' && <Brush />}
		</>
	)
}

export { Annotation }
