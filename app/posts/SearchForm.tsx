'use client';

import { ChangeEvent, JSX, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export interface ISearchFormProps {
	initialQuery: string;
}

const SEARCH_DEBOUNCE_MS = 400;

export function SearchForm({ initialQuery }: ISearchFormProps): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [value, setValue] = useState(initialQuery);

	useEffect(() => {
		setValue(initialQuery);
	}, [initialQuery]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const trimmedValue = value.trim();
			if (!trimmedValue) return;

			const params = new URLSearchParams(searchParams.toString());

			params.set('q', trimmedValue);

			params.set('page', '1');

			const queryString = params.toString();
			if (queryString !== searchParams.toString()) {
				router.replace(`${pathname}?${queryString}`, { scroll: false });
			}
		}, SEARCH_DEBOUNCE_MS);

		return () => clearTimeout(timeout);
	}, [value, pathname, router, searchParams]);

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value);
	};

	const onReset = (): void => {
		setValue('');
		const params = new URLSearchParams(searchParams.toString());
		params.delete('q');
		params.set('page', '1');
		const queryString = params.toString();
		router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
	};

	return (
		<form className={styles.searchForm} role="search" aria-label="Поиск по постам" onSubmit={(event) => event.preventDefault()}>
			<label className={styles.searchLabel} htmlFor="posts-search-input">
				Поиск по постам
			</label>
			<input
				id="posts-search-input"
				name="q"
				type="search"
				value={value}
				onChange={onChange}
				placeholder="Поиск по заголовку и тексту"
				className={styles.searchInput}
			/>
			<button type="button" className={styles.searchButton} onClick={onReset} disabled={!value}>
				Сбросить
			</button>
		</form>
	);
}
