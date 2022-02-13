import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEdit from '@mui/icons-material/ModeEdit';
import styles from './Settings.module.scss';
import cn from 'classnames';

interface EditButtonProps {
  isActive: boolean;
  activateField: () => void;
  discardFiled: () => void;
}

const EditButton: FC<EditButtonProps> = ({
  isActive,
  activateField,
  discardFiled,
}) => (
  <div className={cn(styles.edit__wrapper)}>
    {isActive ? (
      <div className={styles.edit} onClick={discardFiled}>
        <IconButton color='primary' size='small'>
          <EditOffIcon />
        </IconButton>
        <div>Save</div>
      </div>
    ) : (
      <div className={styles.edit} onClick={activateField}>
        <IconButton color='primary' size='small'>
          <ModeEdit />
        </IconButton>
        <div>Change</div>
      </div>
    )}
  </div>
);

export default EditButton;
