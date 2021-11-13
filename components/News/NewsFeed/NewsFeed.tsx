import React, { FC, useEffect, useRef, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useObserver, useTypedDispatch, useTypedSelector } from 'store/hooks';
import { getArticles, queryLimit, clearArticles } from 'store/slices/article';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsFeed.module.scss';

const NewsFeed: FC = () => {
  const dispatch = useTypedDispatch();
  const { articles, isLoaded, articlesCount } = useTypedSelector(
    (state) => state.articles
  );
  const lastElement = useRef<HTMLDivElement>(null);

  // observer pagination params
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    dispatch(clearArticles());
  }, []);

  // increase articles capacity
  useEffect(() => {
    if (articles.length < 0) return;

    if (articles.length < articlesCount) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [articles.length]);

  useEffect(() => {
    dispatch(getArticles({ offset }));
  }, [offset]);

  const handleArticlesLoading = () => {
    setOffset(offset + queryLimit);
  };

  useObserver(lastElement, hasMore, isLoaded, handleArticlesLoading);

  return (
    <div className={styles.feed__container} id='news'>
      <Grid>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <NewsItem
              key={`${article.id}_${article.title}`}
              article={article}
            />
          ))}

        {articles && !articles.length && (
          <div style={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              gutterBottom
              component='div'
              style={{ marginBottom: 50 }}
            >
              Articles not found
            </Typography>
          </div>
        )}
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
