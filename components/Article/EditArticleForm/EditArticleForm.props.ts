import { Article } from "store/types/article.type";
import { Category } from "store/types/category.type";

export interface EditArticleFormProps {
  article: Article | null;
  categories: Category[] | null;
}
