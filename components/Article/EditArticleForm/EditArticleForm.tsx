import React, {
  ChangeEvent,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Article, UpdateArticleDto } from "store/types/article.type"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UpdateArticle } from "utils/validation"
import ArticleService from "services/Article.service"
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import Link from "next/link"
import classNames from "classnames"
import { PhotoCamera } from "@mui/icons-material"
import { Fade } from "react-awesome-reveal"
import { useRouter } from "next/router"
import { formatDistanceToNow } from "date-fns"
import { Category } from "store/types/category.type"
import { EditArticleFormProps } from "./EditArticleForm.props"
import styles from "../CreateArticleForm/CreateArticleForm.module.scss"

const EditArticleForm: FC<EditArticleFormProps> = ({
  article: serverArticle,
  categories: serverCategories,
}) => {
  const router = useRouter()

  const [article, setArticle] = useState<Article | null>(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  const [articleCover, setArticleCover] = useState<string | null>(null)
  const articleCoverInputRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<Category[] | null>(null)

  const onArticleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files[0]) return

    const data = new FormData()
    data.append("cover", event.target.files[0])

    try {
      await ArticleService.updateCover(data, router.query.slug as string)
      setArticleCover(event.target.files[0].name)
    } catch (error) {
      console.log(error)
    }
  }

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateArticleDto>({
    resolver: yupResolver(UpdateArticle),
    defaultValues: useMemo(
      () => ({ ...article, category: article?.category?.id }),
      [article]
    ),
    mode: "onChange",
  })

  useEffect(() => {
    if (!serverArticle || !serverCategories) return

    setArticle(serverArticle)
    setCategories(serverCategories)
    setArticleCover(serverArticle.cover)

    reset({
      title: serverArticle.title,
      description: serverArticle.description,
      body: serverArticle.body,
      category: serverArticle.category.id,
    })
  }, [serverArticle])

  const onSubmit: SubmitHandler<UpdateArticleDto> = async (
    updateArticleDto: UpdateArticleDto
  ) => {
    try {
      await ArticleService.update(updateArticleDto, router.query.slug as string)

      setIsFormSubmitted(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.create}>
        <div className={styles.create__container}>
          <div className={styles.create__content__container}>
            <div className={styles.create__title}>
              <Typography variant='h4' gutterBottom component='div'>
                Edit post
              </Typography>
            </div>

            {article && (
              <div className={styles.create__header}>
                <div className={styles.create__header_date}>
                  Created {formatDistanceToNow(new Date(article.createdAt))} ago
                </div>

                <div>{article.author.username}</div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                variant='standard'
                label='Title'
                {...register("title")}
                className={styles.create__item}
                error={errors.title && true}
              />
              <TextField
                label='Description'
                multiline
                maxRows={6}
                fullWidth
                variant='standard'
                {...register("description")}
                className={styles.create__item}
                error={errors.description && true}
              />
              <TextField
                label='Content'
                multiline
                maxRows={10}
                fullWidth
                variant='standard'
                {...register("body")}
                className={styles.create__item}
                error={errors.body && true}
              />

              <div className={classNames(styles.create__cover)}>
                <IconButton
                  color='primary'
                  onClick={() => articleCoverInputRef.current.click()}
                  type='button'
                  size='large'
                >
                  <PhotoCamera />
                </IconButton>
                <Typography variant='body2'>
                  {articleCover || "Upload cover"}
                </Typography>
              </div>

              <input
                type='file'
                ref={articleCoverInputRef}
                style={{ display: "none" }}
                accept='image/*'
                onChange={onArticleCoverUpload}
              />

              {categories && categories.length > 0 && (
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      variant='standard'
                      error={errors.category && true}
                      className={styles.create__item}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category.id} key={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  control={control}
                  name='category'
                  defaultValue={categories[0].id}
                />
              )}

              <Fade>
                <div className={styles.create__actions}>
                  {isDirty && (
                    <Fade triggerOnce>
                      <Button
                        type='submit'
                        variant='contained'
                        disabled={Object.keys(errors).length > 0}
                      >
                        Save
                      </Button>
                    </Fade>
                  )}

                  <Link href={`/articles/${serverArticle.slug}`}>
                    <a className={styles.create__title__exit}>
                      <Button variant='outlined'>Back</Button>
                    </a>
                  </Link>
                </div>
              </Fade>
            </form>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isFormSubmitted}
        autoHideDuration={3000}
        transitionDuration={500}
        onClose={() => setIsFormSubmitted(false)}
        message='Success'
        key={"top" + "center"}
      />
    </>
  )
}

export default EditArticleForm
