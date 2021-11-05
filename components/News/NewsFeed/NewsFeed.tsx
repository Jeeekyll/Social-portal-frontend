import React, { FC, useEffect, useRef } from "react";
import { CircularProgress, Grid } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import { useObserver, useTypedDispatch, useTypedSelector } from "store/hooks";
import {
  getArticles,
  queryLimit,
  setHasMore,
  setOffset,
} from "store/slices/article";
import styles from "./NewsFeed.module.scss";

const NewsFeed: FC = () => {
  const dispatch = useTypedDispatch();
  const { articles, isLoaded, articlesCount, hasMore, offset } =
    useTypedSelector((state) => state.articles);
  const lastElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getArticles({ offset }));
  }, [offset]);

  useEffect(() => {
    if (articles.length < 0) return;

    if (articles.length < articlesCount) {
      dispatch(setHasMore(true));
    } else {
      dispatch(setHasMore(false));
    }
  }, [articles.length]);

  const handleArticlesLoading = () => {
    dispatch(setOffset(offset + queryLimit));
  };

  useObserver(lastElement, hasMore, isLoaded, handleArticlesLoading);

  return (
    <div className={styles.feed__container} id="news">
      <Grid>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <NewsItem
              key={`${article.id}_${article.title}`}
              article={article}
            />
          ))}
      </Grid>

      <div
        ref={lastElement}
        style={{ display: !hasMore && "none" }}
        className={styles.feed__loader}
      >
        <CircularProgress />
      </div>
    </div>
  );
};

export default NewsFeed;
