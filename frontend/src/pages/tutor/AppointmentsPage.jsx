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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Rating,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Alert,
  Snackbar,
  Fab,
  TextField,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  VideoCall,
  CheckCircle,
  Cancel,
  Schedule,
  MoreVert,
  Star,
  Person,
  FilterList,
  Search,
  Refresh,
  Add,
  EventAvailable,
  EventBusy,
  TrendingUp,
  AttachMoney,
  People,
  ArrowForward
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
  ...(status === 'rejected' && {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  }),
}));

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleDialog, setRescheduleDialog] = useState(false);
  const [notesDialog, setNotesDialog] = useState(false);
  const [meetingNotes, setMeetingNotes] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments');
      
      if (response.data && response.data.data) {
        setAppointments(response.data.data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error('Appointments Error:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await api.put(`/appointments/status/${appointmentId}`, {
        status: newStatus
      });
      
      if (response.data.success) {
        setSuccessMessage(`Appointment ${newStatus} successfully!`);
        fetchAppointments();
      } else {
        setError(response.data.message || 'Failed to update appointment');
      }
    } catch (err) {
      console.error('Status Update Error:', err);
      setError(err.response?.data?.message || 'Failed to update appointment');
    }
  };

  const handleJoinMeeting = (appointment) => {
    const meetingLink = appointment.meeting_link || `https://meet.jit.si/MentorConnect-${appointment.id}-${Date.now()}`;
    window.open(meetingLink, '_blank');
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      appointment.learner?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.learner?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.topic?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      accepted: '#4caf50',
      completed: '#2196f3',
      rejected: '#f44336'
    };
    return colors[status] || '#666';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Schedule />,
      accepted: <CheckCircle />,
      completed: <EventAvailable />,
      rejected: <Cancel />
    };
    return icons[status] || <Schedule />;
  };

  const getTabCount = (status) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading appointments...</Typography>
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
                📅 Appointments Management
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your tutoring sessions and bookings
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={fetchAppointments}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
            >
              Refresh
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Schedule sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#ff9800">
                  {getTabCount('pending')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Requests
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <CheckCircle sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#4caf50">
                  {getTabCount('accepted')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confirmed Sessions
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <EventAvailable sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#2196f3">
                  {getTabCount('completed')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Sessions
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <AttachMoney sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#9c27b0">
                  $1,250
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Earnings
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Filters and Search */}
        <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" gap={2} alignItems="center" flex={1}>
            <TextField
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: '#666' }} />
              }}
              sx={{ minWidth: 300 }}
            />
            <Chip
              label="All"
              onClick={() => setFilterStatus('all')}
              color={filterStatus === 'all' ? 'primary' : 'default'}
              clickable
            />
            <Chip
              label="Pending"
              onClick={() => setFilterStatus('pending')}
              color={filterStatus === 'pending' ? 'warning' : 'default'}
              clickable
            />
            <Chip
              label="Accepted"
              onClick={() => setFilterStatus('accepted')}
              color={filterStatus === 'accepted' ? 'success' : 'default'}
              clickable
            />
            <Chip
              label="Completed"
              onClick={() => setFilterStatus('completed')}
              color={filterStatus === 'completed' ? 'info' : 'default'}
              clickable
            />
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label={`All (${appointments.length})`} />
            <Tab label={`Pending (${getTabCount('pending')})`} />
            <Tab label={`Accepted (${getTabCount('accepted')})`} />
            <Tab label={`Completed (${getTabCount('completed')})`} />
          </Tabs>
        </Paper>

        {/* Appointments List */}
        <Grid container spacing={3}>
          {filteredAppointments.map((appointment) => (
            <Grid item xs={12} md={6} lg={4} key={appointment.id}>
              <StyledCard elevation={3}>
                {/* Header with Status */}
                <Box
                  sx={{
                    background: `linear-gradient(45deg, ${getStatusColor(appointment.status)}, ${getStatusColor(appointment.status)}dd)`,
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(appointment.status)}
                    <StatusChip
                      label={appointment.status.toUpperCase()}
                      status={appointment.status}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                  </Box>
                  <IconButton size="small" sx={{ color: 'white' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  {/* Learner Info */}
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: 'primary.main',
                        mr: 2
                      }}
                    >
                      {appointment.learner?.first_name?.[0]}{appointment.learner?.last_name?.[0]}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="bold">
                        {appointment.learner?.first_name} {appointment.learner?.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.learner?.email}
                      </Typography>
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
                          {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {appointment.appointment_time} ({appointment.duration} minutes)
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Star sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {appointment.topic}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box display="flex" gap={1}>
                    {appointment.status === 'pending' && (
                      <>
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleStatusUpdate(appointment.id, 'accepted')}
                          sx={{ borderRadius: 2 }}
                        >
                          Accept
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                          sx={{ borderRadius: 2 }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {appointment.status === 'accepted' && (
                      <>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          startIcon={<VideoCall />}
                          onClick={() => handleJoinMeeting(appointment)}
                          sx={{ borderRadius: 2 }}
                        >
                          Join Call
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<CheckCircle />}
                          onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                          sx={{ borderRadius: 2 }}
                        >
                          Complete
                        </Button>
                      </>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Star />}
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setNotesDialog(true);
                        }}
                        sx={{ borderRadius: 2 }}
                      >
                        Add Review
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {filteredAppointments.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filterStatus === 'all' 
                ? "You don't have any appointments yet."
                : `No ${filterStatus} appointments found.`
              }
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          Reschedule
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          Cancel
        </MenuItem>
      </Menu>

      {/* Notes Dialog */}
      <Dialog open={notesDialog} onClose={() => setNotesDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Session Notes</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Add notes about this session"
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesDialog(false)}>Cancel</Button>
          <Button variant="contained">Save Notes</Button>
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

export default AppointmentsPage;
