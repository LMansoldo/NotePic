import { useState } from 'react'
import { Button } from '@components'
import styles from './Menu.module.css'
import { LiaBrushSolid } from 'react-icons/lia'
import { useAnnotations } from '@context'

const Menu = () => {
	const { state, dispatch } = useAnnotations()
	const [isActive, setIsActive] = useState(false)

	const handleBrushSizeSelection = (size: number) => {
		dispatch({ type: 'SET_MODE', payload: 'brush' })
		dispatch({ type: 'SET_BRUSH_SIZE', payload: size })
		setIsActive(false)
	}

	return (
		<div className={styles.menu}>
			<Button
				disabled={state.selectedClass ? false : true}
				selected={state.mode === 'brush' ? true : false}
				shape="circle"
				size="small"
				onClick={() => setIsActive(true)}
			>
				<LiaBrushSolid />
			</Button>
			{isActive && (
				<div className={styles.menuContent}>
					<Button
						onClick={() => handleBrushSizeSelection(1)}
						size="small"
						shape="circle"
					>
						<div
							style={{
								border: '1px solid #000',
								width: '3px',
								height: '3px',
								borderRadius: '40px',
								background: '#000',
							}}
						/>
					</Button>
					<Button
						onClick={() => handleBrushSizeSelection(3)}
						size="small"
						shape="circle"
					>
						<div
							style={{
								border: '1px solid #000',
								width: '10px',
								height: '10px',
								borderRadius: '40px',
								background: '#000',
							}}
						/>
					</Button>
					<Button
						onClick={() => handleBrushSizeSelection(10)}
						size="small"
						shape="circle"
					>
						<div
							style={{
								border: '1px solid #000',
								width: '12px',
								height: '12px',
								borderRadius: '40px',
								background: '#000',
							}}
						/>
					</Button>
				</div>
			)}
		</div>
	)
}

export { Menu }
