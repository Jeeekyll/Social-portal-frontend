import React, { FC } from 'react';
import { PopupProps } from '@components/UI/Popup/Popup.props';
import OverlayingPopup from '@components/UI/OverlayingPopup/OverlayingPopup';
import styles from './Popup.module.scss';
import cn from 'classnames';

const Popup: FC<PopupProps> = ({
  isOpened,
  onClose,
  className,
  title,
  onPrevArrowClick,
  children,
}) => {
  return (
    <OverlayingPopup onClose={onClose} isOpened={isOpened}>
      <div className={cn(styles.popup, className)}>
        <div>
          {title}
          <button onClick={onClose}>Close</button>
        </div>

        {children}
      </div>
    </OverlayingPopup>
  );
};

export default Popup;
