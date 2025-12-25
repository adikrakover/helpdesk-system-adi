import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  CircularProgress, 
  CssBaseline 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage.tsx';
import { TicketDetails } from './components/TicketDetails.tsx';
import { Register } from './pages/Register.tsx';
import { AddAgent } from './pages/AddAgent.tsx';
import { Dashboard } from './components/Dashboard.tsx';

// הגדרת ערכת נושא משמאל לימין (LTR)
const theme = createTheme({
  direction: 'ltr', // ברירת המחדל של MUI
  palette: {
    primary: { main: '#2c3e50' },
    secondary: { main: '#e74c3c' },
  },
});

function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexDirection: 'row-reverse' }}> 
        {/* flexDirection: 'row-reverse' הופך את הסדר של האלמנטים בתוך הבר */}
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
          Helpdesk System | שלום {user.name} ({user.role})
        </Typography>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={logout}
          sx={{ fontWeight: 'bold' }}
        >
          התנתק
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading data...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        {/* הגדרת כיוון כללי משמאל לימין */}
        <Container sx={{ mt: 4, direction: 'ltr' }}>
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
            <Route path="*" element={
              <Box textAlign="center" mt={10}>
                <Typography variant="h4">404 - Page Not Found</Typography>
              </Box>
            } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;