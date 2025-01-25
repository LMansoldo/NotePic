# Front-end take-home test for Overview.ai

## Overview

This front-end application project allows users to annotate semantic segmentation data interactively using brush tools or polygon drawing. The application should feature a responsive design, supporting smaller screens while maintaining usability. The final product will allow users to upload images, configure classes, annotate data, and export the results in COCO format.

## The Task

Your task is to create a semantic segmentation labeling tool with the following functionality:

1. **Annotation Options**:

   - Toggle between **brush annotation** and **polygon annotation** modes.
   - Allow users to choose the brush size when in brush mode.

2. **Class Management**:

   - Provide a way to define class names and assign a unique color to each class.
   - Ensure no overlap of colors (pixels should only belong to one class).

3. **Editing Tools**:

   - Include an eraser tool to remove annotations.
   - Provide undo functionality to reverse the last action.

4. **Canvas**:

   - Use Fabric.js (or any equivalent library) for interactive canvas manipulation.
   - Ensure a responsive layout suitable for smaller screens.

5. **Export Features**:
   - Provide an option to export the annotations in **COCO format**.

## Stacks

- **Frontend Framework**: React.js
- **UI Libraries**: You may use any prebuilt component library such as Ant Design, Material UI, or similar.
- **Canvas Manipulation**: Fabric.js (or an equivalent library).

## Prerequisites

Ensure the application meets the following requirements:

- **Responsive Design**: The interface should adapt gracefully to smaller screens.
- **Clear Documentation**: Include a README file with setup instructions and a solution description.
- **Interactive Menu**:
  - Options for switching between annotation modes.
  - Dropdown or input for setting class names and colors.
  - Brush size selector.

## Bonus Points

- Ensure that no pixel can have more than one class.
- Provide real-time feedback on the selected tool and active class.
- Include documentation for setting up and using the application.

## COCO Format

The exported annotations should conform to the [COCO dataset format](https://www.immersivelimit.com/tutorials/create-coco-annotations-from-scratch/#coco-dataset-format). Ensure you include:

- `images`: A list of images with their file names, height, and width.
- `annotations`: The segmentation information encoded in RLE.
- `categories`: The list of class names and their corresponding IDs.

## Application reference

You can reference the [label studio page](https://labelstud.io/playground) (check the sections _Brush Segmentation_ and _Polygon segmentation_). Don't feel obligated to follow that style and or implementation.

## Evaluation Criteria

- Completeness of the required features.
- Code readability and structure.
- Design and usability of the interface.
- Correctness and adherence to the COCO format for exported annotations.
- Bonus points for additional features as described above.
- Creativity.
- User experience.

## Delivery

1. **Repository**:

   - Create a **private** GitHub repository for the project.
   - Add Adriano (@opassos) and Xiao (@xyk2) as collaborators.

2. **Video Demo**:

   - Record a video demonstrating your solution (2 to 5 minutes). Showcase the application's functionality, focusing on the implemented key features and bonus points.
   - Upload the video to a streaming service (e.g., YouTube) as an **unlisted** video.

3. **Submission**:
   - Provide the GitHub repository link and video link.
   - Ensure your repository includes all necessary files for running the project locally (e.g., `package.json`, instructions in the `README` file).

Good luck!
