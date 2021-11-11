import React, { FC } from "react"
import Article from "components/Article/Article"
import { GetServerSideProps } from "next"

interface ArticleIndexProps {
  slug: string
}

const ArticleIndex: FC<ArticleIndexProps> = ({ slug }) => {
  return <Article slug={slug} />
}

export default ArticleIndex

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  return { props: { slug } }
}
