import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Snackbar } from '@mui/material';
import { UpdateUserCredentialsSchema } from '@/utils/validation';
import Avatar from '@/components/Account/Settings/Avatar';
import { UpdateUserDto } from '@/store/types/user.type';
import { updateUser } from '@/store/slices/user';
import { useTypedDispatch, useTypedSelector } from '@/store/hooks';
import styles from '@/components/Account/Settings/Settings.module.scss';
import ProfileField from '@/components/Account/ProfileField';

const Settings = () => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: yupResolver(UpdateUserCredentialsSchema),
    defaultValues: useMemo(() => user, [user]),
    mode: 'onChange',
  });

  const getFieldValue = useCallback(
    (name: any): string => {
      return getValues(name);
    },
    [control]
  );

  useEffect(() => {
    const { username, email, bio } = user;
    reset({ username, email, bio });
  }, []);

  const onSubmit: SubmitHandler<UpdateUserDto> = (
    updateUserDto: UpdateUserDto
  ) => {
    dispatch(updateUser(updateUserDto));
    setIsFormSubmitted(true);
  };

  return (
    <>
      <Fade>
        <Divider textAlign='left'>Avatar</Divider>
        <Avatar />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider textAlign='left'>General</Divider>

          <ProfileField
            control={control}
            error={errors.username && true}
            name={'username'}
            placeholder={'Username'}
            getFieldValue={getFieldValue}
            isReset={isFormSubmitted}
          />

          <ProfileField
            control={control}
            error={errors.username && true}
            name={'email'}
            placeholder={'Email'}
            getFieldValue={getFieldValue}
            isReset={isFormSubmitted}
          />

          <Divider textAlign='left'>Advanced</Divider>

          <ProfileField
            control={control}
            error={errors.username && true}
            name={'bio'}
            placeholder={'Bio'}
            getFieldValue={getFieldValue}
            isReset={isFormSubmitted}
          />

          <Button
            type='submit'
            variant='contained'
            className={styles.settings__submit}
          >
            Save
          </Button>
        </form>
      </Fade>

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
