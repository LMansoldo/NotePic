import type { ShapeType, Class, Shape } from '@types';

export type AnnotationAction =
	| { type: 'SET_MODE'; payload: ShapeType }
	| { type: 'SET_BRUSH_SIZE'; payload: number }
	| { type: 'ADD_CLASS'; payload: Class[] }
	| { type: 'SELECT_CLASS'; payload: string }
	| { type: 'ADD_SHAPE'; payload: Shape[] }
	| { type: 'UNDO_SHAPE'; payload: Shape[] }

