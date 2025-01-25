import { MainLayout } from '@layout/MainLayout'
import { LiaPaintBrushSolid } from "react-icons/lia";
import { AnnotationsProvider } from '@context/Annotations'
import { Button, Canvas, Card } from "@components"

function App() {
  return (
    <AnnotationsProvider>
      <MainLayout>
      <Card>
        <Canvas />
      <Button shape="circle" size='small'>
          <LiaPaintBrushSolid />
        </Button>
        <Button shape="flat" size='small'>
          Class
        </Button>
        <Button shape="flat" size='medium'>
          Class
        </Button>
      </Card>
      </MainLayout>
    </AnnotationsProvider>
  )
}

export default App
