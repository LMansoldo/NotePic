import type { AnnotationAction } from '@context'
import type { AnnotationsState, Class, Shape } from '@types'

const AnnotationsReducer = (
	state: AnnotationsState,
	action: AnnotationAction,
): AnnotationsState => {
	switch (action.type) {
		case 'SET_MODE':
			return { ...state, mode: action.payload }
		case 'SET_BRUSH_SIZE':
			return { ...state, brushSize: action.payload }
		case 'SET_SHAPES':
				return { ...state, shapes: action.payload };
		case 'ADD_CLASS':
			return {
				...state,
				classes: [...state.classes, action.payload] as Class[],
			}
		case 'SELECT_CLASS':
			return { ...state, selectedClass: action.payload as unknown as Shape }
		case 'ADD_SHAPE':
			return { ...state, shapes: [...state.shapes, action.payload] as Shape[] }
		case 'UPDATE_SHAPES':
			return {
				...state,
				shapes: action.payload,
			}
		case 'UNDO_SHAPE':
			return { ...state, shapes: state.shapes?.slice(0, -1) }
		default:
			throw new Error(`Unknown action type`)
	}
}

export { AnnotationsReducer }
