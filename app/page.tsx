'use client';

import { JSX, useState } from 'react';
import { Card } from './components';
import styles from './page.module.css';

const initialData = [
	{
		id: "1",
		title: "Как работать с CSS Grid",
		excerpt: "Грид-раскладка (CSS Grid Layout) представляет собой двумерную систему сеток в CSS. Гриды подойдут и для верстки основных областей страницы..",
		image: "/mini.png",
		category: "Front-end",
		publishedAt: "1 месяц назад",
		readingTime: "3 минуты",
		likesCount: 0,
		userLiked: false,
	},
	{
		id: "2",
		title: "Как работать с CSS Grid",
		excerpt: "Грид-раскладка (CSS Grid Layout) представляет собой двумерную систему сеток в CSS. Гриды подойдут и для верстки основных областей страницы..",
		image: "/mini.png",
		category: "Front-end",
		publishedAt: "1 месяц назад",
		readingTime: "3 минуты",
		likesCount: 0,
		userLiked: false,
	},
	{
		id: "3",
		title: "Как работать с CSS Grid",
		excerpt: "Грид-раскладка (CSS Grid Layout) представляет собой двумерную систему сеток в CSS. Гриды подойдут и для верстки основных областей страницы..",
		image: "/mini.png",
		category: "Front-end",
		publishedAt: "1 месяц назад",
		readingTime: "3 минуты",
		likesCount: 0,
		userLiked: false,
	}
];

export default function Home(): JSX.Element {
	const [posts, setPosts] = useState(initialData);

	const handleLikeToggle = async (postId: number | string, newState: boolean): Promise<void> => {
		setPosts((prevPosts) => prevPosts.map((post) => {
			if (post.id === postId) {
				return {
					...post,
					userLiked: newState,
					likesCount: newState ? post.likesCount + 1 : post.likesCount - 1,
				};
			}
			return post;
		})
		);

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ userLiked: newState }),
			});

			if (!response.ok) throw new Error('PATCH failed');
		} catch (error) {
			setPosts((prevPosts) =>
				prevPosts.map((post) => {
					if (post.id === postId) {
						return {
							...post,
							userLiked: !newState,
							likesCount: !newState ? post.likesCount + 1 : post.likesCount - 1
						};
					}
					return post;
				})
			);
			console.error(error);
			throw error;
		}
	};



	return (
		<div className={styles.cardGrid}>
			{posts.map((card) => (
				<Card
					key={card.id}
					{...card}
				/>
			))}
		</div>
	);
}
