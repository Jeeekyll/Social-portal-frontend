import { Article } from '@store/types/article.type';

export interface FavouriteButtonProps {
  article: Article;
  onChange: (articleDto: Article) => void;
}
