import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TicketList } from './TicketList';
import { CreateTicket } from './CreateTicket';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function Dashboard() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  if (!user) return null;

  return (
    <Box sx={{ p: 3, direction: 'rtl', textAlign: 'right' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        לוח בקרה - {user.role === 'admin' ? 'מנהל' : user.role === 'agent' ? 'סוכן' : 'לקוח'}
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6">שלום, {user.name} 👋</Typography>
        <Typography variant="body1" color="text.secondary">
          ניהול פניות שירות במערכת ה-Helpdesk.
        </Typography>
      </Paper>
      <Divider sx={{ my: 4 }} />
      {user.role === 'customer' && (
        <Box sx={{ mb: 4 }}>
          {!showForm ? (
            <Button variant="contained" color="success" startIcon={<AddIcon sx={{ ml: 1 }} />} onClick={() => setShowForm(true)}>
              פתיחת פנייה חדשה
            </Button>
          ) : (
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Button onClick={() => setShowForm(false)} color="error" sx={{ mb: 1 }}>ביטול X</Button>
              <CreateTicket onTicketCreated={() => { setShowForm(false); window.location.reload(); }} />
            </Box>
          )}
        </Box>
      )}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
        {user.role === 'customer' ? '📝 הפניות שלי' : '📩 רשימת פניות'}
      </Typography>
      <TicketList />
    </Box>
  );
}