import { CommentProps } from './Comment.props';
import styles from './Comment.module.css';
import cn from 'classnames';
import { JSX } from 'react';
import GitIcon from './github.svg';


export const Comment = ({ comment: { name, body, email }, className, ...props }: CommentProps): JSX.Element => {

	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<div className={styles.header}>
				<span className={styles.headerName}>{name}</span>
				<span className={styles.dot}>•</span>
				<span className={styles.headerEmail}>{email}</span>
			</div>
			<div className={styles.body}>{body}</div>
		</div>
	);
};