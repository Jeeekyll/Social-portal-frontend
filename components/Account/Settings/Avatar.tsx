import React, { ChangeEvent, useRef } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store/hooks';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button } from '@mui/material';
import { deleteAvatar, uploadAvatar } from 'store/slices/user';
import styles from './Avatar.module.scss';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Avatar = () => {
  const { image } = useTypedSelector((state) => state.user.user);
  const dispatch = useTypedDispatch();

  const fileUploadRef = useRef(null);

  const imageSource = (): string =>
    image ? `${api}/${image}` : '/account/profile-empty.png';

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files[0]) return;

    const data = new FormData();
    data.append('avatar', event.target.files[0]);

    dispatch(uploadAvatar(data));
  };

  const onDeleteImage = () => {
    dispatch(deleteAvatar());
  };

  return (
    <div className={styles.avatar}>
      <div className={styles.avatar__image}>
        <img src={imageSource()} alt='avatar' />

        <div className={styles.avatar__actions}>
          {image && (
            <Button
              size='small'
              variant='contained'
              color='primary'
              onClick={onDeleteImage}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          )}

          <Button
            size='small'
            variant='contained'
            color='primary'
            onClick={() => fileUploadRef.current.click()}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
        </div>
      </div>

      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={fileUploadRef}
        onChange={onUploadImage}
      />
    </div>
  );
};

export default Avatar;
