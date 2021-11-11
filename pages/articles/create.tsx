import React, { FC } from "react"
import CreateArticleForm from "components/Article/CreateArticleForm/CreateArticleForm"
import { GetServerSideProps } from "next"
import CategoryService from "services/Category.service"
import { Category } from "store/types/category.type"

interface CreateProps {
  categories: Category[] | null
}

const Create: FC<CreateProps> = ({ categories }) => {
  return <CreateArticleForm categories={categories} />
}

export default Create

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categories = await CategoryService.findAll()

    return { props: { categories } }
  } catch (error) {
    return {
      props: { categories: null },
    }
  }
}
