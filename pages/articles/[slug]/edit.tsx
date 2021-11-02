import React, { FC } from "react";
import { GetServerSideProps } from "next";
import EditArticleForm from "components/Article/EditArticleForm/EditArticleForm";
import ArticleService from "services/Article.service";
import { Article } from "store/types/article.type";

interface EditPageProps {
  article: Article | null;
}

const Edit: FC<EditPageProps> = ({ article }) => {
  return <EditArticleForm article={article} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const article = await ArticleService.findOne(params.slug as string);
    return {
      props: { article },
    };
  } catch (error) {
    return {
      props: { article: null },
    };
  }
};

export default Edit;
