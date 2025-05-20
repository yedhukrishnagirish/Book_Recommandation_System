import { Link, useNavigate } from 'react-router-dom';
import '../../src/utils/css/Header.css';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import Logout from '../components/auth/Logout';

const Header = () => {
  const navigate = useNavigate();

  // Redirect to login if no user is found in storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')!);
  const username = user.username;

  // Clear user data and redirect to login on logout
  return (
    <>
      <header className="header-container">
        <h1 className="header-title">Book Recommendation System</h1>
        <Link to="/profile" aria-label="Profile" className="profile-link">
          <Tooltip title={username}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
            />
          </Tooltip>
        </Link>
      </header>

      <footer className="footer-container">
        <Logout />
      </footer>
    </>
  );
};

export default Header;
