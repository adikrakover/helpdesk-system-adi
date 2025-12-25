import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Alert, CircularProgress, Avatar, Link, Divider 
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
    } finally { setIsSubmitting(false); }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={4} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 4, width: '100%' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 800, mt: 1, color: '#1a237e' }}>כניסה</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 2 }}>
            <TextField margin="normal" required fullWidth label="כתובת אימייל" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="normal" required fullWidth label="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{ mt: 4, mb: 2, py: 1.8, fontWeight: 'bold' }}>
              {isSubmitting ? <CircularProgress size={26} color="inherit" /> : 'התחברות'}
            </Button>
            <Divider sx={{ my: 3 }}>או</Divider>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
                אין לך חשבון עדיין? הירשם כאן
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}