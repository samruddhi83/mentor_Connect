import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Rating,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Tooltip,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  VideoCall,
  Star,
  CheckCircle,
  Cancel,
  Schedule,
  EventAvailable,
  EventBusy,
  Payment,
  Receipt,
  Download,
  Share,
  RateReview,
  History,
  Upcoming,
  ArrowForward,
  PlayArrow,
  Stop,
  Pause,
  Refresh,
  FilterList,
  Search,
  Sort,
  MoreVert,
  Edit,
  Delete,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
  Language,
  AttachMoney,
  Timer,
  Group,
  School,
  Work,
  Assessment,
  Psychology,
  BusinessCenter,
  Code,
  Brush,
  MusicNote,
  FitnessCenter
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
}));


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [rescheduleDialog, setRescheduleDialog] = useState(false);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Mock data - replace with real API call
      setTimeout(() => {
        setBookings([
          {
            id: 1,
            tutor: {
              name: 'Sarah Johnson',
              avatar: '',
              rating: 4.9,
              skills: ['React', 'JavaScript']
            },
            topic: 'Advanced React Patterns',
            date: '2026-04-05',
            time: '14:00',
            duration: 60,
            status: 'confirmed',
            amount: 85,
            payment_status: 'paid',
            meeting_link: 'https://meet.jit.si/mentor-sarah-12345',
            notes: 'Focus on performance optimization',
            created_at: '2026-04-01',
            reminder_sent: true,
            materials: ['React Documentation', 'Sample Projects'],
            progress: 75
          },
          {
            id: 2,
            tutor: {
              name: 'Dr. Emily Chen',
              avatar: '',
              rating: 4.8,
              skills: ['Machine Learning', 'Python']
            },
            topic: 'Introduction to Neural Networks',
            date: '2026-04-06',
            time: '16:00',
            duration: 90,
            status: 'pending',
            amount: 120,
            payment_status: 'pending',
            meeting_link: '',
            notes: 'Beginner friendly session',
            created_at: '2026-04-02',
            reminder_sent: false,
            materials: ['Python Basics', 'Math Foundation'],
            progress: 0
          },
          {
            id: 3,
            tutor: {
              name: 'Michael Rodriguez',
              avatar: '',
              rating: 4.7,
              skills: ['Python', 'Django']
            },
            topic: 'Django Web Development',
            date: '2026-03-28',
            time: '10:00',
            duration: 60,
            status: 'completed',
            amount: 65,
            payment_status: 'paid',
            meeting_link: 'https://meet.jit.si/mentor-michael-67890',
            notes: 'Project-based learning',
            created_at: '2026-03-25',
            reminder_sent: true,
            materials: ['Django Docs', 'Sample Apps'],
            progress: 100,
            rating: 5,
            review: 'Excellent session! Very knowledgeable and patient.'
          },
          {
            id: 4,
            tutor: {
              name: 'Lisa Anderson',
              avatar: '',
              rating: 4.9,
              skills: ['UI/UX Design']
            },
            topic: 'Figma Advanced Techniques',
            date: '2026-03-20',
            time: '15:00',
            duration: 45,
            status: 'cancelled',
            amount: 75,
            payment_status: 'refunded',
            meeting_link: '',
            notes: 'Cancelled by tutor',
            created_at: '2026-03-18',
            reminder_sent: false,
            materials: [],
            progress: 0
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#4caf50',
      completed: '#2196f3',
      cancelled: '#f44336'
    };
    return colors[status] || '#666';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Schedule />,
      confirmed: <CheckCircle />,
      completed: <EventAvailable />,
      cancelled: <Cancel />
    };
    return icons[status] || <Schedule />;
  };

  const getBookingStatus = (status) => {
    const statusMap = {
      pending: { label: 'Pending', color: 'warning' },
      confirmed: { label: 'Confirmed', color: 'success' },
      completed: { label: 'Completed', color: 'info' },
      cancelled: { label: 'Cancelled', color: 'error' }
    };
    return statusMap[status] || { label: status, color: 'default' };
  };

  const filteredBookings = bookings.filter(booking => {
    switch (activeTab) {
      case 0: return true; // All
      case 1: return booking.status === 'pending' || booking.status === 'confirmed'; // Upcoming
      case 2: return booking.status === 'completed'; // Completed
      case 3: return booking.status === 'cancelled'; // Cancelled
      default: return true;
    }
  });

  const handleCancelBooking = () => {
    setSuccessMessage('Booking cancelled successfully');
    setCancelDialog(false);
    fetchBookings();
  };

  const handleJoinSession = (booking) => {
    if (booking.meeting_link) {
      window.open(booking.meeting_link, '_blank');
    }
  };

  const getStatusTimeline = (status) => {
    const steps = {
      pending: ['Booked', 'Pending Confirmation', 'Confirmed', 'Completed'],
      confirmed: ['Booked', 'Confirmed', 'In Progress', 'Completed'],
      completed: ['Booked', 'Confirmed', 'Completed', 'Reviewed'],
      cancelled: ['Booked', 'Cancelled']
    };
    
    const currentStep = {
      pending: 1,
      confirmed: 2,
      completed: 3,
      cancelled: 1
    };
    
    return { steps: steps[status] || [], currentStep: currentStep[status] || 0 };
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading your bookings...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          px: 3,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                📚 My Bookings
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your learning sessions and track progress
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={fetchBookings}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
            >
              Refresh
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Upcoming sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#ff9800">
                  {bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Sessions
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EventAvailable sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#4caf50">
                  {bookings.filter(b => b.status === 'completed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Sessions
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AttachMoney sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#9c27b0">
                  ${bookings.reduce((sum, b) => b.payment_status === 'paid' ? sum + b.amount : sum, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Spent
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Timer sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#2196f3">
                  {bookings.reduce((sum, b) => sum + b.duration, 0)} min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Learning Time
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`All (${bookings.length})`} />
            <Tab label={`Upcoming (${bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length})`} />
            <Tab label={`Completed (${bookings.filter(b => b.status === 'completed').length})`} />
            <Tab label={`Cancelled (${bookings.filter(b => b.status === 'cancelled').length})`} />
          </Tabs>
        </Paper>

        {/* Bookings List */}
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <StyledCard elevation={3}>
                {/* Status Header */}
                <Box
                  sx={{
                    background: `linear-gradient(45deg, ${getStatusColor(booking.status)}, ${getStatusColor(booking.status)}dd)`,
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(booking.status)}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {getBookingStatus(booking.status).label.toUpperCase()}
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <MoreVert />
                  </IconButton>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  {/* Tutor Info */}
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar sx={{ mr: 2, bgcolor: '#667eea' }}>
                      {booking.tutor.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="bold">
                        {booking.tutor.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Rating value={booking.tutor.rating} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {booking.tutor.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Session Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                      SESSION DETAILS
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {booking.time} ({booking.duration} minutes)
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoney sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          ${booking.amount} • {booking.payment_status}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <School sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {booking.topic}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Progress for completed sessions */}
                  {booking.status === 'completed' && booking.progress > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                        Session Progress
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={booking.progress} 
                        sx={{ height: 8, borderRadius: 4 }} 
                      />
                      <Typography variant="caption" color="text.secondary">
                        {booking.progress}% completed
                      </Typography>
                    </Box>
                  )}

                  {/* Booking Journey */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                      BOOKING JOURNEY
                    </Typography>
                    <Stepper activeStep={getStatusTimeline(booking.status).currentStep} orientation="vertical">
                      {getStatusTimeline(booking.status).steps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel>
                            <Typography variant="caption" color="text.secondary">
                              {step}
                            </Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  {/* Review for completed sessions */}
                  {booking.status === 'completed' && booking.rating && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                        YOUR REVIEW
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Rating value={booking.rating} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          "{booking.review}"
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Box display="flex" gap={1}>
                    {booking.status === 'confirmed' && (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<VideoCall />}
                          onClick={() => handleJoinSession(booking)}
                          sx={{ borderRadius: 2 }}
                        >
                          Join Session
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Edit />}
                          sx={{ borderRadius: 2 }}
                        >
                          Reschedule
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Payment />}
                          sx={{ borderRadius: 2 }}
                        >
                          Pay Now
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Cancel />}
                          onClick={() => {
                            setSelectedBooking(booking);
                            setCancelDialog(true);
                          }}
                          sx={{ borderRadius: 2 }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'completed' && !booking.rating && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<RateReview />}
                        onClick={() => {
                          setSelectedBooking(booking);
                          setReviewDialog(true);
                        }}
                        sx={{ borderRadius: 2 }}
                      >
                        Rate & Review
                      </Button>
                    )}
                    
                    {booking.status === 'cancelled' && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Receipt />}
                        sx={{ borderRadius: 2 }}
                      >
                        View Refund
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {filteredBookings.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activeTab === 0 
                ? "You haven't made any bookings yet."
                : `No ${['All', 'Upcoming', 'Completed', 'Cancelled'][activeTab]} bookings found.`
              }
            </Typography>
            <Button variant="contained" href="/learner/search">
              Find Tutors
            </Button>
          </Paper>
        )}
      </Container>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog} onClose={() => setCancelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your booking with {selectedBooking?.tutor.name}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Refund policy: Full refund if cancelled 24 hours before the session.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>Keep Booking</Button>
          <Button variant="contained" color="error" onClick={handleCancelBooking}>
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rate Your Session</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            How was your session with {selectedBooking?.tutor.name}?
          </Typography>
          <Rating
            size="large"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Share your experience (optional)"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>Cancel</Button>
          <Button variant="contained">Submit Review</Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
    </Box>
  );
};

export default MyBookings;
