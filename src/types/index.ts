interface AnnotationsState {
	mode?: string
	brushSize?: number
	classes: Class[]
	selectedClass?: Shape | null
	shapes: Shape[]
}

type ShapeType = 'brush' | 'anchorPen' | 'eraser'

interface Shape {
	type: ShapeType
	points: number[]
	color: string
	strokeWidth: number
}

interface Class {
	name: string
	color: string
}

interface Point {
	x: number
	y: number
}

export type { AnnotationsState, ShapeType, Shape, Class, Point }
