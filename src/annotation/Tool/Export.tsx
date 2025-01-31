import { useAnnotations } from '@context'
import { Button } from '@components'
import { LiaFileExportSolid } from 'react-icons/lia'
const Export = () => {
	const { state } = useAnnotations()

	const exportToCOCO = () => {
		const coco = {
			info: {
				description: 'COCO Dataset',
				version: '1.0',
				year: 2025,
				contributor: 'User',
				date_created: '2025-01-27',
				url: 'http://example.com/dataset',
			},
			licenses: [
				{
					id: 1,
					name: 'Default License',
					url: 'http://example.com/license',
				},
			],
			images: [
				{
					id: 1,
					file_name: state.imageSrc?.file_name,
					width: state.imageSrc?.width,
					height: state.imageSrc?.height,
					date_captured: '2025-01-27',
					license: 1,
					coco_url: '',
					flickr_url: '',
				},
			],
			annotations: state.shapes.map((shape, idx) => {
				const xPoints = shape.points.filter((_, i) => i % 2 === 0)
				const yPoints = shape.points.filter((_, i) => i % 2 !== 0)

				const xMin = Math.min(...xPoints)
				const yMin = Math.min(...yPoints)
				const width = Math.max(...xPoints) - xMin
				const height = Math.max(...yPoints) - yMin

				return {
					id: idx + 1,
					image_id: 1,
					category_id:
						state.classes.findIndex((cls) => cls.color === shape.color) + 1,
					segmentation: [shape.points],
					area: width * height,
					bbox: [xMin, yMin, width, height],
					iscrowd: 0,
				}
			}),
			categories: state.classes.map((cls, idx) => ({
				id: idx + 1,
				name: cls.name,
				supercategory: '',
			})),
		}

		const blob = new Blob([JSON.stringify(coco, null, 2)], {
			type: 'application/json',
		})
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'annotations.json'
		a.click()
	}

	return (
		<Button shape="circle" size="small" onClick={exportToCOCO}>
			<LiaFileExportSolid />
		</Button>
	)
}

export default Export
