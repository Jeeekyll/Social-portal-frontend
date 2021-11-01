import React, { FC } from "react";
import styles from "./Comments.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import { CommentsProps } from "./Comments.props";
import { formatDistanceToNow } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateCommentDto } from "store/types/comment.type";
import { CreateArticleComment } from "utils/validation";
import { useTypedDispatch } from "store/hooks";
import { createArticleComment } from "store/slices/article";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Comments: FC<CommentsProps> = ({ comments, articleId }) => {
  const dispatch = useTypedDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateCommentDto>({
    resolver: yupResolver(CreateArticleComment),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateCommentDto> = async (
    createCommentDto: CreateCommentDto
  ) => {
    dispatch(createArticleComment({ ...createCommentDto, articleId }));
    reset();
  };

  return (
    <>
      <div className={styles.comments}>
        <div className={styles.comments__container}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={styles.comments__title}
            id="article-comments"
          >
            {(comments && comments.length) || 0} comments
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.comments__form}
          >
            <div className={styles.comments__form__comment}>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                placeholder="Leave a comment..."
                fullWidth
                error={errors.text && true}
                {...register("text")}
              />

              <Button
                variant="contained"
                type="submit"
                disabled={errors.text && true}
              >
                Send
              </Button>
            </div>
          </form>

          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.comment__header}>
                  <div className={styles.comment__header_avatar}>
                    <img
                      src={
                        `${api}/${comment.author.image}` ||
                        "/account/profile-empty.png"
                      }
                      alt="user-avatar"
                    />
                  </div>
                  <div className={styles.comment__header__content}>
                    <div className={styles.comment__header__content_author}>
                      {comment.author.username}
                    </div>
                    <div className={styles.comment__header__content_date}>
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </div>
                  </div>
                </div>
                <Typography variant="body1">{comment.text}</Typography>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
