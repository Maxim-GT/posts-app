import { JSX } from 'react';
import cn from 'classnames';
import styles from './Like.module.css';
import { LikeProps } from './Like.props';
import LikeIcon from './like.svg';

export const Like = ({ count, liked = false, className, ...props }: LikeProps): JSX.Element => {
	return (<>
		<div
			className={cn(styles.like, className)}
			{...props}
		>
			<span>{count}</span>
			<LikeIcon className={cn(styles.likeIcon, { [styles.active]: liked })} />
		</div >
	</>);
};