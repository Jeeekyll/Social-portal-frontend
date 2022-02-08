import Header from '@components/Header/Header';
import React, { FC, useEffect } from 'react';
import { useTypedDispatch } from '@store/hooks';
import { checkAuth } from '@store/slices/user';

const DefaultLayout: FC = ({ children }) => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
