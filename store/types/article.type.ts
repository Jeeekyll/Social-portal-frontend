import { User } from "./user.type";

export interface Article {
  id: number;
  author: User;
  articlesCount: number;
  title: string;
  description: string;
  body: string;
  cover?: string;
  commentariesCount: number;
  favouritesCount: number;
  createdAt: Date | string;
  slug: string;
  tagList: [];
}

export interface ArticleState {
  articles: Article[] | null;
  article: Article | null;
  isLoaded: boolean;
  articlesCount: number;
  limit: number;
  offset: number;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleResponse {
  article: Article;
}
