import React, { ReactElement } from 'react';
import Profile from '@/components/Account/Profile/Profile';
import { withAccountLayout } from '@/layouts/AccountLayout';
import { NextPage } from 'next';

const ProfilePage: NextPage = (): ReactElement => {
  return <Profile />;
};

export default withAccountLayout(ProfilePage, 'Profile');
