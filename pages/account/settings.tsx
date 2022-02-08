import React, { ReactElement } from 'react';
import Settings from 'components/Account/Settings/Settings';
import { withAccountLayout } from 'layouts/AccountLayout';
import { NextPage } from 'next';

const SettingsPage: NextPage = (): ReactElement => {
  return <Settings />;
};

export default withAccountLayout(SettingsPage, 'Settings');
