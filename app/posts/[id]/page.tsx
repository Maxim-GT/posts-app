import { JSX } from 'react';

import styles from './page.module.css';
import Pagination from '@/components/Pagination/Pagination';
import { Card } from '@/components';
import { getPosts, getPost } from '@/api/posts';
import { notFound } from 'next/navigation';

export interface IPostPage {
	params: Promise<{ id: string }>
}

export async function generateStaticParams() {
	const posts = await getPosts();
	if (!posts) return [];

	return posts.map(post => (
		{ id: String(post.id) }
	));

}

export default async function PostsPage({ params }: IPostPage): Promise<JSX.Element> {
	const { id } = await params;
	const postInfo = await getPost(Number(id));

	if (!postInfo) {
		notFound();
	}

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
		<>
			Страница с id: {postInfo?.id}
		</>

	);
}
