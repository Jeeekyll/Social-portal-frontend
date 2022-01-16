import React, { FC } from 'react';
import AccountLayout from 'layouts/AccountLayout';
import Settings from 'components/Account/Settings/Settings';

const SettingsPage: FC = () => {
  return (
    <AccountLayout title='General settings'>
      <Settings />
    </AccountLayout>
  );
};

export default SettingsPage;
