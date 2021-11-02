import React, { FC } from "react";
import { Article } from "store/types/article.type";
import { Grid, Typography } from "@mui/material";
import styles from "./NewsItem.module.scss";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useTypedDispatch } from "store/hooks";
import { dislikeArticle, likeArticle } from "store/slices/article";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

interface NewsItemProps {
  article: Article;
}

const NewsItem: FC<NewsItemProps> = ({ article }) => {
  const dispatch = useTypedDispatch();

  const {
    title,
    description,
    createdAt,
    cover,
    favouritesCount,
    author,
    slug,
    comments,
    category,
  } = article;

  const handleLikeArticle = () => {
    dispatch(likeArticle(slug));
  };

  const handleDislikeArticle = () => {
    dispatch(dislikeArticle(slug));
  };

  return (
    <Grid item xs={12} className={styles.article}>
      <div className={styles.article__header}>
        <Typography variant="h6" component="div">
          {(category && category.name) || "Category"}
        </Typography>

        <Typography
          variant="body1"
          component="div"
          className={styles.article__header__username}
        >
          {author.username}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          className={styles.article__header__date}
        >
          {createdAt && formatDistanceToNow(new Date(createdAt))}
        </Typography>
        <div className={styles.article__header__subscribe}>
          <PersonAddIcon />
          <span>subscribe</span>
        </div>
      </div>

      <div className={styles.article__body}>
        <Link href={`/articles/${slug}`}>
          <a className={styles.article__body_title}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </a>
        </Link>
        <div className={styles.article__body_description}>{description}</div>
      </div>

      {cover && (
        <Link href={`/articles/${slug}`}>
          <a>
            <div className={styles.article__cover}>
              <img src={`${api}/${cover}`} alt="post-cover" />
            </div>
          </a>
        </Link>
      )}

      <div className={styles.article__footer}>
        <div className={styles.article__footer_comments}>
          <ModeCommentOutlinedIcon />
          {(comments && comments.length) || 0}
        </div>
        <div className={styles.article__footer_likes}>
          <ArrowBackIosIcon
            style={{ transform: "rotate(-90deg)", marginTop: "-10px" }}
            onClick={handleDislikeArticle}
          />
          <div
            style={{
              color: favouritesCount >= 0 ? "#2ea83a" : "red",
              fontWeight: 600,
            }}
          >
            {favouritesCount}
          </div>
          <ArrowBackIosIcon
            style={{ transform: "rotate(90deg)", marginTop: "10px" }}
            onClick={handleLikeArticle}
          />
        </div>
      </div>
    </Grid>
  );
};

export default NewsItem;
