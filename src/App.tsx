import { MainLayout } from '@layout/MainLayout'
import { AnnotationsProvider } from '@context/Annotations'

function App() {
  return (
    <AnnotationsProvider>
      <MainLayout>
        <div>{/* Here goes my content */}</div>
      </MainLayout>
    </AnnotationsProvider>
  )
}

export default App
