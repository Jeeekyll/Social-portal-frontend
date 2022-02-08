import React, { FC } from 'react';
import { Article } from 'store/types/article.type';
import { Grid, Typography } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import styles from './NewsItem.module.scss';
import FollowButton from '@/components/ToggleButtons/FollowButton/FollowButton';
import { Profile } from '@/store/types/profile.type';
import { useTypedSelector } from '@/store/hooks';
import FavouriteButton from '@/components/ToggleButtons/FavouriteButton/FavouriteButton';
import { NewsItemProps } from './NewsItem.props';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const NewsItem: FC<NewsItemProps> = ({ article, setArticles }) => {
  const { id, title, description, createdAt, cover, author, slug, category } =
    article;

  const { isAuth } = useTypedSelector((state) => state.user);

  const onProfileChange = (profileDto: Profile) => {
    setArticles((articles) =>
      articles.map((article) => {
        if (article.id === id) return { ...article, author: profileDto };
        return article;
      })
    );
  };

  const onFavouriteChange = (articleDto: Article) => {
    setArticles((articles) =>
      articles.map((article) => (article.id === id ? articleDto : article))
    );
  };

  return (
    <Fade triggerOnce className={styles.article__fade}>
      <Grid item xs={12} className={styles.article}>
        <div className={styles.article__header}>
          <Typography variant='h6' component='div'>
            {(category && category.name) || 'Category'}
          </Typography>

          <Link href={`/profile/${author.username}`}>
            <Typography
              variant='body1'
              component='div'
              className={styles.article__header__username}
            >
              {author.username}
            </Typography>
          </Link>

          <Typography
            variant='body2'
            component='div'
            className={styles.article__header__date}
          >
            {createdAt && formatDistanceToNow(new Date(createdAt))}
          </Typography>

          {/*  Follow button  */}

          {isAuth && (
            <div className={styles.article__header__subscribe}>
              <FollowButton
                profile={article.author}
                onChange={onProfileChange}
              />
            </div>
          )}
        </div>

        <div className={styles.article__body}>
          <Link href={`/articles/${slug}`}>
            <a className={styles.article__body_title}>
              <Typography variant='h5' component='div'>
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
                <img src={`${api}/${cover}`} alt='post-cover' />
              </div>
            </a>
          </Link>
        )}

        <div className={styles.article__footer}>
          <div className={styles.article__footer_comments}>
            <ModeCommentOutlinedIcon />
          </div>

          <FavouriteButton article={article} onChange={onFavouriteChange} />
        </div>
      </Grid>
    </Fade>
  );
};

export default NewsItem;
