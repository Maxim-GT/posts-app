import { JSX } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import styles from './page.module.css';
import { getPosts } from '@/services/posts';
import Pagination from '@/components/Pagination/Pagination';
import { Card } from '@/components';
import { AnimatedList } from './AnimatedList';
import { SearchForm } from './SearchForm';
import { getPicsumImageUrl } from '@/utils/image';

export interface IPostsListsPage {
	searchParams: Promise<{ page?: string, q?: string }>
}

export default async function PostsListsPage({ searchParams }: IPostsListsPage): Promise<JSX.Element> {
	const { page, q } = await searchParams;
	const query = (q ?? '').trim();
	const limit = 9;
	const currentPage = Math.max(Number(page) || 1, 1);
	const { items: posts, total, hasError } = await getPosts({
		page: currentPage,
		limit,
		q: query || undefined
	});
	const totalPages = Math.max(Math.ceil(total / limit), 1);
	const breadcrumbs = (
		<nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
			<Link href="/" className={styles.breadcrumbLink}>Главная</Link>
			<span className={styles.breadcrumbSeparator}>/</span>
			<span className={styles.breadcrumbCurrent} aria-current="page">Посты</span>
		</nav>
	);

	if (currentPage > totalPages) {
		const redirectSearchParams = new URLSearchParams();
		redirectSearchParams.set('page', String(totalPages));
		if (query) {
			redirectSearchParams.set('q', query);
		}

		redirect(`/posts?${redirectSearchParams.toString()}`);
	}

	if (!posts || posts.length === 0) {
		return (
			<main id="main-content" aria-labelledby="posts-heading">
				{breadcrumbs}
				<h1 id="posts-heading" className={styles.pageTitle}>
					Посты
				</h1>
				<SearchForm initialQuery={query} />
				{hasError ? (
					<p className={styles.errorState}>Не удалось загрузить посты. Попробуйте обновить страницу.</p>
				) : null}
				{query && !hasError ? (
					<p className={styles.emptyState}>По запросу &quot;{query}&quot; ничего не найдено.</p>
				) : !hasError ? (
					<p className={styles.emptyState}>Постов пока нет.</p>
				) : null}
			</main>
		);
	}

	return (
		<main id="main-content" aria-labelledby="posts-heading">
			{breadcrumbs}
			<h1 id="posts-heading" className={styles.pageTitle}>
				Посты
			</h1>
			<SearchForm initialQuery={query} />
			<AnimatedList>
				{posts.map((post) => (
					<Card
						key={post.id}
						image={getPicsumImageUrl(post.id, 800, 500)}
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
				totalItems={total}
				pageSize={limit}
				query={query}
			/>
		</main>

	);
}
