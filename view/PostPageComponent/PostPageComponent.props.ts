import { CommentItem } from '@/interfaces/comment.interface';
import { EnrichedPost } from '@/interfaces/post.interface';

export interface PostPageComponentProps {
	postInfo: EnrichedPost;
	comments: CommentItem[];
}