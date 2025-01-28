# Annotations Context

This directory contains the context implementation for managing annotations in the application. It includes the state management setup using React's Context API and useReducer hook.

State management was designed this way because if we want to add new functionalities to the canvas, we don't need to worry about synchronizing states between components. This makes the extension more practical and access to annotation data simpler.

## Files Overview

### 1. `types.ts`

This file defines the types for the actions that can be dispatched to the annotations reducer.

```typescript
// filepath: NotePic/src/context/Annotations/types.ts
import type { ShapeType, Class, Shape } from '@types'

export type AnnotationAction =
	| { type: 'SET_MODE'; payload: ShapeType }
	| { type: 'SET_BRUSH_SIZE'; payload: number }
	| { type: 'SET_SHAPES'; payload: Shape[] }
	| { type: 'ADD_CLASS'; payload: Class }
	| { type: 'SELECT_CLASS'; payload: Class }
	| { type: 'ADD_SHAPE'; payload: Shape }
	| { type: 'UPDATE_SHAPES'; payload: Shape[] }
	| { type: 'UNDO_SHAPE' }
```

### 2. `Reducer.ts`

This file contains the reducer function that handles state transitions based on the dispatched actions.

```typescript
import type { AnnotationAction } from '@context'
import type { AnnotationsState, Shape, Class } from '@types'

const AnnotationsReducer = (
	state: AnnotationsState,
	action: AnnotationAction,
): AnnotationsState => {
	switch (action.type) {
		case 'SET_MODE':
			return { ...state, mode: action.payload }
		case 'SET_BRUSH_SIZE':
			return { ...state, brushSize: action.payload }
		case 'SET_SHAPES':
			return { ...state, shapes: action.payload }
		case 'ADD_CLASS':
			return {
				...state,
				classes: [...state.classes, action.payload],
			}
		case 'SELECT_CLASS':
			return { ...state, selectedClass: action.payload as Class }
		case 'ADD_SHAPE':
			return { ...state, shapes: [...state.shapes, action.payload] as Shape[] }
		case 'UPDATE_SHAPES':
			return {
				...state,
				shapes: action.payload,
			}
		case 'UNDO_SHAPE':
			return { ...state, shapes: state.shapes?.slice(0, -1) }
		default:
			throw new Error(`Unknown action type`)
	}
}

export { AnnotationsReducer }
```

### 3. `Provider.tsx`

This file sets up the context provider component that wraps the application and provides the state and dispatch function to the rest of the app.

```typescript
import React, { useReducer } from 'react'
import {
    initialState,
    AnnotationsContext,
    AnnotationsReducer,
} from '@context/Annotations'

const AnnotationsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(AnnotationsReducer, initialState)

    return (
        <AnnotationsContext.Provider value={{ state, dispatch }}>
            {children}
        </AnnotationsContext.Provider>
    )
}

export { AnnotationsProvider }
```

### 4. `initialState.ts`

This file defines the initial state for the annotations context.

```typescript
const initialState = {
	mode: 'anchorPen',
	brushSize: 5,
	classes: [{ name: 'Object', color: '#532ee3' }],
	selectedClass: { name: 'Object', color: '#532ee3' },
	shapes: [],
	imageSrc: {
		url: 'src/assets/',
		file_name: 'image_overview.jpg',
		width: 480,
		height: 360,
	},
}

export { initialState }
```

### 5 `Context.ts`

This file creates the context and provides a custom hook for accessing the annotations context.

```typescript
import { createContext, useContext } from 'react'

import type { AnnotationAction } from '@context/Annotations'
import type { AnnotationsState } from '@types'

import { initialState } from './initialState'

const AnnotationsContext = createContext<{
	state: AnnotationsState
	dispatch: React.Dispatch<AnnotationAction>
}>({ state: initialState, dispatch: () => null })

const useAnnotations = () => useContext(AnnotationsContext)

export { useAnnotations, AnnotationsContext }
```

### Usage

To use the annotations context in your application, wrap your component tree with the `AnnotationsProvider` and use the `useAnnotations` hook to access the state and dispatch function.

```typescript
import React from 'react'
import { AnnotationsProvider, useAnnotations } from '@context/Annotations'

const App = () => {
  return (
    <AnnotationsProvider>
      <YourComponent />
    </AnnotationsProvider>
  )
}

const YourComponent = () => {
  const { state, dispatch } = useAnnotations()

  // Use state and dispatch as needed
}
```
