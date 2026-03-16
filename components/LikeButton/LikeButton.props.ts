import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface LikeButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	postId: string | number;
    initialLiked: boolean;
    onLikeToggle: (id: string | number, newState: boolean) => Promise<void>;
}