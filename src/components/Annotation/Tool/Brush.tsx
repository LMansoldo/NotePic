import { Line } from 'react-konva';
import { useAnnotations } from '@context';

const Brush = () => {
  const { state } = useAnnotations();

  return state.shapes.map((shape, i) => (
    <Line
      key={i}
      points={shape.points}
      stroke={shape.color}
      strokeWidth={shape.strokeWidth}
      tension={1}
      lineCap="round"
      lineJoin="round"
      closed={true}
      draggable
    />
  ))

};

export { Brush }