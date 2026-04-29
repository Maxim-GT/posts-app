import { JSX } from 'react';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

export const Button = ({ children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className)}
			{...props}
		>
			{children}
		</button >
	);
};