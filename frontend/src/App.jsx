import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/createPost';
import Login from './pages/login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={logout} />
      <main>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Landing />}
          />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route
            path="/create"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <Signup />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
