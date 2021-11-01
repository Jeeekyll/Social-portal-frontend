import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Article,
  ArticlesResponse,
  ArticleState,
} from "store/types/article.type";
import ArticleService from "services/Article.service";
import { ArticleComment, CreateCommentDto } from "../types/comment.type";
import CommentService from "../../services/Comment.service";

export const queryLimit = 10;

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async (_, { dispatch }) => {
    try {
      const articles = await ArticleService.findAll(0, queryLimit);
      dispatch(setArticles(articles));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getArticle = createAsyncThunk(
  "articles/getArticle",
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

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug);
      dispatch(updateArticle(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const dislikeArticle = createAsyncThunk(
  "articles/dislikeArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.dislike(slug);
      dispatch(updateArticle(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const likeSelectedArticle = createAsyncThunk(
  "article/likeSelectedArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug);
      dispatch(updateSelectedArticle(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const dislikeSelectedArticle = createAsyncThunk(
  "article/dislikeSelectedArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.dislike(slug);
      dispatch(updateSelectedArticle(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const createArticleComment = createAsyncThunk(
  "article/createArticleComment",
  async (createCommentDto: CreateCommentDto, { dispatch }) => {
    try {
      const comment = await CommentService.create(createCommentDto);
      dispatch(addArticleComment(comment));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: ArticleState = {
  articles: null,
  article: null,
  isLoaded: false,
  articlesCount: 0,
  offset: 0,
  limit: queryLimit,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, { payload }: PayloadAction<ArticlesResponse>) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
    },
    setArticle(state, { payload }: PayloadAction<Article>) {
      state.article = payload;
    },
    updateArticle(state, { payload }: PayloadAction<Article>) {
      const articleById = state.articles.findIndex((i) => i.id === payload.id);
      state.articles[articleById] = payload;
    },
    updateSelectedArticle(state, { payload }: PayloadAction<Article>) {
      state.article = payload;
    },
    addArticleComment(state, { payload }: PayloadAction<ArticleComment>) {
      state.article.comments = [payload, ...state.article.comments];
    },
  },
});

export const {
  setArticles,
  setArticle,
  updateArticle,
  updateSelectedArticle,
  addArticleComment,
} = articleSlice.actions;
export default articleSlice.reducer;
