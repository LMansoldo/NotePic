import type { AnnotationAction } from '@context'
import type { AnnotationsState, Class } from '@types'

const AnnotationsReducer = (state: AnnotationsState, action: AnnotationAction): AnnotationsState => {
	switch (action.type) {
		case 'SET_MODE':
			return { ...state, mode: action.payload };
		case 'SET_BRUSH_SIZE':
			return { ...state, brushSize: action.payload }; 
		case 'ADD_CLASS':
			return { ...state, classes: [...state.classes, action.payload] as Class[]};
		case 'SELECT_CLASS':
			return { ...state, selectedClass: action.payload };
		case 'ADD_SHAPE':
			return { ...state, shapes: [...state.shapes, action.payload] as string[]};
		case 'UNDO_SHAPE':
			return { ...state, shapes: state.shapes?.slice(0, -1) };
		default:
			throw new Error(`Unknown action type`);
	}
};

export { AnnotationsReducer }
