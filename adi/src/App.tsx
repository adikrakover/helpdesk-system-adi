import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage.tsx';
import { TicketList } from './components/TicketList.tsx';
import { TicketDetails } from './components/TicketDetails.tsx';
import { Register } from './pages/Register.tsx';
import { AddAgent } from './pages/AddAgent.tsx';
import { Dashboard } from './components/Dashboard.tsx'; // תיקון הייבוא כאן!

function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '10px 20px', 
      backgroundColor: '#2c3e50', 
      color: 'white',
      direction: 'rtl' 
    }}>
      <div>
        <strong>Helpdesk System</strong> | שלום {user.name} ({user.role})
      </div>
      <button 
        onClick={logout} 
        style={{ 
          cursor: 'pointer', 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        התנתק
      </button>
    </nav>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2rem' }}>טוען נתונים...</div>;
  }

  return (
    <Router>
      <Navbar />
      <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />

          <Route path="/tickets/:id" element={user ? <TicketDetails /> : <Navigate to="/login" />} />
          
          <Route 
            path="/add-agent" 
            element={user?.role === 'admin' ? <AddAgent /> : <Navigate to="/" />} 
          />
          
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h2>404 - דף לא נמצא</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;