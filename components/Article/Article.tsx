import React, { FC, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "store/hooks";
import { getArticle } from "store/slices/article";
import { ArticleProps } from "./Article.props";
import styles from "./Article.module.scss";
import { format } from "date-fns";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import cn from "classnames";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Article: FC<ArticleProps> = ({ slug }) => {
  const { article } = useTypedSelector((state) => state.articles);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [slug]);

  return (
    <>
      <div className={styles.article}>
        {article && (
          <>
            <div className={styles.article__container}>
              <div className={styles.article__header}>
                <Typography variant="h6" component="div">
                  Criminal
                </Typography>
                <Typography variant="body1">
                  {article.author.username}
                </Typography>
                <Typography variant="body1">
                  {format(new Date(article.createdAt), "dd MMM y")}
                </Typography>
              </div>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                className={styles.article__title}
              >
                {article.title}
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className={styles.article__description}
              >
                {article.description}
              </Typography>

              <div className={styles.article__footer}>
                <div className={styles.article__footer_comments}>
                  <ModeCommentOutlinedIcon />
                  {/*{commentariesCount || 10}*/}10
                </div>
                <div className={styles.article__footer_likes}>
                  <ArrowBackIosIcon
                    style={{ transform: "rotate(-90deg)", marginTop: "-10px" }}
                  />
                  <div
                    style={{
                      color: article.favouritesCount >= 0 ? "#2ea83a" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {article.favouritesCount}
                  </div>
                  <ArrowBackIosIcon
                    style={{ transform: "rotate(90deg)", marginTop: "10px" }}
                  />
                </div>
              </div>
            </div>

            {article.cover && (
              <div className={styles.article__cover}>
                <img src={`${api}/${article.cover}`} alt="article-cover" />
              </div>
            )}
            <div
              className={styles.article__container}
              style={{ marginTop: 25 }}
            >
              <div>{article.body}</div>
            </div>
          </>
        )}
      </div>

      <div className={cn(styles.article, styles.comments)}>
        <div className={styles.comments__container}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={styles.comments__title}
          >
            10 comments
          </Typography>
          comments form & list
        </div>
      </div>
    </>
  );
};

export default Article;
