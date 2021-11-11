import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  Article,
  ArticlesResponse,
  ArticleState,
} from "store/types/article.type"
import ArticleService from "services/Article.service"
import { ArticleComment, CreateCommentDto } from "../types/comment.type"
import CommentService from "services/Comment.service"

export const queryLimit = 3

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async ({ offset }: { offset: number }, { dispatch }) => {
    try {
      const articles = await ArticleService.findAll(offset, queryLimit)
      dispatch(setArticles(articles))
    } catch (error) {
      console.log(error)
    }
  }
)

export const searchArticles = createAsyncThunk(
  "articles/searchArticles",
  async (query: string, { dispatch }) => {
    try {
      const articles = await ArticleService.search(query)
      dispatch(setFlowArticles(articles))
    } catch (error) {
      console.log(error)
    }
  }
)

export const getArticle = createAsyncThunk(
  "articles/getArticle",
  async (slug: string, { dispatch }) => {
    dispatch(setArticle(null))
    try {
      const article = await ArticleService.findOne(slug)
      dispatch(setArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
)

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug)
      dispatch(updateArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
)

export const dislikeArticle = createAsyncThunk(
  "articles/dislikeArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.dislike(slug)
      dispatch(updateArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
)

export const likeSelectedArticle = createAsyncThunk(
  "article/likeSelectedArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.like(slug)
      dispatch(updateSelectedArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
)

export const dislikeSelectedArticle = createAsyncThunk(
  "article/dislikeSelectedArticle",
  async (slug: string, { dispatch }) => {
    try {
      const article = await ArticleService.dislike(slug)
      dispatch(updateSelectedArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
)

export const createComment = createAsyncThunk(
  "article/createArticleComment",
  async (createCommentDto: CreateCommentDto, { dispatch }) => {
    try {
      const comment = await CommentService.create(createCommentDto)
      dispatch(addArticleComment(comment))
    } catch (error) {
      console.log(error)
    }
  }
)

export const removeComment = createAsyncThunk(
  "article/deleteArticleComment",
  async (commentId: number, { dispatch }) => {
    try {
      const idx = await CommentService.delete(commentId)
      dispatch(deleteArticleComment(idx))
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState: ArticleState = {
  articles: [],
  article: null,
  isLoaded: false,
  articlesCount: 0,
}

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, { payload }: PayloadAction<ArticlesResponse>) {
      state.articles = [...state.articles, ...payload.articles]
      state.articlesCount = payload.articlesCount
    },
    clearArticles(state) {
      state.articles = []
      state.articlesCount = 0
    },
    setFlowArticles(state, { payload }: PayloadAction<ArticlesResponse>) {
      state.articles = payload.articles
      state.articlesCount = payload.articlesCount
    },
    setArticle(state, { payload }: PayloadAction<Article>) {
      state.article = payload
    },
    updateArticle(state, { payload }: PayloadAction<Article>) {
      const articleById = state.articles.findIndex((i) => i.id === payload.id)
      state.articles[articleById] = payload
    },
    updateSelectedArticle(state, { payload }: PayloadAction<Article>) {
      state.article = payload
    },
    addArticleComment(state, { payload }: PayloadAction<ArticleComment>) {
      state.article.comments = [payload, ...state.article.comments]
    },
    deleteArticleComment(state, { payload }: PayloadAction<number>) {
      state.article.comments = state.article.comments.filter(
        (item) => item.id !== payload
      )
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoaded = true
      })
      .addCase(getArticles.fulfilled, (state) => {
        state.isLoaded = false
      })
      .addCase(getArticles.rejected, (state) => {
        state.isLoaded = false
      })
  },
})

export const {
  setArticles,
  setArticle,
  updateArticle,
  updateSelectedArticle,
  addArticleComment,
  deleteArticleComment,
  setFlowArticles,
  clearArticles,
} = articleSlice.actions
export default articleSlice.reducer
