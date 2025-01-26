import { useState } from 'react';
import { Line, Circle } from 'react-konva';

interface Point {
  x: number;
  y: number;
}

const Pen = (points: Point[]) => {
	const [scopePoints, setScopePoints] = useState<Point[]>(points);

  if (scopePoints.length > 1) return (
    <Line
      points={points.flatMap((point) => [point.x, point.y])}
      stroke="#532ee3"
      strokeWidth={2}
      tension={0.5} 
      lineCap="round"
      lineJoin="round"
    />
  )

  return scopePoints.map((point, index) => (
    <Circle
      key={index}
      x={point.x}
      y={point.y}
      radius={5}
      fill="#ff5722"
      draggable
      onDragMove={(e) => {
        const newPoints = [...points];
        newPoints[index] = { x: e.target.x(), y: e.target.y() };
        setScopePoints(newPoints);
      }}
    />
  ))
};

export { Pen };