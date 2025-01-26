import { Layer } from 'react-konva'
import Konva from 'konva'
import { Brush, Pen } from '../Tool'
import { useAnnotations } from '@context/Annotations';

interface Point {
	x: number;
	y: number;
}

interface CanvasSelectorProps {
	layerRef: React.RefObject<Konva.Layer>;
	points: Point[]
}

const CanvasSelector = ({layerRef, points}: CanvasSelectorProps) => {
	const { state } = useAnnotations();

	const renderBrushLayer = (): JSX.Element => (
		<Layer ref={layerRef}>
			<Brush />
		</Layer>
	);

	const renderPenLayer = (): JSX.Element => (
		<Layer>
			<Pen {...points} />
		</Layer>
	);

	switch (state.mode) {
		case 'brush':
			return renderBrushLayer();
		case 'polygon':
			return renderPenLayer();
	}
};

export { CanvasSelector }