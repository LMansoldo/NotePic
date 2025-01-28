# NotePic Solution Description

## Overview

NotePic is a React-based application designed to provide a robust and user-friendly interface for creating and managing annotations on images. The application leverages the power of Konva and React-Konva to handle complex canvas operations, allowing users to draw, edit, and erase annotations with ease.

## Key Features

1. **Annotation Tools**: NotePic provides a variety of tools for creating annotations, including:

   - **Brush**: For freehand drawing.
   - **AnchorPen**: For creating shapes with anchor points.
   - **Eraser**: For removing annotations.

2. **State Management**: The application uses React's Context API and useReducer hook to manage the state of annotations. This ensures that the state is centralized and easily accessible across different components.

3. **Konva Integration**: Konva and React-Konva are used to handle the rendering and manipulation of shapes on the canvas. This allows for efficient and smooth interactions with the annotations.

## Project Structure

The project is organized into several key directories and files:

- **src/context/Annotations**: Contains the context implementation for managing annotations.

  - `types.ts`: Defines the types for actions that can be dispatched to the annotations reducer.
  - `Reducer.ts`: Contains the reducer function that handles state transitions based on dispatched actions.
  - `Provider.tsx`: Sets up the context provider component that wraps the application.
  - `initialState.ts`: Defines the initial state for the annotations context.
  - `index.ts`: Re-exports all modules in the `Annotations` context directory.
  - `Context.ts`: Creates the context and provides a custom hook for accessing the annotations context.

- **src/components/Annotation/Tool**: Contains the tools for creating and managing annotations on the canvas.

  - `AnchorPen.tsx`: Tool for creating shapes with anchor points.
  - `Brush.tsx`: Tool for freehand drawing.
  - `Eraser.tsx`: Tool for removing annotations.

- **src/components**: Contains other UI components used in the application.
  - `Annotation.tsx`: Main component that renders the annotation tools and handles the state.
  - `ClassList.tsx`: Component for displaying a list of annotation classes.
  - `ClassSelector.tsx`: Component for selecting an annotation class.
  - `Export.tsx`: Component for exporting the annotations.
  - `ToolSelector.tsx`: Component for selecting the annotation tool.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Scripts

The following scripts are available in the project:

- `dev`: Starts the development server using Vite.
- `build`: Builds the project using TypeScript and Vite.
- `lint`: Runs Prettier and ESLint to check and fix code style issues.
- `preview`: Previews the built project using Vite.
  You can run these scripts using npm:

```
npm run dev
npm run build
npm run lint
npm run preview
```

### Documentation Structure

Detailed use case documentation **has been created** in `.md` files located within each folder of this repository. This **modular approach** helps you:

- **Explore** how each component or feature works.
- **Understand** the app’s architecture by reviewing documentation **specific to its context**.

For example:

- Check `src/components/Annotations/README.md` for Annotations interaction guidelines.

This structure ensures **contextual documentation** is always placed where it’s most relevant.
