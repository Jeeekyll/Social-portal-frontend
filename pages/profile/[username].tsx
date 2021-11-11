import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import Profile from 'components/Profile';

interface ProfilePageProps {
  username: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ username }) => {
  return <Profile username={username} />;
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      username: params.username,
    },
  };
};
