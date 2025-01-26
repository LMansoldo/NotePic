import { useRef, useState } from 'react';
import type { ShapeType, Shape } from '@types';
import Konva from 'konva';
import { useAnnotations } from '@context';
import { Canvas } from '@components'
import { ToolSelector } from './ToolSelector';
import { CanvasSelector } from './CanvasSelector';

interface Point {
	x: number;
	y: number;
}

const Annotation = () => {
	const { state, dispatch } = useAnnotations();
  const layerRef = useRef<Konva.Layer>(null);
  const isDrawing = useRef(false);
  const [shapes, setShapes] = useState<Shape[]>(state.shapes as Shape[]);
  const [points, setPoints] = useState<Point[]>([]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (state.mode === 'brush' || state.mode === 'polygon') {
      isDrawing.current = true;
      const pos = e?.target?.getStage()?.getPointerPosition();
      if (!pos) return;
      const newShape: Shape = {
        type: state.mode as ShapeType,
        points: [pos.x, pos.y],
        color: state.selectedClass?.color || 'black',
        strokeWidth: state.brushSize || 1,
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
		}
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const pos = e?.target?.getStage()?.getPointerPosition();
    if (!pos) return;
    const index = shapes.length - 1;
    const updatedPoints = [...shapes[index].points, pos.x, pos.y];

    const updatedShapes = shapes.map((shape, i) =>
      i === index ? { ...shape, points: updatedPoints } : shape
    );
    setShapes(updatedShapes);
    layerRef.current?.batchDraw();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;

    dispatch({
      type: 'UPDATE_SHAPES',
      payload: shapes,
    });
  };

	const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = e?.target?.getStage()?.getPointerPosition();
    const pointerPosition = pos;

    if (pointerPosition) {
      setPoints((prev) => [...prev, { x: pointerPosition.x, y: pointerPosition.y }]);
    }
  };

	
	return (
		<div>
			<ToolSelector />
      <Canvas props={{
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onClick: handleStageClick
      }}>
        <CanvasSelector layerRef={layerRef} points={points} />
      </Canvas>
		</div>
	)
}

export { Annotation }