import { Card, CardContent, CardActions, Typography, Chip, Button, Box, Divider, Avatar, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import type { Ticket } from '../types/ticket';

interface TicketItemProps {
  ticket: Ticket;
  userRole: string | undefined;
  agents: { id: number; name: string }[];
  onStatusChange: (id: number, status: number) => void;
  onPriorityChange: (id: number, priority: number) => void;
  onAssign: (id: number, agentId: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export const TicketItem = ({ ticket, userRole, agents, onStatusChange, onPriorityChange, onAssign, onDelete, onViewDetails }: TicketItemProps) => (
  <Card 
    elevation={3} 
    sx={{ 
      width: '100%', 
      maxWidth: '850px',
      borderRadius: 4, 
      mb: 2,
      borderRight: `8px solid ${ticket.status_name === 'open' ? '#2e7d32' : '#9e9e9e'}` // פס צבע עבה יותר
    }}
  >
    <CardContent sx={{ p: 3 }}> 
      
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#1a237e', width: 48, height: 48, fontSize: '1.2rem' }}>
            {ticket.id}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {ticket.subject}
          </Typography>
        </Box>

        {(userRole === 'admin' || userRole === 'agent') ? (
          <Select
            value={ticket.status_id || (ticket.status_name === 'open' ? 1 : 2)}
            onChange={(e) => onStatusChange(ticket.id, Number(e.target.value))}
            sx={{ minWidth: 120, fontSize: '1rem' }}
          >
            <MenuItem value={1}>פתוח</MenuItem>
            <MenuItem value={2}>סגור</MenuItem>
          </Select>
        ) : (
          <Chip 
            label={ticket.status_name === 'open' ? 'פתוח' : 'סגור'} 
            sx={{ fontWeight: 'bold', fontSize: '1rem', height: 32 }} 
          />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
  
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AssignmentIndIcon color="action" fontSize="medium" /> 
          {userRole === 'admin' ? (
            <Select
              displayEmpty
              value={ticket.assigned_to || ""}
              onChange={(e) => onAssign(ticket.id, Number(e.target.value))}
              sx={{ minWidth: 180, fontSize: '1rem' }}
            >
              <MenuItem value="" disabled>שיוך סוכן...</MenuItem>
              {agents.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
            </Select>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              מטפל: <strong>{ticket.assigned_to|| 'טרם שויך'}</strong>
            </Typography>
          )}
        </Box>


        {userRole === 'admin' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>עדיפות:</Typography>
            <Select
              value={ticket.priority_id || 1}
              onChange={(e) => onPriorityChange(ticket.id, Number(e.target.value))}
              sx={{ 
                minWidth: 130, 
                fontSize: '1rem',
                backgroundColor: ticket.priority_id === 3 ? '#ffebee' : 'transparent' 
              }}
            >
              <MenuItem value={1}>נמוכה</MenuItem>
              <MenuItem value={2}>בינונית</MenuItem>
              <MenuItem value={3}>דחופה</MenuItem>
            </Select>
          </Box>
        )}
      </Box>
    </CardContent>


    <CardActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end', gap: 2 }}>
      {userRole === 'admin' && (
        <Button 
          color="error" 
          size="medium" 
          startIcon={<DeleteIcon />} 
          onClick={() => onDelete(ticket.id)}
          sx={{ fontWeight: 'bold' }}
        >
          מחיקה
        </Button>
      )}
      

      <Button 
        variant="contained" 
        size="large"  
        onClick={() => onViewDetails(ticket.id)}
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '1.1rem',
          padding: '8px 24px',
          borderRadius: 2
        }}
      >
        פרטים מלאים
      </Button>
    </CardActions>
  </Card>
);