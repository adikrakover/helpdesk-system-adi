import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert, 
  CircularProgress,
  Avatar,
  Link,
  Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('אימייל או סיסמה שגויים. נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10, // רווח מעט גדול יותר מהקצה העליון
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={4} // צל עדין ויוקרתי יותר
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            borderRadius: 4, // פינות מעוגלות יותר למראה מודרני
            width: '100%',
            backgroundColor: '#ffffff'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          
          <Typography component="h1" variant="h4" sx={{ fontWeight: 800, mt: 1, color: '#1a237e' }}>
            כניסה
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            מערכת לניהול פניות שירות
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="כתובת אימייל"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.8, 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {isSubmitting ? <CircularProgress size={26} color="inherit" /> : 'התחברות'}
            </Button>

            <Divider sx={{ my: 3, fontSize: '0.8rem', color: 'text.disabled' }}>או</Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                אין לך חשבון עדיין? {' '}
                <Link 
                  component="button"
                  type="button"
                  variant="body2" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    fontWeight: 'bold', 
                    textDecoration: 'none', 
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' } 
                  }}
                >
                  הירשם כאן
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}