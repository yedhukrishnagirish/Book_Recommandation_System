import { Link, useNavigate } from 'react-router-dom';
import '../../src/utils/css/Header.css';
import { Avatar, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  const username = JSON.parse(localStorage.getItem('user')!).username;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <>
        <header className="header-container">
            <Link to="/profile" aria-label="Profile">
                <Tooltip title={username}>
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        style={{ cursor: 'pointer' }}
                    />      
                </Tooltip>
            </Link>
        </header>

        <footer className="footer-container">
            <Button type="primary" danger onClick={handleLogout}  size="small">
                Logout
            </Button>
        </footer>
    </>
  );
};

export default Header;
