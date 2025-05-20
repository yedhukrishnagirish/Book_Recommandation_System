import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import Login from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book"  element={
            <ProtectedRoute>
              <BookListPage />
            </ProtectedRoute>
          }  />
        <Route path="/books/:id" element={
            <ProtectedRoute>
              <BookDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
