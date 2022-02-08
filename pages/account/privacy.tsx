import React from 'react';
import Privacy from 'components/Account/Privacy/Privacy';
import { withAccountLayout } from 'layouts/AccountLayout';
import { NextPage } from 'next';

const PrivacyPage: NextPage = () => {
  return <Privacy />;
};

export default withAccountLayout(PrivacyPage, 'Privacy');
