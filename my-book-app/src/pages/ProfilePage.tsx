import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  password?: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const userJson = localStorage.getItem('user');
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  const handleBack = () => {
    navigate('/book');
  };

  if (!user) {
    return <div>No user found. Please login.</div>;
  }

  return (
    <Card
      title="User Profile"
      style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}
    >
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <Button  onClick={handleBack} block>
          Back
        </Button>
      <Button type="primary" danger onClick={handleLogout} block>
        Logout
      </Button>
    </Card>
  );
};

export default ProfilePage;
