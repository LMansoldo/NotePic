import { Button } from '@components'
import {
	LiaPaintBrushSolid,
	LiaEraserSolid,
	LiaPenFancySolid,
	LiaUndoSolid
} from 'react-icons/lia'
import { useAnnotations } from '@context'
import Export from '@components/Annotation/Tool/Export'
import styles from './ToolSelector.module.css'

const ToolSelector = () => {
	const { state, dispatch } = useAnnotations()

	return (
		<div className={styles.toolSelector}>
			<Button
				onClick={() => dispatch({ type: 'SET_MODE', payload: 'brush' })}
				disabled={state.selectedClass ? false : true}
				selected={state.mode === 'brush' ? true : false}
				size="small"
				shape="circle"
			>
				<LiaPaintBrushSolid />
			</Button>
			<Button
				onClick={() => dispatch({ type: 'SET_MODE', payload: 'anchorPen' })}
				disabled={state.selectedClass ? false : true}
				selected={state.mode === 'anchorPen' ? true : false}
				size="small"
				shape="circle"
			>
				<LiaPenFancySolid />
			</Button>
			<Button
				onClick={() => dispatch({ type: 'SET_MODE', payload: 'eraser' })}
				selected={state.mode === 'eraser' ? true : false}
				size="small"
				shape="circle"
			>
				<LiaEraserSolid />
			</Button>
			<Button
				onClick={() => dispatch({ type: 'UNDO_SHAPE' })}
				size="small"
				shape="circle"
			>
				<LiaUndoSolid />
			</Button>
			<Export />
		</div>
	)
}

export { ToolSelector }
