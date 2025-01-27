import React from 'react'
import styles from './MainLayout.module.css'

const MainLayout = ({
	children,
	...props
}: { children: React.ReactNode } & React.ComponentProps<'main'>) => {
	return <main {...props} className={styles.mainLayout}>{children}</main>
}

export default MainLayout
