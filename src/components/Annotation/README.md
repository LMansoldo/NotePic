# Project Components Overview

This document provides an overview of the key components in the project, explaining their purpose and functionality.

## 1. `Annotation.tsx`

This component is the main annotation interface. It renders different tools based on the current mode and displays the image to be annotated.

## 2. `Anchor.tsx`

This component renders draggable anchor points for the `AnchorPen` tool.

## 3. `ClassList.tsx`

This component displays a list of classes that can be selected for annotation.

## 4. `ClassSelector.tsx`

This component allows the user to add new classes for annotation.

## 5. `LayerManager.tsx`

This component manages the layers in the Konva canvas, rendering shapes and children components.

## 6. `LineDraw.tsx`

This component renders a line on the Konva canvas.

## 7. `Export.tsx`

This component provides functionality to export annotations to a COCO dataset format.

## 8. `Eraser.tsx`

This component provides the eraser tool functionality for removing shapes from the canvas.

## 9. `Brush.tsx`

This component provides the brush tool functionality for drawing shapes on the canvas.

## 10. `AnchorPen.tsx`

This component provides the anchor pen tool functionality for creating shapes with anchor points on the canvas.
