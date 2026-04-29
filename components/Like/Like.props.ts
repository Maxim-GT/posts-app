import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LikeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	count: number;
	liked?: boolean;
}