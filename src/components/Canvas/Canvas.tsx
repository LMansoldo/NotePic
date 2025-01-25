import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import { useAnnotations } from '@context';

import type { ShapeType, Shape } from '@types';

const Canvas = () => {
  const { state, dispatch } = useAnnotations();
  const layerRef = useRef<Konva.Layer>(null);
  const isDrawing = useRef(false);
  const [shapes, setShapes] = useState<Shape[]>(state.shapes as Shape[]);

  useEffect(() => {
    setShapes(state.shapes);
  }, [state.shapes]);

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

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer ref={layerRef}>
        {shapes.map((shape, i) => (
          <Line
            key={i}
            points={shape.points}
            stroke={shape.color}
            strokeWidth={shape.strokeWidth}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            closed={shape.type === 'polygon'}
            draggable
          />
        ))}
      </Layer>
    </Stage>
  );
};

export { Canvas };