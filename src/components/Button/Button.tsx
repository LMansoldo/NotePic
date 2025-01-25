import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonShape = 'circle' | 'flat'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	shape?: ButtonShape;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
	size = 'medium', 
	shape = 'flat',
	children, 
	className,
	...props 
}) => {
	const buttonClasses = `${styles.button} ${styles[size]} ${styles[shape]} ${className || ''}`;
	return (
			<button className={buttonClasses} {...props}>
				{children}
			</button>

	);
};

export { Button }