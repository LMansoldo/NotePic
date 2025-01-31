import React, { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import type { Point, CanvasComponent, CustomLayerProps, LineProps, AnchorProps } from '@types'
import { Stage, Line, Circle as KonvaCircle, Layer as KonvaLayer } from 'react-konva'
import styles from './Canvas.module.css'
import { useAnnotations } from '@context'

const Canvas: CanvasComponent = ({ children, ...props }) => {
  const stageRef = useRef<Konva.Stage>(null)
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth, 1024),
    height: Math.min(window.innerHeight, 768),
  })

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 1024 ? window.innerWidth : 1024
      const newHeight = window.innerHeight < 768 ? window.innerHeight - 150 : 768
      setDimensions({
        width: newWidth,
        height: newHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ overflow: 'hidden', cursor: 'crosshair' }}>
      <Stage
        width={dimensions.width}
        height={dimensions.height - 100}
        ref={stageRef}
        className={styles.canvasContainer}
        {...props}
      >
        {children}
      </Stage>
    </div>
  )
}

const LayerComponent: React.FC<CustomLayerProps> = 
({ children }) => {
  const { state } = useAnnotations()

  return (
    <KonvaLayer>
      {state.shapes.map((shape, index) => (
        <Line
          key={index}
          points={shape.points}
          stroke={shape.color}
          fill={shape.color}
          opacity={0.5}
          strokeWidth={shape.strokeWidth}
          tension={0}
          lineCap="round"
          lineJoin="round"
          closed={true}
        />
      ))}
      {children}
    </KonvaLayer>
  )
}

const LineComponent: React.FC<LineProps> = ({
  points,
  color,
  strokeWidth,
  opacity = 0.7,
  closed = false,
}) => {
  return (
    <Line
      points={points}
      stroke={color}
      strokeWidth={strokeWidth}
      tension={0}
      lineCap="round"
      lineJoin="round"
      opacity={opacity}
      closed={closed}
    />
  )
}

const Anchor: React.FC<AnchorProps> = ({ x, y, onDrag }) => {
  return (
    <KonvaCircle
      x={x}
      y={y}
      radius={5}
      fill="red"
      draggable
      onDragEnd={(e) => {
        onDrag(e.target.x(), e.target.y())
      }}
    />
  )
}

const Anchors = ({ points, onDrag }: { 
  points: Point[] 
  onDrag: (index: number, x: number, y: number) => void 
}) => (
  <>
    {points.map((point, index) => (
      <Canvas.Anchor
        key={index}
        x={point.x}
        y={point.y}
        onDrag={(x, y) => onDrag(index, x, y)}
      />
    ))}
  </>
)

const Eraser = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => (
  <Canvas.Circle
    x={x}
    y={y}
    radius={radius}
    stroke="#000"
    fill="#FFF"
    strokeWidth={1}
  />
)


const CircleComponent = ({ x, y, radius, ...props }: Konva.CircleConfig) => (
  <KonvaCircle x={x} y={y} radius={radius} {...props} />
)

Canvas.Layer = LayerComponent as typeof KonvaLayer
Canvas.Anchor = Anchor
Canvas.Line = LineComponent
Canvas.Anchors = Anchors
Canvas.Circle = CircleComponent
Canvas.Eraser = Eraser

export { Canvas }