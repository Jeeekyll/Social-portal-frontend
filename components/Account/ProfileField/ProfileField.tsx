import React, { FC, useEffect, useState } from 'react';
import { Grid, Input } from '@mui/material';
import EditButton from '@/components/Account/Settings/EditButton';
import { Controller } from 'react-hook-form';
import { ProfileFieldProps } from '@/components/Account/ProfileField/ProfileField.props';
import styles from '@/components/Account/ProfileField/ProfileField.module.scss';

const ProfileField: FC<ProfileFieldProps> = ({
  control,
  error,
  name,
  placeholder,
  getFieldValue,
  isReset,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const activateField = () => {
    setIsEditMode(true);
  };

  const discardField = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (isReset) discardField();
  }, [isReset]);

  return (
    <div className={styles.settings__item}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={3} md={3}>
          <div className={styles.settings__item__title}>{placeholder}</div>
        </Grid>
        <Grid item xs={4} md={4}>
          {isEditMode ? (
            <Controller
              render={({ field: { onChange, value } }) => (
                <Input
                  fullWidth
                  placeholder={placeholder}
                  error={error}
                  onChange={onChange}
                  value={value}
                />
              )}
              control={control}
              name={name}
              defaultValue={''}
            />
          ) : (
            <div className={styles.settings__item__value}>
              {getFieldValue(name)}
            </div>
          )}
        </Grid>
        <Grid item xs={5} md={5}>
          <EditButton
            isActive={isEditMode}
            activateField={activateField}
            discardFiled={discardField}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileField;
