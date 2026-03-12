import { JSX } from 'react';
import { Card } from './components';
import styles from './page.module.css';
import { getPosts } from '@/api/posts';

export default async function Home(): Promise<JSX.Element> {
	const posts = await getPosts();

	// const handleLikeToggle = async (postId: number | string, newState: boolean): Promise<void> => {
	// 	setPosts((prevPosts) => prevPosts.map((post) => {
	// 		if (post.id === postId) {
	// 			return {
	// 				...post,
	// 				userLiked: newState,
	// 				likesCount: newState ? post.likesCount + 1 : post.likesCount - 1,
	// 			};
	// 		}
	// 		return post;
	// 	})
	// 	);

	// 	try {
	// 		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
	// 			method: 'PATCH',
	// 			headers: { 'Content-type': 'application/json' },
	// 			body: JSON.stringify({ userLiked: newState }),
	// 		});

	// 		if (!response.ok) throw new Error('PATCH failed');
	// 	} catch (error) {
	// 		setPosts((prevPosts) =>
	// 			prevPosts.map((post) => {
	// 				if (post.id === postId) {
	// 					return {
	// 						...post,
	// 						userLiked: !newState,
	// 						likesCount: !newState ? post.likesCount + 1 : post.likesCount - 1
	// 					};
	// 				}
	// 				return post;
	// 			})
	// 		);
	// 		console.error(error);
	// 		throw error;
	// 	}
	// };

	return (
		<div className={styles.cardGrid} >
			{
				posts.map((post) => (
					<Card
						key={post.id}
						image={'/mini.png'}
						title={post.title}
						excerpt={post.body}
						category='Front-end'
						publishedAt='1 месяц назад'
						readingTime='3 минуты'
						likesCount={4}
					/>
				))
			}
		</div>
	);
}
