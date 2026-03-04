import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string;
	title: string;
	excerpt: string;
	image: string;
	category: string;
	publishedAt: string;
	readingTime: string;
	likesCount: number;
	userLiked?: boolean;
}
