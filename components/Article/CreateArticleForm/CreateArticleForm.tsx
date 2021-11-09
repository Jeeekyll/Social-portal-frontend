import React, { FC, useEffect, useState } from "react";
import styles from "./CreateArticleForm.module.scss";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Article, CreateArticleDto } from "store/types/article.type";
import { Fade } from "react-awesome-reveal";
import { CreateArticle } from "utils/validation";
import ArticleService from "services/Article.service";
import Link from "next/link";
import { Category } from "store/types/category.type";

interface CreateArticleFormProps {
  categories: Category[] | null;
}

const CreateArticleForm: FC<CreateArticleFormProps> = ({
  categories: serverCategories,
}) => {
  const [isArticleCreated, setIsArticleCreated] = useState<boolean>(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    setCategories(serverCategories);
  }, [serverCategories]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<CreateArticleDto>({
    resolver: yupResolver(CreateArticle),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateArticleDto> = async (
    createArticleDto: CreateArticleDto
  ) => {
    try {
      const article = await ArticleService.create(createArticleDto);
      setArticle(article);
      setIsArticleCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.create}>
      <div className={styles.create__container}>
        <div className={styles.create__content__container}>
          {isArticleCreated ? (
            <>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                className={styles.create__title}
              >
                Success
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className={styles.create__title}
              >
                Your post created. You can
                <Link href={`/articles/${article.slug}`}> view </Link> it now.
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                className={styles.create__title}
              >
                Create post
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Title"
                  {...register("title")}
                  className={styles.create__item}
                  error={errors.title && true}
                />
                <TextField
                  label="Description"
                  multiline
                  maxRows={6}
                  fullWidth
                  variant="standard"
                  {...register("description")}
                  className={styles.create__item}
                  error={errors.description && true}
                />
                <TextField
                  label="Content"
                  multiline
                  maxRows={6}
                  fullWidth
                  variant="standard"
                  {...register("body")}
                  className={styles.create__item}
                  error={errors.body && true}
                />

                {categories && categories.length > 0 && (
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={onChange}
                        value={value}
                        variant="standard"
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
                    name="category"
                    defaultValue={categories[0].id}
                  />
                )}

                {isDirty && (
                  <Fade>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={Object.keys(errors).length > 0}
                    >
                      Create
                    </Button>
                  </Fade>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateArticleForm;
