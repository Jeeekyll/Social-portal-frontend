import { useState } from 'react';
import Popup from '@/components/UI/Popup/Popup';

const Test = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onClose = () => setIsOpened(false);
  const onOpen = () => setIsOpened(true);

  return (
    <div style={{ marginTop: 100 }}>
      <div>test</div>
      <button onClick={onOpen}>Open Modal</button>

      <Popup onClose={onClose} isOpened={isOpened}>
        <div style={{ width: 200, padding: 20, background: 'white' }}>
          CONTENT!!!
        </div>
      </Popup>
    </div>
  );
};

export default Test;
