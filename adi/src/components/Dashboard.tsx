import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TicketList } from './TicketList';
import { CreateTicket } from './CreateTicket';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Box sx={{ p: 3, direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        לוח בקרה - {user.role === 'admin' ? 'מנהל' : user.role === 'agent' ? 'סוכן' : 'לקוח'}
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6">שלום, {user.name} 👋</Typography>
        <Typography variant="body1" color="text.secondary">
          {user.role === 'admin' 
            ? 'כאן תוכל לצפות בכל הפניות, להקצות אותן לסוכנים ולנהל את הגדרות המערכת.' 
            : user.role === 'agent' 
            ? 'כאן תראה את הפניות שהוקצו לטיפולך האישי.' 
            : 'כאן תוכל לעקוב אחר הפניות שפתחת ולפתוח פניות חדשות.'}
        </Typography>
        
       
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* אזור פעולות לקוח */}
      {user.role === 'customer' && (
        <Box sx={{ mb: 4 }}>
          {!showForm ? (
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<AddIcon />} 
              onClick={() => setShowForm(true)}
              sx={{ mb: 2 }}
            >
              פתחי פנייה חדשה
            </Button>
          ) : (
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Button onClick={() => setShowForm(false)} color="error" sx={{ mb: 1 }}>ביטול X</Button>
              <CreateTicket onTicketCreated={() => { setShowForm(false); window.location.reload(); }} />
            </Box>
          )}
        </Box>
      )}

      {/* רשימת הטיקטים - הקומפוננטה שכבר כתבנו שמסננת לפי תפקיד */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
        {user.role === 'customer' ? '📝 הפניות שלי' : '📩 רשימת פניות'}
      </Typography>
      <TicketList />
    </Box>
  );
}