import { PostInterface } from '@/interfaces/post.interface';

const API_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export interface IGetPostsParams {
	q?: string;
	page?: number;
	limit?: number;
}

export interface IGetPostsResult {
	items: PostInterface[];
	total: number;
	hasError: boolean;
}

export async function getPosts(params?: IGetPostsParams): Promise<IGetPostsResult> {
	try {
		const searchParams = new URLSearchParams();
		if (params?.q) {
			searchParams.set('q', params.q);
		}

		if (params?.page) {
			searchParams.set('_page', String(params.page));
		}

		if (params?.limit) {
			searchParams.set('_limit', String(params.limit));
		}

		const queryString = searchParams.toString();
		const url = queryString ? `${API_DOMAIN}/posts?${queryString}` : `${API_DOMAIN}/posts`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
			next: { revalidate: 3600 }
		});
		if (!res.ok) return { items: [], total: 0, hasError: true };

		const items: PostInterface[] = await res.json();
		const total = Number(res.headers.get('x-total-count')) || items.length;
		return { items, total, hasError: false };
	} catch (e) {
		return { items: [], total: 0, hasError: true };
	}
}

export async function getPost(id: string | number): Promise<PostInterface | null> {
	try {
		const res = await fetch(`${API_DOMAIN}/posts/${id}`, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
			next: { revalidate: 3600 }
		});
		if (!res.ok) return null;
		return res.json();
	} catch (e) {
		return null;
	}
}



