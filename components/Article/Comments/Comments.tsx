import React, { FC, memo } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCommentDto } from '@/store/types/comment.type';
import { CreateCommentSchema } from '@/utils/validation';
import { useTypedDispatch, useTypedSelector } from '@/store/hooks';
import { createComment, removeComment } from '@/store/slices/article';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade } from 'react-awesome-reveal';
import { CommentsProps } from './Comments.props';
import styles from './Comments.module.scss';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Comments: FC<CommentsProps> = ({ comments, articleId }) => {
  const dispatch = useTypedDispatch();
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateCommentDto>({
    resolver: yupResolver(CreateCommentSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CreateCommentDto> = async (
    createCommentDto: CreateCommentDto
  ) => {
    dispatch(createComment({ ...createCommentDto, articleId }));
    reset();
  };

  const handleDeleteCommentary = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

  return (
    <>
      <div className={styles.comments}>
        <div className={styles.comments__container}>
          <Typography
            variant='h6'
            gutterBottom
            component='div'
            className={styles.comments__title}
            id='article-comments'
          >
            {(comments && comments.length) || 0} comments
          </Typography>

          {isAuth ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.comments__form}
            >
              <div className={styles.comments__form__comment}>
                <TextField
                  id='outlined-multiline-static'
                  label='Comment'
                  multiline
                  rows={4}
                  placeholder='Leave a comment...'
                  fullWidth
                  error={errors.text && true}
                  {...register('text')}
                />

                <Button
                  variant='contained'
                  type='submit'
                  disabled={errors.text && true}
                >
                  Send
                </Button>
              </div>
            </form>
          ) : (
            <Typography
              variant='subtitle2'
              gutterBottom
              component='div'
              style={{ marginBottom: 25 }}
            >
              Authorize to leave comment
            </Typography>
          )}

          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <Fade triggerOnce>
                  <div className={styles.comment__header}>
                    <div className={styles.comment__header_avatar}>
                      <img
                        src={
                          `${api}/${comment.author.image}` ||
                          '/account/profile-empty.png'
                        }
                        alt='user-avatar'
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
                    {isAuth && user && user.id === comment.author.id && (
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDeleteCommentary(comment.id)}
                        className={styles.comment__header_delete}
                        size='small'
                      >
                        <DeleteIcon fontSize='inherit' />
                      </IconButton>
                    )}
                  </div>
                  <Typography variant='body1'>{comment.text}</Typography>
                </Fade>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(Comments);
