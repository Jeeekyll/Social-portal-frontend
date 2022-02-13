import React, { FC, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '@/store/hooks';
import {
  dislikeArticle,
  getArticle,
  likeArticle,
} from '@/store/actions/article';
import { formatDistanceToNow } from 'date-fns';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Link from 'next/link';
import CreateIcon from '@mui/icons-material/Create';
import Comments from '@/components/Article/Comments/Comments';
import { ArticleProps } from './Article.props';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import styles from './Article.module.scss';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Article: FC<ArticleProps> = ({ slug }) => {
  const { article } = useTypedSelector((state) => state.article);
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [slug]);

  const handleLikeClick = () => {
    dispatch(likeArticle(article.slug));
  };

  const handleDislikeClick = () => {
    dispatch(dislikeArticle(article.slug));
  };

  return (
    <>
      {article && Object.keys(article).length > 0 && (
        <div className={styles.article__wrapper}>
          <div className={styles.article}>
            <div className={styles.article__container}>
              <div className={styles.article__header}>
                <Typography variant='h6' component='div'>
                  {article.category.name}
                </Typography>
                <Typography
                  variant='body1'
                  className={styles.article__header_author}
                >
                  <Link href={`/profile/${article.author.username}`}>
                    <a className={styles.article__header_author}>
                      {article.author.username}
                    </a>
                  </Link>
                </Typography>
                <Typography variant='body1'>
                  Created {formatDistanceToNow(new Date(article.createdAt))} ago
                </Typography>

                {isAuth && user && user.id === article.author.id && (
                  <Link href={`/articles/${article.slug}/edit`}>
                    <Button
                      className={styles.article__header_edit}
                      startIcon={<CreateIcon />}
                    >
                      Edit
                    </Button>
                  </Link>
                )}
              </div>

              <Typography
                variant='h4'
                gutterBottom
                component='div'
                className={styles.article__title}
              >
                {article.title}
              </Typography>

              <Typography
                variant='subtitle1'
                gutterBottom
                component='div'
                className={styles.article__description}
              >
                {article.description}
              </Typography>

              <div className={styles.article__footer}>
                <AnchorLink
                  className={styles.article__footer_comments}
                  href='#article-comments'
                >
                  <ModeCommentOutlinedIcon />
                  {(article.comments && article.comments.length) || 0}
                </AnchorLink>

                <div className={styles.article__likes}>
                  <div className={styles.article__likes__value}>
                    {article.favouritesCount}
                  </div>
                  <div
                    onClick={
                      article.isFavourite ? handleDislikeClick : handleLikeClick
                    }
                    className={styles.article__likes__icon}
                  >
                    {article.isFavourite ? (
                      <FavoriteOutlinedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {article.cover && (
              <div className={styles.article__cover}>
                <img src={`${api}/${article.cover}`} alt='article-cover' />
              </div>
            )}
            <div
              className={styles.article__container}
              style={{ marginTop: 25 }}
            >
              <Typography variant='body1'>{article.body}</Typography>
            </div>
          </div>

          <Comments comments={article.comments} articleId={article.id} />
        </div>
      )}
    </>
  );
};

export default Article;
