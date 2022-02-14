import { NextPage } from 'next';
import Articles from '@/components/Account/Articles/Articles';
import { withAccountLayout } from '@/layouts/AccountLayout';

const ArticlesPage: NextPage = () => {
  return <Articles />;
};

export default withAccountLayout(ArticlesPage, 'Your articles');
