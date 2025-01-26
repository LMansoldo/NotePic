import { Button } from '@components'
import { LiaPaintBrushSolid, LiaPenSolid, LiaEraserSolid } from "react-icons/lia";
import { useAnnotations } from '@context';
import styles from './ToolSelector.module.css';

const ToolSelector = () => {
	const { dispatch } = useAnnotations();
	return (
		<div className={styles.toolSelector}>
			<Button onClick={() => dispatch({ type: 'SET_MODE', payload: 'brush' })} size="small" shape="circle">
				<LiaPaintBrushSolid />
			</Button>
			<Button onClick={() => dispatch({ type: 'SET_MODE', payload: 'anchorPen' })} size="small" shape="circle">
				<LiaPenSolid />
			</Button>
			<Button onClick={() => dispatch({ type: 'SET_MODE', payload: 'eraser' })} size="small" shape="circle">
				<LiaEraserSolid />
			</Button>
		</div>
	)
}

export { ToolSelector }