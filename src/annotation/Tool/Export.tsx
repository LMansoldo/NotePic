import { Button } from '@components'
import { useExportToCOCO } from '@hooks/useExportToCOCO'
import { LiaFileExportSolid } from 'react-icons/lia'

const Export = () => {
  const handleExport = useExportToCOCO()

	return (
		<Button shape="circle" size="small" onClick={handleExport}>
			<LiaFileExportSolid />
		</Button>
	)
}

export default Export
