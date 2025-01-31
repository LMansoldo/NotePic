import { ToolSelector } from '../../annotation/ToolSelector'
import { ClassSelector } from '@components'
import styles from './Header.module.css'

const Header = () => {
	return (
		<header className={styles.header}>
			<ToolSelector />
			<ClassSelector />
		</header>
	)
}

export { Header }
