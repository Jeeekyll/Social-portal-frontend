import React, { FC, ReactElement, useEffect, useState } from 'react';
import AccountLayout from 'layouts/AccountLayout';
import Settings from 'components/Account/Settings/Settings';

const SettingsPage: FC = (): ReactElement => {
  return (
    <AccountLayout title='General settings'>
      <Settings />
    </AccountLayout>
  );
};

export default SettingsPage;
