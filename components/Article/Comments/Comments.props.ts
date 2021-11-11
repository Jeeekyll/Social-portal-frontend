import { ArticleComment } from "../../../store/types/comment.type"

export interface CommentsProps {
  comments: ArticleComment[]
  articleId: number
}
