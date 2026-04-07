import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Box,
  Avatar,
  Rating,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  VideoCall,
  Star,
  LocationOn,
  Language,
  School,
  Work,
  Close,
  CheckCircle,
  ArrowForward
} from '@mui/icons-material';
import axios from '../services/api';

const SlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [bookingData, setBookingData] = useState({
    topic: '',
    notes: ''
  });

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await api.get('/slots');
      
      if (response.data && response.data.data) {
        // Transform the API response to match the expected format
        const transformedSlots = response.data.data.map(slot => ({
          id: slot.tutorInfo.id,
          tutor: {
            id: slot.tutorInfo.id,
            name: slot.tutorInfo.name,
            avatar: slot.tutorInfo.avatar || '',
            rating: slot.tutorInfo.rating || 4.5,
            skills: slot.tutorInfo.skills || [],
            hourly_rate: slot.tutorInfo.hourlyRate || 50
          },
          date: slot.date,
          time_slots: slot.timeSlots
        }));
        
        setSlots(transformedSlots);
      } else {
        setSlots([]);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to load available slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlot = (tutorId, slot, tutor) => {
    setSelectedSlot({ tutorId, slot, tutor });
    setBookingDialog(true);
  };

  const confirmBooking = async () => {
    try {
      if (!selectedSlot) return;
      
      // Make actual API call to book appointment
      const bookingRequest = {
        tutor_id: selectedSlot.tutor.id,
        topic: bookingData.topic,
        appointment_date: selectedSlot.slot.date,
        appointment_time: selectedSlot.slot.time,
        duration: selectedSlot.slot.duration
      };

      const response = await api.post('/appointments', bookingRequest);
      
      if (response.data.success) {
        setSuccessMessage('Session booked successfully! Check your email for confirmation.');
        setBookingDialog(false);
        setSelectedSlot(null);
        setBookingData({ topic: '', notes: '' });

        // Refresh slots to update availability
        fetchAvailableSlots();
      } else {
        setError(response.data.message || 'Failed to book slot');
      }
    } catch (err) {
      console.error('Booking Error:', err);
      setError(err.response?.data?.message || 'Failed to book slot. Please try again.');
    }
  };

  const joinVideoCall = (tutorId, slot) => {
    // Simulate joining video call
    const meetingLink = `https://meet.jit.si/MentorConnect-${tutorId}-${Date.now()}`;
    window.open(meetingLink, '_blank');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          px: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            🎓 Book Expert Mentor Sessions
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Connect with world-class mentors for personalized learning
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip 
              icon={<VideoCall />} 
              label="Video Sessions" 
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
            />
            <Chip 
              icon={<AccessTime />} 
              label="15 & 30 min slots" 
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
            />
            <Chip 
              icon={<Star />} 
              label="Expert Tutors" 
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
            />
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {slots.map((slotData) => (
            <Grid item xs={12} sm={6} lg={4} key={slotData.id}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8
                  },
                  bgcolor: 'white'
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    color: 'white',
                    p: 3,
                    position: 'relative'
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {slotData.tutor.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box flexGrow={1} ml={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {slotData.tutor.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Rating value={slotData.tutor.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2">
                          {slotData.tutor.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                        </Typography>
                      </Box>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h4" fontWeight="bold" color="white">
                        ${slotData.tutor.hourly_rate}
                      </Typography>
                      <Typography variant="caption" opacity={0.9}>
                        per hour
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  {/* Skills */}
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1} color="text.secondary">
                      EXPERTISE
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {slotData.tutor.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: '#e3f2fd',
                            color: '#1976d2',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Date Info */}
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1} color="text.secondary">
                      AVAILABLE ON
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarToday sx={{ fontSize: 20, color: '#667eea' }} />
                      <Typography variant="body1" fontWeight="500">
                        {new Date(slotData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Time Slots */}
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={2} color="text.secondary">
                      BOOK YOUR SLOT
                    </Typography>
                    <Grid container spacing={1.5}>
                      {slotData.time_slots.map((timeSlot, index) => (
                        <Grid item xs={6} key={index}>
                          <Button
                            fullWidth
                            variant={timeSlot.available ? "contained" : "outlined"}
                            disabled={!timeSlot.available}
                            onClick={() => timeSlot.available && handleBookSlot(slotData.tutor.id, timeSlot, slotData.tutor)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: 'bold',
                              textTransform: 'none',
                              bgcolor: timeSlot.available ? '#667eea' : 'transparent',
                              color: timeSlot.available ? 'white' : '#ccc',
                              border: timeSlot.available ? 'none' : '2px dashed #ccc',
                              '&:hover': {
                                bgcolor: timeSlot.available ? '#5a67d8' : 'transparent',
                                transform: timeSlot.available ? 'scale(1.05)' : 'none'
                              }
                            }}
                          >
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {timeSlot.time}
                              </Typography>
                              <Typography variant="caption">
                                {timeSlot.duration} min
                              </Typography>
                            </Box>
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  <Box display="flex" gap={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<VideoCall />}
                      onClick={() => joinVideoCall(slotData.tutor.id, slotData.time_slots[0])}
                      sx={{ borderRadius: 2 }}
                    >
                      Join Call
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {slots.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No available slots at the moment.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please check back later for more availability.
            </Typography>
          </Box>
        )}
      </Container>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#667eea', color: 'white' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold">
              Book Your Session
            </Typography>
            <IconButton onClick={() => setBookingDialog(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedSlot && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedSlot.tutor.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Chip 
                  icon={<CalendarToday />} 
                  label={new Date(selectedSlot.slot.date).toLocaleDateString()} 
                  size="small" 
                />
                <Chip 
                  icon={<AccessTime />} 
                  label={`${selectedSlot.slot.time} (${selectedSlot.slot.duration} min)`} 
                  size="small" 
                />
                <Chip 
                  label={`$${selectedSlot.tutor.hourly_rate}/hr`} 
                  size="small" 
                  color="primary"
                />
              </Box>
              
              <TextField
                fullWidth
                label="What would you like to discuss?"
                multiline
                rows={3}
                value={bookingData.topic}
                onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Additional Notes (Optional)"
                multiline
                rows={2}
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setBookingDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmBooking}
            disabled={!bookingData.topic}
            sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#5a67d8' } }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
        sx={{
          '& .MuiSnackbar-root': {
            bgcolor: '#4caf50'
          }
        }}
      />
    </Box>
  );
};

export default SlotsPage;
