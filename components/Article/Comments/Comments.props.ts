import { ArticleComment } from 'types/comment.type';

export interface CommentsProps {
  comments: ArticleComment[];
  articleId: number;
}
