import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearReviews } from '../../features/reviews/reviewsSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handles user logout by clearing reviews, removing user data, and redirecting to login
  const handleLogout = () => {
    dispatch(clearReviews()); 
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
  );
};

export default Logout;
