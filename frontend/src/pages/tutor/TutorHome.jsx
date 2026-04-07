import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Typography, Grid, Card, CardContent, Box, CircularProgress,
  Button, Chip, Avatar, Rating, Divider, Tabs, Tab,
  List, ListItem, ListItemText, ListItemAvatar,
  IconButton, Badge, Paper, Fab, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem,
  Accordion, AccordionSummary, AccordionDetails, LinearProgress, Alert
} from '@mui/material';
import {
  CalendarToday, AccessTime, AttachMoney, Star,
  People, VideoCall, CheckCircle, Cancel, Schedule,
  ExpandMore, Add, Edit, Delete, Notifications,
  TrendingUp, Person, Email, Phone
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(26, 35, 126, 0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(26, 35, 126, 0.15)',
    border: '1px solid rgba(26, 35, 126, 0.2)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 0%, #3949ab 100%)',
  color: 'white',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(26, 35, 126, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #283593 0%, #5c6bc0 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(26, 35, 126, 0.4)',
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#1a237e',
  color: '#1a237e',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#283593',
    color: '#283593',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(26, 35, 126, 0.2)',
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  ...(status === 'pending' && {
    backgroundColor: '#fff3cd',
    color: '#856404',
  }),
  ...(status === 'accepted' && {
    backgroundColor: '#d4edda',
    color: '#155724',
  }),
  ...(status === 'completed' && {
    backgroundColor: '#cce5ff',
    color: '#004085',
  }),
}));

function TutorHome() {
  const [stats, setStats] = useState({
    earnings: 0,
    pendingRequests: 0,
    completedSessions: 0,
    totalStudents: 0,
    upcomingSessions: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openAvailability, setOpenAvailability] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    fetchTutorData();
  }, []);

  const fetchTutorData = async () => {
    try {
      // Fetch appointments
      const appointmentsResponse = await api.get('/appointments');
      const appointmentsData = appointmentsResponse.data.data || [];
      setAppointments(appointmentsData);

      // Fetch availability
      const availabilityResponse = await api.get('/availability/');
      const availabilityData = availabilityResponse.data.data || [];
      setAvailability(availabilityData);

      // Calculate stats from real data
      const pendingCount = appointmentsData.filter(apt => apt.status === 'pending').length;
      const completedCount = appointmentsData.filter(apt => apt.status === 'completed').length;
      const upcomingCount = appointmentsData.filter(apt => apt.status === 'accepted').length;
      
      // Get unique learners
      const uniqueLearners = new Set(appointmentsData.map(apt => apt.learner_id).filter(Boolean));
      
      setStats({
        earnings: 0, // Will be calculated from payment data later
        pendingRequests: pendingCount,
        completedSessions: completedCount,
        totalStudents: uniqueLearners.size,
        upcomingSessions: upcomingCount
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutor data:', error);
      // Set default values on error
      setStats({
        earnings: 0,
        pendingRequests: 0,
        completedSessions: 0,
        totalStudents: 0,
        upcomingSessions: 0
      });
      setAppointments([]);
      setAvailability([]);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddAvailability = async () => {
    try {
      const response = await api.post('/availability/', {
        available_date: newAvailability.date,
        start_time: newAvailability.startTime,
        end_time: newAvailability.endTime
      });
      
      if (response.data.success) {
        setOpenAvailability(false);
        setNewAvailability({ date: '', startTime: '', endTime: '' });
        fetchTutorData(); // Refresh data
      }
    } catch (error) {
      console.error('Error adding availability:', error);
    }
  };

  const handleAppointmentAction = async (appointmentId, action) => {
    try {
      const response = await api.put(`/appointments/status/${appointmentId}`, {
        status: action
      });
      
      if (response.data.success) {
        fetchTutorData(); // Refresh data to get updated status
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress size={60} />
    </Box>
  );

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ 
            background: 'linear-gradient(45deg, #1a237e 0%, #3949ab 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Tutor Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your sessions and track your performance
          </Typography>
        </Box>
        <GradientButton onClick={() => setOpenAvailability(true)} startIcon={<Add />}>
          Add Availability
        </GradientButton>
      </Box>

      {/* Stats Cards - Professional Style */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StyledCard elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <AttachMoney sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
                Total Earnings
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#1a237e' }}>
                ${stats.earnings}
              </Typography>
              <TrendingUp sx={{ fontSize: 16, color: '#3949ab', mt: 0.5 }} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StyledCard elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Schedule sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
                Pending Requests
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#ff6b35' }}>
                {stats.pendingRequests}
              </Typography>
              <Badge badgeContent={stats.pendingRequests} color="error" sx={{ mt: 1 }} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StyledCard elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <CheckCircle sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
                Completed Sessions
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#28a745' }}>
                {stats.completedSessions}
              </Typography>
              <LinearProgress variant="determinate" value={75} sx={{ mt: 1, '& .MuiLinearProgress-bar': { backgroundColor: '#28a745' } }} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StyledCard elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6f42c1 0%, #9c27b0 100%)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <People sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
                Total Students
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#6f42c1' }}>
                {stats.totalStudents}
              </Typography>
              <Person sx={{ fontSize: 16, color: '#9c27b0', mt: 0.5 }} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <StyledCard elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <CalendarToday sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
                Upcoming Sessions
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#dc3545' }}>
                {stats.upcomingSessions}
              </Typography>
              <AccessTime sx={{ fontSize: 16, color: '#fd7e14', mt: 0.5 }} />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Paper sx={{ 
        mb: 3, 
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(26, 35, 126, 0.1)',
        borderRadius: 2
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'rgba(26, 35, 126, 0.1)',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              color: '#666',
              '&.Mui-selected': {
                color: '#1a237e',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1a237e',
              height: 3,
            }
          }}
        >
          <Tab label="Bookings" icon={<Schedule />} />
          <Tab label="Availability" icon={<CalendarToday />} />
          <Tab label="Earnings" icon={<AttachMoney />} />
          <Tab label="Students" icon={<People />} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Recent Bookings
            </Typography>
            <List>
              {appointments.map((appointment, index) => (
                <StyledCard key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {appointment.learner?.firstName?.[0] || appointment.learner?.email?.[0]?.toUpperCase() || 'L'}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {appointment.learner?.firstName && appointment.learner?.lastName 
                              ? `${appointment.learner.firstName} ${appointment.learner.lastName}`
                              : appointment.learner?.email || 'Unknown Learner'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.topic || 'No topic specified'} • {appointment.appointment_date || appointment.appointmentDate} at {appointment.appointment_time || appointment.appointmentTime}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Duration: {appointment.duration} minutes
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StatusChip 
                          label={appointment.status} 
                          status={appointment.status}
                          size="small"
                        />
                        {appointment.status === 'pending' && (
                          <>
                            <IconButton 
                              color="success" 
                              onClick={() => handleAppointmentAction(appointment.id, 'accepted')}
                            >
                              <CheckCircle />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              onClick={() => handleAppointmentAction(appointment.id, 'rejected')}
                            >
                              <Cancel />
                            </IconButton>
                          </>
                        )}
                        {appointment.status === 'accepted' && (
                          <IconButton color="primary" href={appointment.meetingLink}>
                            <VideoCall />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <StyledCard>
              <CardContent>
                <GradientButton fullWidth sx={{ mb: 2 }} startIcon={<CalendarToday />}>
                  Set Availability
                </GradientButton>
                <OutlinedButton fullWidth sx={{ mb: 2 }} startIcon={<VideoCall />}>
                  Start Session
                </OutlinedButton>
                <OutlinedButton fullWidth sx={{ mb: 2 }} startIcon={<AttachMoney />}>
                  View Earnings
                </OutlinedButton>
                <OutlinedButton fullWidth startIcon={<Person />}>
                  Edit Profile
                </OutlinedButton>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Your Availability
            </Typography>
            <Grid container spacing={2}>
              {availability.map((slot, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {slot.available_date || slot.availableDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {slot.start_time || slot.startTime} - {slot.end_time || slot.endTime}
                      </Typography>
                      <StatusChip 
                        label={slot.is_booked || slot.isBooked ? 'Booked' : 'Available'} 
                        status={(slot.is_booked || slot.isBooked) ? 'completed' : 'pending'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Earnings Overview
            </Typography>
            <StyledCard>
              <CardContent>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ${stats.earnings}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Total earnings this month
                </Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mt: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  75% of monthly target achieved
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Your Students
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Student management features coming soon...
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* Add Availability Dialog */}
      <Dialog open={openAvailability} onClose={() => setOpenAvailability(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Availability</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={newAvailability.date}
            onChange={(e) => setNewAvailability({...newAvailability, date: e.target.value})}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            value={newAvailability.startTime}
            onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="End Time"
            type="time"
            value={newAvailability.endTime}
            onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <OutlinedButton onClick={() => setOpenAvailability(false)}>Cancel</OutlinedButton>
          <GradientButton onClick={handleAddAvailability}>Add</GradientButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TutorHome;
