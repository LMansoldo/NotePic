interface AnnotationsState {
	mode?: string;
	brushSize?: number;
	classes: Class[];
	selectedClass?: string | null;
	shapes: string[];
}

type ShapeType = 'brush' | 'polygon';

interface Shape {
  type: ShapeType;
  points: number[];
  color: string;
  strokeWidth: number;
}

interface Class {
  name: string;
  color: string;
}


export type { AnnotationsState, ShapeType, Shape, Class }