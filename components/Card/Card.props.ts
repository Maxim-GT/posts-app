import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

export interface CardProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'children'> {
	title: string;
	excerpt: string;
	image: string;
	category: string;
	publishedAt: string;
	readingTime: string;
	likesCount: number;
	userLiked?: boolean;
	link: string;
}
