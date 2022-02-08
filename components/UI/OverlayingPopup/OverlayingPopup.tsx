import React, { FC } from 'react';
import Portal from '@/components/UI/Portal';
import styles from './OverlayingPopup.module.scss';

interface OverlayingPopupProps {
  onClose: () => void;
  isOpened: boolean;
}

const OverlayingPopup: FC<OverlayingPopupProps> = ({
  children,
  onClose,
  isOpened,
}) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.popup}>
        <div
          className={styles.overlay}
          role='button'
          tabIndex={0}
          onClick={onClose}
        />
        {children}
      </div>
    </Portal>
  );
};

export default OverlayingPopup;
