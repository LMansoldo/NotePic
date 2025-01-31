import React from 'react'
import { Circle } from 'react-konva'
import type { AnchorProps } from '@types'

const Anchor: React.FC<AnchorProps> = ({ x, y, onDrag }) => {
  return (
    <Circle
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

export default Anchor