import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Typography, Chip, Button, Box, Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TicketItem } from './TicketItem'; 
import type { Ticket } from '../types/ticket';

interface UserResponse { id: number; name: string; role: string; }
interface Agent { id: number; name: string; }

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, uRes] = await Promise.all([
          axios.get<Ticket[]>('http://localhost:4000/tickets', { headers: { Authorization: `Bearer ${token}` } }),
          user?.role === 'admin' ? axios.get<UserResponse[]>('http://localhost:4000/users', { headers: { Authorization: `Bearer ${token}` } }) : null
        ]);

        if (Array.isArray(tRes.data)) setTickets(tRes.data);
        if (uRes) {
          setAgents(uRes.data
            .filter(u => u.role?.toLowerCase() === 'agent' || u.role?.toLowerCase() === 'admin')
            .map(u => ({ id: u.id, name: u.name })));
        }
      } catch (error) {
        toast.error('שגיאה בטעינת הנתונים');
      } finally { setLoading(false); }
    };
    if (token) fetchData();
  }, [token, user?.role]);

  const updateTicket = async (id: number, data: object, msg: string) => {
    try {
      await axios.patch(`http://localhost:4000/tickets/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
      setTickets(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
      toast.success(msg);
    } catch { toast.error('העדכון נכשל'); }
  };

  const deleteTicket = (id: number) => {
    Swal.fire({ title: "למחוק פנייה?", icon: "warning", showCancelButton: true, confirmButtonText: "כן" }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4000/tickets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          setTickets(prev => prev.filter(t => t.id !== id));
          Swal.fire("נמחק!", "", "success");
        } catch { toast.error("המחיקה נכשלה"); }
      }
    });
  };

  if (loading) return <Typography sx={{ p: 4, textAlign: 'center' }}>טוען...</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, direction: 'rtl', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Toaster position="top-center" />
      
      {/* כותרת עליונה */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, maxWidth: '800px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>פניות שירות</Typography>
          <Chip label={`${tickets.length} פניות`} color="primary" />
        </Box>
        {user?.role === 'admin' && (
          <Button variant="contained" color="secondary" startIcon={<PersonAddIcon />} onClick={() => navigate('/add-agent')}>
            הוספת סוכן
          </Button>
        )}
      </Box>

      {/* רשימת הפניות */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        {tickets.map(t => (
          <TicketItem 
            key={t.id} ticket={t} userRole={user?.role} agents={agents}
            onStatusChange={(id, sid) => updateTicket(id, { status_id: sid, status_name: sid === 1 ? 'open' : 'closed' }, 'סטטוס עודכן')}
            onPriorityChange={(id, pid) => updateTicket(id, { priority_id: pid }, 'עדיפות עודכנה')}
            onAssign={(id, aid) => updateTicket(id, { assigned_to: aid }, 'סוכן שויך')}
            onDelete={deleteTicket}
            onViewDetails={(id) => navigate(`/tickets/${id}`)}
          />
        ))}
        {tickets.length === 0 && (
          <Paper sx={{ p: 8, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            <Typography color="text.secondary">אין פניות להצגה</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}