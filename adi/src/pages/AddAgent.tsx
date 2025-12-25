import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container, Avatar } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export function AddAgent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // שליחת בקשה לשרת ליצירת סוכן חדש
      await axios.post('http://localhost:4000/users', {
        name,
        email,
        password,
        role: 'agent' // הגדרה קבועה של התפקיד כסוכן
      }, {
        headers: { Authorization: `Bearer ${token}` }     });

      // 1. הודעת הצלחה
      toast.success('הסוכן נוסף בהצלחה למערכת!');

      // השהיה קצרה כדי שהמשתמש יספיק לראות את ההודעה לפני המעבר
      setTimeout(() => {
        // 2. חזרה לרשימת הפניות - שם הסלקט יתעדכן אוטומטית מהשרת
        navigate('/');
      }, 1500);

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'שגיאה בהוספת הסוכן');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Toaster position="top-center" />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl' }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, width: '100%' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            הוספת סוכן חדש
          </Typography>
          
          <Box component="form" onSubmit={handleAddAgent} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="שם הסוכן"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
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
              color="secondary"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              {isSubmitting ? 'מוסיף סוכן...' : 'צור סוכן'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/')}
            >
              ביטול וחזרה
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}