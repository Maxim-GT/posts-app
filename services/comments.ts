import { ICommentForm } from '@/components/CommentForm/ReviewForm.interface';
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

export async function createComment(formData: ICommentForm, postId: number | string) {
	try {
		const res = await fetch(`${API_DOMAIN}/posts/${postId}/comments`, {
			method: 'POST',
			body: JSON.stringify({
				name: formData.name,
				body: formData.comment,
				email: 'test-user@mail.com',
				postId: Number(postId)
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})

		const data = await res.json();
		if (!res.ok) {
			console.error('Ошибка валидации сервера:', data);
			throw new Error(data.message || 'Ошибка при отправке');
		};

		return data;

	} catch (error) {
		throw error;
	}
}