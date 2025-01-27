import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
	onFocus: (value: string) => void;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
	onFocus,
  label,
  type = 'text',
  placeholder = '',
  error = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

	const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFocus(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        id={label}
        type={type}
        value={value}
        onChange={handleChange}
				onFocus={handleFocus}
        placeholder={placeholder}
        className={styles.inputField}
      />
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export { Input }
