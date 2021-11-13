import axios from 'axios';
import {
  Article,
  ArticleResponse,
  ArticlesResponse,
  CreateArticleDto,
  UpdateArticleDto,
} from 'store/types/article.type';
import $api from './index';

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

  static async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { data } = await $api.post<ArticleResponse>(`${api}/articles`, {
      article: createArticleDto,
    });
    return data.article;
  }

  static async update(
    updateArticleDto: UpdateArticleDto,
    slug: string
  ): Promise<Article> {
    const { data } = await $api.put<ArticleResponse>(
      `${api}/articles/${slug}`,
      { article: updateArticleDto }
    );
    return data.article;
  }

  static async updateCover(cover: FormData, slug: string) {
    const { data } = await $api.put<ArticleResponse>(
      `${api}/articles/${slug}/cover`,
      cover
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

  static async search(query: string): Promise<ArticlesResponse> {
    const { data } = await $api.get<ArticlesResponse>(`${api}/articles`, {
      params: { search: query },
    });
    return data;
  }
}
