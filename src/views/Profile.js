import React from 'react';
import Profile from '../components/Profile';

const ProfileView = () => {
  // Fetch user data from the database or use state if available
  const user = {
    name: 'John Doe',
    sectors: ['Technology'],
    agree: true,
  };

  return (
    <div>
      <h1>Profile</h1>
      <Profile {...user} />
    </div>
  );
};

export default ProfileView;
