import { Button } from '@components'
import { LiaEraserSolid, LiaPenFancySolid, LiaUndoSolid } from 'react-icons/lia'
import { useAnnotations } from '@context'
import { BrushMenu } from '@annotation/BrushMenu'
import Export from '../Tool/Export'
import styles from './ToolSelector.module.css'

interface ToolConfig {
  icon: JSX.Element
  action: () => void
  disabled: boolean
  selected: boolean
}

const ToolSelector = () => {
  const { state, dispatch } = useAnnotations()

  const toolsConfig: Record<string, ToolConfig> = {
    anchorPen: {
      icon: <LiaPenFancySolid />,
      action: () => dispatch({ type: 'SET_MODE', payload: 'anchorPen' }),
      disabled: !state.selectedClass,
      selected: state.mode === 'anchorPen'
    },
    eraser: {
      icon: <LiaEraserSolid />,
      action: () => dispatch({ type: 'SET_MODE', payload: 'eraser' }),
      disabled: !state.selectedClass,
      selected: state.mode === 'eraser'
    },
    undo: {
      icon: <LiaUndoSolid />,
      action: () => dispatch({ type: 'UNDO_SHAPE' }),
      disabled: state.shapes.length === 0,
      selected: false
    }
  }

  return (
    <div className={styles.toolSelector}>
      <BrushMenu />
      {Object.entries(toolsConfig).map(([key, config]) => (
        <Button
          key={key}
          onClick={config.action}
          disabled={config.disabled}
          selected={config.selected}
          size="small"
          shape="circle"
        >
          {config.icon}
        </Button>
      ))}
      <Export />
    </div>
  )
}

export { ToolSelector }