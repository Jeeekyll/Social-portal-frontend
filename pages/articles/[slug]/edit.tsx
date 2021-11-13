import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import EditArticleForm from 'components/Article/EditArticleForm/EditArticleForm';
import ArticleService from 'services/Article.service';
import { Article } from 'store/types/article.type';
import { Category } from 'store/types/category.type';
import CategoryService from 'services/Category.service';

interface EditPageProps {
  article: Article | null;
  categories: Category[] | null;
}

const Edit: FC<EditPageProps> = ({ article, categories }) => {
  return <EditArticleForm article={article} categories={categories} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const article = await ArticleService.findOne(params.slug as string);
    const categories = await CategoryService.findAll();

    return {
      props: { article, categories },
    };
  } catch (error) {
    return {
      props: { article: null, categories: null },
    };
  }
};

export default Edit;
