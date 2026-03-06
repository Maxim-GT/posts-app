'use client';

import { JSX, useState } from 'react';
import cn from 'classnames';
import styles from './LikeButton.module.css';
import { LikeButtonProps } from './LikeButton.props';
import LikeIcon from './like.svg';

export const LikeButton = ({ postId, initialLiked = false, onLikeToggle, className, ...props }: LikeButtonProps): JSX.Element => {
	const [isLiked, setIsLiked] = useState<boolean>(initialLiked);

	const handleClick = async (): Promise<void> => {
		const newState = !isLiked;
		setIsLiked(newState);

		try {
			await onLikeToggle(postId, newState);
		} catch (error) {
			console.error(error);
			setIsLiked(!newState);
		}
	};

	return (<>
		<button
			className={cn(styles.likeButton, className, { [styles.active]: isLiked })}
			{...props}
			onClick={handleClick}
			type="button"
		>
			<LikeIcon className={styles.likeIcon} />
		</button >
	</>);
};