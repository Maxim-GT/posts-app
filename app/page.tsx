import { JSX } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { getPosts } from '@/services/posts';
import { Card } from '@/components';
import { getPicsumImageUrl } from '@/utils/image';

const featureItems = [
	{
		title: 'Server-side поиск',
		description: 'Фильтрация и пагинация работают через URL-параметры и серверный рендер.'
	},
	{
		title: 'Современный стек',
		description: 'Next.js App Router, TypeScript, React 19, CSS Modules и Framer Motion.'
	},
	{
		title: 'Фокус на UX',
		description: 'Анимации, optimistic updates, доступность и сценарии ошибок.'
	}
];

export default async function Home(): Promise<JSX.Element> {
	const { items: latestPosts, hasError } = await getPosts({ page: 1, limit: 3 });

	return (
		<main id="main-content" className={styles.homePage}>
			<section className={styles.hero}>
				<p className={styles.eyebrow}>Проект / Frontend</p>
				<h1 className={styles.title}>Блог на Next.js</h1>
				<p className={styles.subtitle}>
					Проект демонстрирует практические инженерные решения: URL-driven состояние, server-side пагинацию,
					типизированные сервисы и компонентный подход.
				</p>
				<div className={styles.heroActions}>
					<Link href="/posts" className={styles.primaryButton}>Смотреть все посты</Link>
					<Link href="https://github.com/Maxim-GT" className={styles.secondaryButton} target="_blank">GitHub</Link>
				</div>
			</section>

			<section className={styles.features} aria-label="Преимущества проекта">
				{featureItems.map((feature) => (
					<article key={feature.title} className={styles.featureCard}>
						<h2>{feature.title}</h2>
						<p>{feature.description}</p>
					</article>
				))}
			</section>

			<section className={styles.latestPostsSection} aria-labelledby="latest-posts-heading">
				<div className={styles.latestPostsHeader}>
					<h2 id="latest-posts-heading" className={styles.latestPostsTitle}>Последние посты</h2>
					<Link href="/posts" className={styles.allPostsLink}>Перейти к ленте</Link>
				</div>

				{hasError ? (
					<p className={styles.errorState}>Не удалось загрузить последние посты. Попробуйте обновить страницу.</p>
				) : null}

				{!hasError && latestPosts.length === 0 ? (
					<p className={styles.emptyState}>Посты скоро появятся.</p>
				) : null}

				{!hasError && latestPosts.length > 0 ? (
					<div className={styles.cardGrid}>
						{latestPosts.map((post) => (
							<Card
								key={post.id}
								image={getPicsumImageUrl(post.id, 800, 500)}
								title={post.title}
								excerpt={post.body}
								category='Frontend'
								publishedAt='Свежая публикация'
								readingTime='3 минуты'
								likesCount={4}
								link={`/posts/${post.id}`}
							/>
						))}
					</div>
				) : null}
			</section>
		</main>
	);
}
