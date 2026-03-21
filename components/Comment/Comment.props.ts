import { CommentItem } from '@/interfaces/comment.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	comment: CommentItem;
}