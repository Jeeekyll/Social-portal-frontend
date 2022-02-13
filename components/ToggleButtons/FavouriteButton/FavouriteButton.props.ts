import { Article } from '@/types/article.type';

export interface FavouriteButtonProps {
  article: Article;
  onChange: (articleDto: Article) => void;
}
