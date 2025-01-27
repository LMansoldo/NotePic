import type { ShapeType, Class, Shape } from '@types'

export type AnnotationAction =
	| { type: 'SET_MODE'; payload: ShapeType }
	| { type: 'SET_BRUSH_SIZE'; payload: number }
	| { type: 'SET_SHAPES'; payload: Shape[] }
	| { type: 'ADD_CLASS'; payload: Class }
	| { type: 'SELECT_CLASS'; payload: string }
	| { type: 'ADD_SHAPE'; payload: Shape }
	| { type: 'UPDATE_SHAPES'; payload: Shape[] }
	| { type: 'UNDO_SHAPE'; payload: Shape[] }
