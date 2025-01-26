interface AnnotationsState {
	mode?: string;
	brushSize?: number;
	classes: Class[];
	selectedClass?: Shape | null;
	shapes: Shape[];
}

type ShapeType = 'brush' | 'polygon' | 'eraser';

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