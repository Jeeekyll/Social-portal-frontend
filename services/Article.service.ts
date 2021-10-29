import axios from "axios";
import {
  Article,
  ArticleResponse,
  ArticlesResponse,
} from "store/types/article.type";

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
}
