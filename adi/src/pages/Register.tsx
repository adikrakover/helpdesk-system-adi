import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Avatar, 
  Link 
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ייבוא ה-AuthContext
import toast, { Toaster } from 'react-hot-toast';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth(); // שימוש בפונקציית ההתחברות
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. שלב ההרשמה בשרת
      await axios.post('http://localhost:4000/auth/register', {
        name,
        email,
        password,
        role: 'customer'
      });

      toast.success('החשבון נוצר! מתחבר למערכת...');

      // 2. שלב ההתחברות האוטומטית
      // אנחנו משתמשים בפונקציית ה-login שכבר קיימת לך במערכת
      await login(email, password);
      
      // 3. מעבר לדף הבית
      navigate('/');
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'שגיאה בתהליך ההרשמה');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Toaster position="top-center" />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            יצירת חשבון חדש
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="כתובת אימייל"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              {isSubmitting ? 'מעבד...' : 'הרשמה וכניסה למערכת'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                {"כבר יש לך חשבון? התחבר כאן"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}