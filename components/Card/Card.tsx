import React, { JSX } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { CardProps } from './Card.props';
import styles from './Card.module.css';
import { Like } from '../Like/Like';
import ArrowIcon from './arrow.svg';
import Link from 'next/link';

export const Card = ({ title, excerpt, image, category, publishedAt, readingTime, likesCount, userLiked = false, link, className, ...props }: CardProps): JSX.Element => {
	return (
		<Link
			href={link}
			className={cn(styles.cardLink, className)}
			aria-label={`Читать статью «${title}»`}
			{...props}
		>
			<article className={styles.card}>
				<div className={styles.imageWrapper}>
					<Image
						src={image}
						alt=""
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className={styles.image}
						loading='eager'
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.metaTop}>
						<span className={styles.category}>{category}</span>
						<span className={styles.dot}>•</span>
						<span className={styles.date}>{publishedAt}</span>

						<Like
							count={likesCount}
							liked={userLiked}
							className={styles.like}
						/>
					</div>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.excerpt}>{excerpt}</p>
				</div>
				<div className={styles.metaBottom}>
					<span className={styles.readingTime}>{readingTime}</span>
					<span className={styles.readMore}>
						Читать <ArrowIcon className={styles.arrowIcon} aria-hidden />
					</span>
				</div>
			</article>
		</Link>
	);
};