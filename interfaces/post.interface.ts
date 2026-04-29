export interface PostInterface {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface EnrichedPost extends PostInterface {
	image: string;
	category: string;
	publishedAt: string;
	readingTime: string;
	likesCount: number;
	userLiked: boolean;
	seoText?: string;
}