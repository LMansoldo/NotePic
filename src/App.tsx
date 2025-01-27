import { MainLayout } from '@layout/MainLayout'
import { AnnotationsProvider } from '@context/Annotations'
import { Annotation } from '@components'

function App() {
	return (
		<AnnotationsProvider>
			<MainLayout>
			
					<Annotation />
	
			</MainLayout>
		</AnnotationsProvider>
	)
}

export default App
