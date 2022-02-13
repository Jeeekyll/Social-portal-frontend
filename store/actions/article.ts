import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticleService from '@/services/Article.service';
import { CreateCommentDto } from '@/types/comment.type';
import CommentService from '@/services/Comment.service';
import {
  addArticleComment,
  deleteArticleComment,
  setArticle,
  setFavourites,
} from '@/store/reducers/article';

const ArticleActions = {
  GET_ARTICLE: 'articles/GetArticle',
  LIKE_ARTICLE: 'articles/LikeArticle',
  DISLIKE_ARTICLE: 'articles/DislikeArticle',
  CREATE_COMMENT: 'article/CreateComment',
  REMOVE_COMMENT: 'article/RemoveComment',
};

export const getArticle = createAsyncThunk(
  ArticleActions.GET_ARTICLE,
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
  ArticleActions.LIKE_ARTICLE,
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug);
      dispatch(setFavourites(article));
    } catch (error) {
      console.log(error);
    }
  }
);

export const dislikeArticle = createAsyncThunk(
  ArticleActions.DISLIKE_ARTICLE,
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
  ArticleActions.CREATE_COMMENT,
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
  ArticleActions.REMOVE_COMMENT,
  async (commentId: number, { dispatch }) => {
    try {
      const idx = await CommentService.delete(commentId);
      dispatch(deleteArticleComment(idx));
    } catch (error) {
      console.log(error);
    }
  }
);
