import { JSX } from 'react';
import { TextareaProps } from './Textarea.props';
import cn from 'classnames';
import styles from './Textarea.module.css';


export const Textarea = ({ error, className, ...props }: TextareaProps): JSX.Element => {
	return (
		<div className={cn(className, styles.textareaWrapper,)}>
			<textarea className={cn(styles.textarea, {
				[styles.error]: error
			})} {...props} />
			{error && <div className={styles.errorMessage}>{error.message}</div>}
		</div>
	);
};