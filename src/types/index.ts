import Konva from "konva"
import { Layer } from "react-konva"

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
	url: string
	file_name: string
	width: number
	height: number
}

interface CustomLayerProps {
  children?: React.ReactNode;
}

interface AnchorProps {
  x: number
  y: number
  onDrag: (x: number, y: number) => void
}

interface LineProps {
  points: number[];
  color: string;
  strokeWidth: number;
  opacity?: number;
  closed?: boolean;
}

interface AnchorsProps {
  points: Point[];
  onDrag: (index: number, x: number, y: number) => void;
}

interface EraserProps {
  x: number;
  y: number;
  radius: number;
}

interface CanvasProps {
	children: React.ReactNode
	onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onDblClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseDown?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseMove?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onMouseUp?: () => void
	onTouchStart?: (e: Konva.KonvaEventObject<TouchEvent>) => void
	onTouchMove?: (e: Konva.KonvaEventObject<TouchEvent>) => void
	onTouchEnd?: (e: Konva.KonvaEventObject<TouchEvent>) => void
}


type CanvasComponent = React.FC<CanvasProps> & {
  Layer: typeof Layer;
  Line: React.FC<LineProps>;
  Anchor: React.FC<AnchorProps>;
  Anchors: React.FC<AnchorsProps>;
  Eraser: React.FC<EraserProps>;
  Circle: React.FC<Konva.CircleConfig>;
};


export type { CustomLayerProps, AnchorProps, AnchorsProps, EraserProps, AnnotationsState, ShapeType, Shape, Class, Point, ImageSrc, CanvasComponent, CanvasProps, LineProps }
