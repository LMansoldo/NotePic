import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
	size = 'medium', 
	children, 
	className,
	...props 
}) => {
	const buttonClasses = `${styles.button} ${styles[size]} ${className || ''}`;

	return (
		<button className={buttonClasses} {...props}>
			{children}
		</button>
	);
};

export { Button }