import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/auth/Logout';

interface User {
  username: string;
  password?: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const userJson = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user: User | null = userJson ? JSON.parse(userJson) : null;

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
      <Button  type="primary" onClick={handleBack}>
          Back
        </Button>
      <Logout />
    </Card>
  );
};

export default ProfilePage;
