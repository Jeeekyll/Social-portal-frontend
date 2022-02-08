import React, { FC } from 'react';
import { FavouriteButtonProps } from '@/components/ToggleButtons/FavouriteButton/FavouriteButton.props';
import styles from '@/components/ToggleButtons/FavouriteButton/FavouriteButton.module.scss';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArticleService from '@/services/Article.service';

const FavouriteButton: FC<FavouriteButtonProps> = ({ article, onChange }) => {
  const onLikeClick = async () => {
    try {
      const response = await ArticleService.like(article.slug);
      onChange(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onDislikeClick = async () => {
    try {
      const response = await ArticleService.dislike(article.slug);
      onChange(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.likes}>
      <div className={styles.likes__value}>{article.favouritesCount}</div>
      <div
        onClick={article.isFavourite ? onDislikeClick : onLikeClick}
        className={styles.likes__icon}
      >
        {article.isFavourite ? (
          <FavoriteOutlinedIcon />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </div>
    </div>
  );
};

export default FavouriteButton;
