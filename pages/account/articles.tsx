import { NextPage } from 'next';
import Articles from '@/components/Account/Articles/Articles';
import { withAccountLayout } from 'layouts/AccountLayout';
import Account from '@/components/Account/AccountSidebar/AccountSidebar';

const ArticlesPage: NextPage = () => {
  return <Articles />;
};

export default withAccountLayout(ArticlesPage, 'Your articles');
