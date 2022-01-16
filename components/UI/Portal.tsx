import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC = ({ children }) => {
  const [container] = useState<HTMLDivElement>(() =>
    document.createElement('div')
  );

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
