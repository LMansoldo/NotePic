import { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
	children: ReactNode
	className?: string
	imgSrc?: string
}

const Card = ({ children, className = '', imgSrc }: CardProps) => {
	const cardStyle = {
		backgroundImage: imgSrc ? `url(${imgSrc})` : 'none',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
	}

	return (
		<div className={`${styles.card} ${className}`} style={cardStyle}>
			{children}
		</div>
	)
}

export { Card }
