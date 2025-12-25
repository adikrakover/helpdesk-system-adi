import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './TicketDetails.css';

// הגדרת המבנה לפי הנתונים האמיתיים מה-Console
interface Comment {
  id: number;
  ticket_id: number;
  author_id: number; // השדה שראינו ב-Console
  content: string;   // השדה שמופיע ב-Swagger
  user_name: string;
  user_role: string;
  created_at: string;
}

interface TicketExtended {
  id: number;
  subject: string;
  description: string;
  status_name: string;
  assigned_to_name?: string;
  comments: Comment[];
}

export function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, user } = useAuth(); // שימוש ב-user כדי לזהות מי כותב התגובה
  
  const [ticket, setTicket] = useState<TicketExtended | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTicketDetails = async () => {
    if (!token || !id) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`http://localhost:4000/tickets/${id}`, { headers });
      setTicket(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('טעינת הנתונים נכשלה');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [id, token]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;

    try {
      await axios.post(
        `http://localhost:4000/tickets/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchTicketDetails();
    } catch (error) {
      alert('שליחת התגובה נכשלה');
    }
  };

  if (loading) return <div className="loading">טוען נתונים...</div>;
  if (!ticket) return <div className="error">פנייה לא נמצאה</div>;

  return (
    <div className="details-container">
      <button onClick={() => navigate('/')} className="btn-back">⬅ חזרה</button>

      <div className="ticket-card">
        <div className="ticket-header">
          <h2>{ticket.subject} <span className="ticket-id">#{ticket.id}</span></h2>
        </div>
        <div className="ticket-meta">
          <span><strong>סטטוס:</strong> {ticket.status_name}</span> | 
          <span><strong>מטפל:</strong> {ticket.assigned_to_name || 'טרם שויך'}</span>
        </div>
        <div className="ticket-description">
          <strong>תיאור:</strong>
          <p>{ticket.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h3>💬 שיחה עדכנית</h3>
        <div className="comments-list">
          {ticket.comments?.map((c) => {
            // זיהוי האם התגובה היא של המשתמש הנוכחי
            const isMe = c.author_id === Number(user?.id);
            return (
              <div key={c.id} className={`comment-wrapper ${isMe ? 'my-msg' : 'others-msg'}`}>
                <div className="comment-bubble">
                  <div className="comment-author">{c.user_name}</div>
                  <p>{c.content}</p>
                  <div className="comment-date">
                    {new Date(c.created_at).toLocaleString('he-IL')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleAddComment} className="comment-form">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="הוספת תגובה..."
            required
          />
          <button type="submit" className="btn-submit">שלח</button>
        </form>
      </div>
    </div>
  );
}