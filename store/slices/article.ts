import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleState } from 'store/types/article.type';
import ArticleService from 'services/Article.service';
import { ArticleComment, CreateCommentDto } from 'store/types/comment.type';
import CommentService from 'services/Comment.service';

//articles observe limit
export const queryLimit = 3;

export const getArticle = createAsyncThunk(
  'articles/getArticle',
  async (slug: string, { dispatch }) => {
    dispatch(setArticle(null));
    try {
      const article = await ArticleService.findOne(slug);
      dispatch(setArticle(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const likeSelectedArticle = createAsyncThunk(
  'article/likeSelectedArticle',
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug);
      dispatch(setFavourites(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const dislikeSelectedArticle = createAsyncThunk(
  'article/dislikeSelectedArticle',
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.dislike(slug);
      dispatch(setFavourites(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComment = createAsyncThunk(
  'article/createArticleComment',
  async (createCommentDto: CreateCommentDto, { dispatch }) => {
    try {
      const comment = await CommentService.create(createCommentDto);
      dispatch(addArticleComment(comment));
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  'article/deleteArticleComment',
  async (commentId: number, { dispatch }) => {
    try {
      const idx = await CommentService.delete(commentId);
      dispatch(deleteArticleComment(idx));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: ArticleState = {
  article: null,
};

const articleSlice = createSlice({
  name: 'articles',
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
} = articleSlice.actions;
export default articleSlice.reducer;
