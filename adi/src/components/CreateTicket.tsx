import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { 
  TextField, Button, MenuItem, Typography, Paper, Box, CircularProgress 
} from '@mui/material'; // ייבוא רכיבי MUI
import SendIcon from '@mui/icons-material/Send';

export function CreateTicket({ onTicketCreated }: { onTicketCreated: () => void }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priorityId, setPriorityId] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:4000/tickets', 
        { 
          subject, 
          description, 
          priority_id: priorityId,
          status_id: 1 
        }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSubject('');
      setDescription('');

      await Swal.fire({
        title: "הפנייה נוצרה בהצלחה!",
        icon: "success",
        showClass: { popup: 'animate__animated animate__fadeInUp animate__faster' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown animate__faster' }
      });

      onTicketCreated(); 
    } catch (error) {
      console.error('שגיאה ביצירת פנייה:', error);
      Swal.fire({
        title: "אופס...",
        text: "אירעה שגיאה ביצירת הפנייה, נסה שנית.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4, direction: 'rtl' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1a237e' }}>
        יצירת פנייה חדשה
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <TextField
          label="נושא הפנייה"
          variant="outlined"
          fullWidth
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          label="תיאור התקלה"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          select
          label="רמת דחיפות"
          value={priorityId}
          onChange={(e) => setPriorityId(Number(e.target.value))}
          fullWidth
        >
          <MenuItem value={1}>נמוכה (Low)</MenuItem>
          <MenuItem value={2}>בינונית (Medium)</MenuItem>
          <MenuItem value={3}>גבוהה (High)</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon sx={{ mr: 1, ml: 0 }} />}
          sx={{ 
            py: 1.5, 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            backgroundColor: '#27ae60',
            '&:hover': { backgroundColor: '#219150' }
          }}
        >
          {loading ? 'שולח...' : 'שלח פנייה'}
        </Button>

      </Box>
    </Paper>
  );
}