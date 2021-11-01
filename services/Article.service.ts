import axios from "axios";
import {
  Article,
  ArticleResponse,
  ArticlesResponse,
} from "store/types/article.type";
import $api from "./index";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class ArticleService {
  static async findAll(
    offset: number,
    limit: number
  ): Promise<ArticlesResponse> {
    const { data } = await axios.get<ArticlesResponse>(`${api}/articles`, {
      params: { offset, limit },
    });
    return data;
  }

  static async findOne(slug: string): Promise<Article> {
    const { data } = await axios.get<ArticleResponse>(
      `${api}/articles/${slug}`
    );
    return data.article;
  }

  static async like(slug: string): Promise<Article> {
    const { data } = await $api.post<ArticleResponse>(
      `${api}/articles/${slug}/favorite`
    );

    return data.article;
  }

  static async dislike(slug: string): Promise<Article> {
    const { data } = await $api.delete<ArticleResponse>(
      `${api}/articles/${slug}/favorite`
    );

    return data.article;
  }
}
