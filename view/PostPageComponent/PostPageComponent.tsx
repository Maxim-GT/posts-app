'use client'

import { JSX, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { PostPageComponentProps } from './PostPageComponent.props';
import styles from './PostPageComponent.module.css';
import { Comment, Like } from '@/components';
import { LikeButton } from '@/components/LikeButton/LikeButton';

export const PostPageComponent = ({ postInfo, comments }: PostPageComponentProps): JSX.Element => {

	const { title, body, image, category, publishedAt, readingTime, seoText, likesCount } = postInfo;

	const [currentLikes, setCurrentLikes] = useState<number>(likesCount);

	const handleLikeToggle = async (postId: number | string, newState: boolean): Promise<void> => {
		setCurrentLikes((prev) => newState ? prev + 1 : prev - 1)
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ userLiked: newState }),
			});

			if (!response.ok) throw new Error('PATCH failed');
		} catch (error) {
			console.error(error);
			setCurrentLikes((prev) => !newState ? prev + 1 : prev - 1);
			throw error;
		}
	};

	return (
		<main>
			<h1 className={styles.h1}>{title}</h1>
			<div className={styles.tagWrapper}>
				<span>{category}</span>
				<span className={styles.dot}>•</span>
				<span>{publishedAt}</span>
				<span className={styles.dot}>•</span>
				<span>{readingTime}</span>
				<span className={styles.dot}>•</span>
				<Like count={currentLikes} />
			</div>
			<Image
				src={image}
				alt={title}
				width={697}
				height={440}
				className={styles.image}
				priority
			/>
			<div className={styles.body}>{body}</div>
			{seoText && (
				<div className={styles.seoWrapper}>
					<div dangerouslySetInnerHTML={{ __html: seoText }}></div>
				</div>
			)}
			<div className={styles.likeSection}>
				<span>Понравилось? Жми</span>
				<LikeButton postId={postInfo.id} initialLiked={postInfo.userLiked} onLikeToggle={handleLikeToggle} />
			</div>
			<div>

			</div>
			<h2 className={styles.commentTitle}>Комментарии</h2>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</main >
	);
};