import { Article } from 'types/article.type';
import { Category } from 'types/category.type';

export interface EditArticleFormProps {
  article: Article | null;
  categories: Category[] | null;
}
