import { JSX } from 'react';

import styles from './page.module.css';
import { getPosts } from '@/services/posts';
import Pagination from '@/components/Pagination/Pagination';
import { Card } from '@/components';
import { AnimatedList } from './AnimatedList';

export interface IPostsListsPage {
	searchParams: Promise<{ page?: string }>
}

export default async function PostsListsPage({ searchParams }: IPostsListsPage): Promise<JSX.Element> {
	const posts = await getPosts();
	const { page } = await searchParams;

	const limit = 9;
	const currentPage = Number(page) || 1;

	const start = (currentPage - 1) * limit;
	const end = (start + limit);

	const displayedPosts = posts.slice(start, end);

	if (!posts || posts.length === 0) {
		return (
			<main id="main-content" aria-labelledby="posts-heading">
				<h1 id="posts-heading" className={styles.pageTitle}>
					Посты
				</h1>
				<p>Постов пока нет.</p>
			</main>
		);
	}

	return (
		<main id="main-content" aria-labelledby="posts-heading">
			<h1 id="posts-heading" className={styles.pageTitle}>
				Посты
			</h1>
			<AnimatedList>
				{displayedPosts.map((post) => (
					<Card
						key={post.id}
						image={'/mini.png'}
						title={post.title}
						excerpt={post.body}
						category='Front-end'
						publishedAt='1 месяц назад'
						readingTime='3 минуты'
						likesCount={4}
						link={`/posts/${post.id}`}
					/>
				))}
			</AnimatedList>

			<Pagination
				currentPage={currentPage}
				totalItems={posts.length}
				pageSize={limit}
			/>
		</main>

	);
}
