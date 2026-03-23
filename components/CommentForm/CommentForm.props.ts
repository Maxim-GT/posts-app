import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CommentFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	postId: string;
};