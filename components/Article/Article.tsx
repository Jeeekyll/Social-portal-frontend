import React, { FC, useEffect } from "react";
import { Typography } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "store/hooks";
import {
  dislikeSelectedArticle,
  getArticle,
  likeSelectedArticle,
} from "store/slices/article";
import { ArticleProps } from "./Article.props";
import styles from "./Article.module.scss";
import { formatDistanceToNow } from "date-fns";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Comments from "./Comments/Comments";
import AnchorLink from "react-anchor-link-smooth-scroll";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Article: FC<ArticleProps> = ({ slug }) => {
  const { article } = useTypedSelector((state) => state.articles);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [slug]);

  const handleLikeClick = () => {
    dispatch(likeSelectedArticle(article.slug));
  };

  const handleDislikeClick = () => {
    dispatch(dislikeSelectedArticle(article.slug));
  };

  return (
    <>
      {article && (
        <>
          <div className={styles.article}>
            <div className={styles.article__container}>
              <div className={styles.article__header}>
                <Typography variant="h6" component="div">
                  Criminal
                </Typography>
                <Typography variant="body1">
                  {article.author.username}
                </Typography>
                <Typography variant="body1">
                  {formatDistanceToNow(new Date(article.createdAt))}
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
                <AnchorLink
                  className={styles.article__footer_comments}
                  href="#article-comments"
                >
                  <ModeCommentOutlinedIcon />
                  {(article.comments && article.comments.length) || 0}
                </AnchorLink>

                <div className={styles.article__footer_likes}>
                  <ArrowBackIosIcon
                    style={{ transform: "rotate(-90deg)", marginTop: "-10px" }}
                    onClick={handleDislikeClick}
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
                    onClick={handleLikeClick}
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
          </div>

          <Comments comments={article.comments} articleId={article.id} />
        </>
      )}
    </>
  );
};

export default Article;
