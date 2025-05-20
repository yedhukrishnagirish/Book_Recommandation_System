import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { Outlet } from 'react-router-dom';

const DummyBooksPage = () => (
  <div>
    <h1>Book List (Dummy Page)</h1>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <DummyBooksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
