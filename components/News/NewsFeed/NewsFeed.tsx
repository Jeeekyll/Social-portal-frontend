import React, { FC, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import { useTypedDispatch, useTypedSelector } from "store/hooks";
import { getArticles } from "store/slices/article";
import styles from "./NewsFeed.module.scss";

const NewsFeed: FC = () => {
  const dispatch = useTypedDispatch();
  const { articles } = useTypedSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <div className={styles.feed__container}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        style={{ margin: "30px 0 40px -20px" }}
      >
        News
      </Typography>
      <Grid container spacing={2}>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <NewsItem key={article.id} article={article} />
          ))}
      </Grid>
    </div>
  );
};

export default NewsFeed;
