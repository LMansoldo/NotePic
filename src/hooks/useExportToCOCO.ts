import { useAnnotations } from '@context'

export const useExportToCOCO = () => {
  const { state } = useAnnotations()

  const exportToCOCO = () => {
    if (!state.imageSrc) {
      console.error('No image source available')
      return
    }

    const coco = {
      info: {
        description: 'COCO Dataset',
        version: '1.0',
        year: new Date().getFullYear(),
        contributor: 'User',
        date_created: new Date().toISOString().split('T')[0],
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
          file_name: state.imageSrc.file_name,
          width: state.imageSrc.width,
          height: state.imageSrc.height,
          date_captured: new Date().toISOString().split('T')[0],
          license: 1,
          coco_url: '',
          flickk_url: '',
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
          category_id: state.classes.findIndex((cls) => cls.color === shape.color) + 1,
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
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return exportToCOCO
}