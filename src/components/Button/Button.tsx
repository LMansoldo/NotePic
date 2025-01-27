import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonShape = 'circle' | 'flat'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize
	shape?: ButtonShape
	children: React.ReactNode
  selected?: boolean
	accentColor?: string; 
}

const Button: React.FC<ButtonProps> = ({
	size = 'medium',
	shape = 'flat',
	accentColor,
	children,
	className,
  selected,
	style,
	...props
}) => {
  const buttonClasses = `${styles.button} ${styles[size]} ${styles[shape]} ${selected && styles.selected} ${className || ''}`;

  return (
    <button
      className={buttonClasses}
      style={{
        '--button-accent-color': accentColor,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button }
