'use client'

import { JSX, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostPageComponentProps } from './PostPageComponent.props';
import styles from './PostPageComponent.module.css';
import { Comment, CommentForm, Like } from '@/components';
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
		<main id="main-content" aria-labelledby="post-title" className={styles.main}>
			<nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
				<Link href="/" className={styles.breadcrumbLink}>Главная</Link>
				<span className={styles.breadcrumbSeparator}>/</span>
				<Link href="/posts" className={styles.breadcrumbLink}>Посты</Link>
				<span className={styles.breadcrumbSeparator}>/</span>
				<span className={styles.breadcrumbCurrent} aria-current="page">{title}</span>
			</nav>
			<h1 id="post-title" className={styles.h1}>
				{title}
			</h1>
			<div className={styles.tagWrapper}>
				<span>{category}</span>
				<span className={styles.dot}>•</span>
				<span>{publishedAt}</span>
				<span className={styles.dot}>•</span>
				<span>{readingTime}</span>
				<span className={styles.dot}>•</span>
				<Like count={currentLikes} />
			</div>
			<div className={styles.heroImageWrapper}>
				<Image
					src={image}
					alt={title}
					width={1280}
					height={720}
					className={styles.image}
					priority
				/>
			</div>
			<article className={styles.textContent}>
				<p className={styles.body}>{body}</p>
			</article>
			{seoText && (
				<article className={styles.seoWrapper}>
					<div dangerouslySetInnerHTML={{ __html: seoText }}></div>
				</article>
			)}
			<div className={styles.likeSection}>
				<span>Понравилось? Жми</span>
				<LikeButton postId={postInfo.id} initialLiked={postInfo.userLiked} onLikeToggle={handleLikeToggle} />
			</div>
			<h2 className={styles.commentTitle}>Комментарии</h2>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
			<CommentForm postId={String(postInfo.id)} />
		</main >
	);
};