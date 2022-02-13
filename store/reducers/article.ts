import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleState } from '@/types/article.type';
import { ArticleComment } from '@/types/comment.type';

//articles observe limit
export const queryLimit = 3;

const initialState: ArticleState = {
  article: null,
};

const article = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle(state, { payload }: PayloadAction<Article>) {
      state.article = payload;
    },
    setFavourites(state, { payload }: PayloadAction<Article>) {
      state.article.favouritesCount = payload.favouritesCount;
      state.article.isFavourite = payload.isFavourite;
    },
    addArticleComment(state, { payload }: PayloadAction<ArticleComment>) {
      state.article.comments = [payload, ...state.article.comments];
    },
    deleteArticleComment(state, { payload }: PayloadAction<number>) {
      state.article.comments = state.article.comments.filter(
        (item) => item.id !== payload
      );
    },
  },
});

export const {
  setArticle,
  setFavourites,
  addArticleComment,
  deleteArticleComment,
} = article.actions;
export default article.reducer;
