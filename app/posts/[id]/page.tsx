import { JSX } from 'react';
import { getPosts, getPost } from '@/services/posts';
import { notFound } from 'next/navigation';
import { PostPageComponent } from '@/view/PostPageComponent/PostPageComponent';
import { getCommentsById } from '@/services/comments';
import { getPicsumImageUrl } from '@/utils/image';

export interface IPostPage {
	params: Promise<{ id: string }>
}

export async function generateStaticParams() {
	const { items: posts } = await getPosts();
	if (!posts.length) return [];

	return posts.map(post => (
		{ id: String(post.id) }
	));

}

export default async function PostsPage({ params }: IPostPage): Promise<JSX.Element> {
	const { id } = await params;

	const [postInfo, comments] = await Promise.all([
		getPost(Number(id)),
		getCommentsById(id)
	]);


	if (!postInfo) {
		notFound();
	}

	return (
		<PostPageComponent
			postInfo={{
				...postInfo,
				image: getPicsumImageUrl(postInfo.id, 1280, 720),
				category: 'Frontend',
				publishedAt: '1 месяц назад',
				readingTime: '3 минуты',
				likesCount: 3,
				userLiked: false,
				seoText: '<h2>Seo text</h2><p>est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla</p>'
			}}
			comments={comments}
		/>
	);
}
