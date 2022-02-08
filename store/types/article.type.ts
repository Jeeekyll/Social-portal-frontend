import { User } from './user.type';
import { ArticleComment } from './comment.type';
import { Category } from './category.type';
import { Profile } from '@store/types/profile.type';

export interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  cover?: string;
  commentariesCount: number;
  favouritesCount: number;
  createdAt: Date | string;
  slug: string;
  tagList: [];
  author: Profile;
  comments: ArticleComment[];
  category: Category;
  isFavourite: boolean;
  articlesCount: number;
}

export interface ArticleState {
  article: Article | null;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface UserArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article;
}

export interface CreateArticleDto {
  title: string;
  description: string;
  body: string;
  category: number;
}

export type UpdateArticleDto = CreateArticleDto;
