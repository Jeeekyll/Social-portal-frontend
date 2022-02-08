export interface PopupProps {
  isOpened: boolean;
  onClose: () => void;
  title?: string;
  onPrevArrowClick?: () => void;
  className?: string;
}
