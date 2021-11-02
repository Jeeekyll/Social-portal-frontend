import React, { ChangeEvent, FC, useRef, useState } from "react";
import styles from "./CreateArticleForm.module.scss";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Article, CreateArticleDto } from "store/types/article.type";
import { Fade } from "react-awesome-reveal";
import { CreateArticle } from "utils/validation";
import ArticleService from "services/Article.service";
import Link from "next/link";
import { PhotoCamera } from "@mui/icons-material";
import classNames from "classnames";

const CreateArticleForm: FC = () => {
  const [isArticleCreated, setIsArticleCreated] = useState<boolean>(false);
  const [article, setArticle] = useState<Article | null>(null);

  const [articleCover, setArticleCover] = useState<string | null>(null);
  const articleCoverInputRef = useRef<HTMLInputElement>(null);

  const onArticleCoverUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files[0]) return;

    setArticleCover(event.target.files[0].name);
  };

  const {
    handleSubmit,
    register,
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
                Your post created. You can{" "}
                <Link href={`/articles/${article.slug}`}>view</Link> it now.
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

                <div className={classNames(styles.create__cover)}>
                  <IconButton
                    color="primary"
                    onClick={() => articleCoverInputRef.current.click()}
                    type="button"
                    size="large"
                  >
                    <PhotoCamera />
                  </IconButton>
                  <Typography variant="body2">
                    {articleCover || "Upload cover"}
                  </Typography>
                </div>

                <input
                  type="file"
                  ref={articleCoverInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={onArticleCoverUpload}
                />

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
