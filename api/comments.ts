import { CommentItem } from '@/interfaces/comment.interface';

const API_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export async function getCommentsById(postId: number | string): Promise<CommentItem[]> {

	try {
		const res = await fetch(`${API_DOMAIN}/comments?postId=${postId}`, {
			next: {
				revalidate: 3600,
				tags: [`comments-post-${postId}`]
			}
		});

		if (!res.ok) return [];

		return res.json();
	} catch (e) {
		return [];
	}
}