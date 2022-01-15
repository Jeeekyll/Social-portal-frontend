import React, { useEffect, useMemo, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserDto } from 'store/types/user.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Grid, Input, Snackbar } from '@mui/material';
import { UpdateUserCredentialsSchema } from 'utils/validation';
import { Fade } from 'react-awesome-reveal';
import { updateUser } from 'store/slices/user';
import EditButton from './EditButton';
import styles from './Settings.module.scss';
import Avatar from './Avatar';

const Settings = () => {
  const dispatch = useTypedDispatch();
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: yupResolver(UpdateUserCredentialsSchema),
    defaultValues: useMemo(() => user, [user]),
    mode: 'onChange',
  });

  const [isUsernameActive, setIsUsernameActive] = useState<boolean>(false);

  const handleActiveUsernameChange = (): void => {
    setIsUsernameActive(true);
  };

  const handleDiscardUsernameChange = (): void => {
    reset({ ...getValues(), username: user.username });
    setIsUsernameActive(false);
  };

  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);

  const handleActiveEmailChange = (): void => {
    setIsEmailActive(true);
  };

  const handleDiscardEmailChange = (): void => {
    reset({ ...getValues(), email: user.email });
    setIsEmailActive(false);
  };

  const [isBioActive, setIsBioActive] = useState<boolean>(false);
  const handleActiveBioChange = (): void => {
    setIsBioActive(true);
  };

  const handleDiscardBioChange = (): void => {
    reset({ ...getValues(), bio: user.bio });
    setIsBioActive(false);
  };

  const resetFormState = () => {
    setIsBioActive(false);
    setIsEmailActive(false);
    setIsUsernameActive(false);
  };

  useEffect(() => {
    if (!user) return;

    reset({
      username: user.username,
      email: user.email,
      bio: user.bio,
    });
  }, [user]);

  const onSubmit: SubmitHandler<UpdateUserDto> = async (
    updateUserDto: UpdateUserDto
  ) => {
    await dispatch(updateUser(updateUserDto));
    await resetFormState();
    setIsFormSubmitted(true);
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <>
      {isAuth && (
        <Fade>
          <Divider textAlign='left'>Avatar</Divider>
          <Avatar />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider textAlign='left'>General</Divider>

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Username</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isUsernameActive ? (
                    <Input
                      fullWidth
                      placeholder='Username'
                      error={errors.username && true}
                      {...register('username')}
                    />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.username}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <EditButton
                    isActive={isUsernameActive}
                    activateField={handleActiveUsernameChange}
                    discardFiled={handleDiscardUsernameChange}
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Email</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isEmailActive ? (
                    <Input
                      fullWidth
                      placeholder='Email'
                      error={errors.email && true}
                      {...register('email')}
                    />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.email}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <EditButton
                    isActive={isEmailActive}
                    activateField={handleActiveEmailChange}
                    discardFiled={handleDiscardEmailChange}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider textAlign='left'>Advanced</Divider>

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Bio</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isBioActive ? (
                    <Input
                      fullWidth
                      placeholder='Bio'
                      error={errors.bio && true}
                      {...register('bio')}
                    />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.bio || 'Data not specified'}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <EditButton
                    isActive={isBioActive}
                    activateField={handleActiveBioChange}
                    discardFiled={handleDiscardBioChange}
                  />
                </Grid>
              </Grid>
            </div>

            <Button
              type='submit'
              variant='contained'
              className={styles.settings__submit}
            >
              Save
            </Button>
          </form>
        </Fade>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isFormSubmitted}
        autoHideDuration={3000}
        transitionDuration={500}
        onClose={() => setIsFormSubmitted(false)}
        message='Success'
        key={'top' + 'center'}
      />
    </>
  );
};

export default Settings;
