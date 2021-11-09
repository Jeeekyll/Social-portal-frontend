import { User } from "./user.type";

export interface Comment {
  id: number;
  text: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ArticleComment extends Comment {
  author: User;
}

export interface CreateCommentDto {
  text: string;
  articleId: number;
}
