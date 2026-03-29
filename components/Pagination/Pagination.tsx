import Link from 'next/link';
import { IPaginationProps } from './Pagination.props';
import styles from './Pagination.module.css';
import cn from 'classnames';

export default function Pagination({ totalItems, pageSize, currentPage, className, ...props }: IPaginationProps) {
	const totalPages = Math.ceil(totalItems / pageSize);

	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	return (
		<nav className={cn(styles.navigation, className)} aria-label="Постраничная навигация по списку постов" {...props}>
			<ul>
				{pages.map(page => (
					<li key={page}>
						<Link
							href={`?page=${page}`}
							scroll={false}
							className={cn(styles.numbers, {
								[styles.active]: currentPage === page
							})}
							aria-current={currentPage === page ? 'page' : undefined}
						>
							{page}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}