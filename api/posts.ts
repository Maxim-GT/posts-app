import { PostInterface } from '@/interfaces/post.interface';

const API_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export async function getPosts(): Promise<PostInterface[]> {
	try {
		const res = await fetch(`${API_DOMAIN}/posts`, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
			next: { revalidate: 3600 }
		});
		if (!res.ok) return [];
		return res.json();
	} catch (e) {
		return [];
	}
}