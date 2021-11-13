import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useObserver } from 'store/hooks';
import { queryLimit } from 'store/slices/article';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsFeed.module.scss';
import { Article } from 'store/types/article.type';
import ArticleService from '@services/Article.service';
import SearchIcon from '@mui/icons-material/Search';

const NewsFeed: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // observer pagination params
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);

  const fetchArticles = async (offset: number) => {
    setIsLoaded(true);
    try {
      const { articles, articlesCount } = await ArticleService.findAll(
        offset,
        queryLimit
      );
      setArticles((state) => [...state, ...articles]);
      setArticlesCount(articlesCount);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
    }
  };

  const resetArticlesState = () => {
    setOffset(0);
    setHasMore(false);
    setArticlesCount(0);
    setArticles([]);
  };

  const searchArticles = async (query: string) => {
    resetArticlesState();
    console.log(articles);
    try {
      const { articles } = await ArticleService.search(query);
      setArticles(articles);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!searchQuery.length) return;

    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await searchArticles(searchQuery);
      }, 500)
    );
  }, [searchQuery]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // increase articles capacity
  useEffect(() => {
    if (!articles || articles.length === 0) return;

    if (articles.length < articlesCount) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [articles.length, articlesCount]);

  useEffect(() => {
    fetchArticles(offset);
  }, [offset]);

  const handleArticlesLoading = () => {
    setOffset(offset + queryLimit);
  };

  useObserver(lastElement, hasMore, isLoaded, handleArticlesLoading);

  return (
    <div className={styles.feed__container} id='news'>
      <div>
        <OutlinedInput
          size='small'
          onChange={onSearchChange}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon fontSize='medium' />
            </InputAdornment>
          }
        />
      </div>
      <Grid>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <NewsItem
              key={`${article.id}_${article.title}`}
              article={article}
            />
          ))}

        {/*{articles && !articles.length && (*/}
        {/*  <div style={{ textAlign: 'center' }}>*/}
        {/*    <Typography*/}
        {/*      variant='h4'*/}
        {/*      gutterBottom*/}
        {/*      component='div'*/}
        {/*      style={{ marginBottom: 50 }}*/}
        {/*    >*/}
        {/*      Articles not found*/}
        {/*    </Typography>*/}
        {/*  </div>*/}
        {/*)}*/}
      </Grid>

      <div
        ref={lastElement}
        style={{ display: !hasMore && 'none' }}
        className={styles.feed__loader}
      >
        <CircularProgress />
      </div>
    </div>
  );
};

export default NewsFeed;
