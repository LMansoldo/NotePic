import { MainLayout } from '@layout/MainLayout'
import { AnnotationsProvider } from '@context/Annotations'
import { Button } from "@components"

function App() {
  return (
    <AnnotationsProvider>
      <MainLayout>
        <Button>
          Test
        </Button>
      </MainLayout>
    </AnnotationsProvider>
  )
}

export default App
