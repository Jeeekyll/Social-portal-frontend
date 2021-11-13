import React, { FC, useEffect, useState } from 'react';
import { Article } from 'store/types/article.type';
import AuthService from 'services/Auth.service';
import { IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const Articles: FC = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);

  const trimArticlesTitle = (str: string): string => {
    if (!str) return;
    return str.length > 40 ? `${str.slice(0, 40)}...` : str;
  };

  const fetchArticles = async () => {
    try {
      const articles = await AuthService.findArticles();
      setArticles(articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <List>
      {articles &&
        articles.length > 0 &&
        articles.map((article) => (
          <ListItemButton key={article.id}>
            <ListItemText primary={trimArticlesTitle(article.title)} />
            <IconButton>
              <Link href={`/articles/${article.slug}/edit`}>
                <EditIcon />
              </Link>
            </IconButton>

            <IconButton>
              <Link href={`/articles/${article.slug}`}>
                <RemoveRedEyeIcon />
              </Link>
            </IconButton>
          </ListItemButton>
        ))}
    </List>
  );
};

export default Articles;
