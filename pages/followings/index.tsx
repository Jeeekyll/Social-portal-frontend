import React, { useEffect, useState } from 'react';
import { User } from 'store/types/user.type';
import ProfileService from 'services/Profile.service';
import { useTypedSelector } from 'store/hooks';

const Index = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchFollowingsUsers = async () => {
    try {
      const users = await ProfileService.findFollowings();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuth) return;

    fetchFollowingsUsers();
  }, [isAuth]);

  return (
    <div style={{ marginTop: 120 }}>
      <h3>Your following</h3>
      <div>
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <div>{user.username} </div>
              <div>{user.bio}</div>
              <div>PODPISAN???</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
