interface AnnotationsState {
	mode?: string
	brushSize?: number
	classes: Class[]
	selectedClass?: Class | null
	shapes: Shape[]
	imageSrc?: ImageSrc
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

interface ImageSrc {
	url: string,
	file_name: string,
	width: number,
	height: number,
}

export type { AnnotationsState, ShapeType, Shape, Class, Point, ImageSrc }
