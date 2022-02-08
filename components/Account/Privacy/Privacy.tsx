import React, { FC, useState } from 'react';
import { Button, Divider, Grid, Input, Snackbar } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordDto } from 'store/types/user.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fade } from 'react-awesome-reveal';
import { UpdateUserPasswordSchema } from 'utils/validation';
import AuthService from 'services/Auth.service';
import styles from './Privacy.module.scss';

const Privacy: FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [backendResponseMessage, setBackendResponseMessage] =
    useState<string>('');

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordDto>({
    resolver: yupResolver(UpdateUserPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ChangePasswordDto> = async (
    changePasswordDto: ChangePasswordDto
  ) => {
    try {
      const isPasswordChanged = await AuthService.changePassword(
        changePasswordDto
      );
      setIsFormSubmitted(isPasswordChanged);
      setBackendResponseMessage('Success');
    } catch (error) {
      setIsFormSubmitted(true);
      setBackendResponseMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Fade>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider textAlign='left'>Password</Divider>

          <div className={styles.privacy__item}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={3} md={3}>
                <div className={styles.privacy__title}>Password</div>
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  fullWidth
                  type='password'
                  placeholder='Password'
                  error={errors.currentPassword && true}
                  {...register('currentPassword')}
                />
              </Grid>
            </Grid>
          </div>

          <div className={styles.privacy__item}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={3} md={3}>
                <div className={styles.privacy__title}>New password</div>
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  fullWidth
                  type='password'
                  placeholder='New password'
                  error={errors.newPassword && true}
                  {...register('newPassword')}
                />
              </Grid>
            </Grid>
          </div>

          {isDirty && (
            <Fade>
              <Button
                type='submit'
                className={styles.privacy__submit}
                variant='contained'
              >
                Save
              </Button>
            </Fade>
          )}
        </form>
      </Fade>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isFormSubmitted}
        autoHideDuration={3000}
        transitionDuration={500}
        onClose={() => setIsFormSubmitted(false)}
        message={backendResponseMessage}
        key={'top' + 'center'}
      />
    </>
  );
};

export default Privacy;
