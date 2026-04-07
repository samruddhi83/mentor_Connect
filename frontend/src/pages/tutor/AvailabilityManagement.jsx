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
  TextField,
  IconButton,
  Fab,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  CalendarToday,
  AccessTime,
  EventAvailable,
  EventBusy,
  MoreVert,
  Schedule,
  FilterList,
  ViewWeek,
  Refresh,
  Upload,
  Download
} from '@mui/icons-material';
import api from '../../services/api';

const AvailabilityManagement = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // week, month, list
  const [filterStatus, setFilterStatus] = useState('all'); // all, available, booked
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null);
  
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  const [bulkData, setBulkData] = useState({
    dates: [],
    startTime: '',
    endTime: '',
    repeatPattern: 'none' // none, daily, weekly
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await api.get('/availability/');
      
      if (response.data && response.data.data) {
        setAvailability(response.data.data);
      } else {
        setAvailability([]);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to load availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAvailability = async () => {
    try {
      const response = await api.post('/availability/', {
        available_date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime
      });

      if (response.data.success) {
        setSuccessMessage('Availability added successfully!');
        setOpenDialog(false);
        setFormData({ date: '', startTime: '', endTime: '' });
        fetchAvailability();
      } else {
        setError(response.data.message || 'Failed to add availability');
      }
    } catch (err) {
      console.error('Add Availability Error:', err);
      setError(err.response?.data?.message || 'Failed to add availability');
    }
  };

  const handleBulkAddAvailability = async () => {
    try {
      const availabilities = bulkData.dates.map(date => ({
        available_date: date,
        start_time: bulkData.startTime,
        end_time: bulkData.endTime
      }));

      const response = await api.post('/availability/bulk', {
        availabilities
      });

      if (response.data.success) {
        setSuccessMessage(`${availabilities.length} availability slots added successfully!`);
        setOpenBulkDialog(false);
        setBulkData({ dates: [], startTime: '', endTime: '', repeatPattern: 'none' });
        fetchAvailability();
      } else {
        setError(response.data.message || 'Failed to add bulk availability');
      }
    } catch (err) {
      console.error('Bulk Add Error:', err);
      setError(err.response?.data?.message || 'Failed to add bulk availability');
    }
  };

  const handleDeleteAvailability = async (id) => {
    try {
      const response = await api.delete(`/availability/${id}`);
      
      if (response.data.success) {
        setSuccessMessage('Availability deleted successfully!');
        fetchAvailability();
      } else {
        setError(response.data.message || 'Failed to delete availability');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      setError(err.response?.data?.message || 'Failed to delete availability');
    }
  };

  const generateRepeatingDates = () => {
    const dates = [];
    const startDate = new Date(selectedDate);
    const patterns = {
      daily: 7,
      weekly: 4
    };

    const days = patterns[bulkData.repeatPattern] || 1;
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }

    setBulkData({ ...bulkData, dates });
  };

  const filteredAvailability = availability.filter(slot => {
    if (filterStatus === 'all') return true;
    return filterStatus === 'available' ? !slot.is_booked : slot.is_booked;
  });

  const getStatusColor = (isBooked) => {
    return isBooked ? 'error' : 'success';
  };

  const getStatusText = (isBooked) => {
    return isBooked ? 'Booked' : 'Available';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading availability...</Typography>
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
                📅 Availability Management
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your teaching schedule and time slots
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => setOpenBulkDialog(true)}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
              >
                Bulk Add
              </Button>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={fetchAvailability}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
              >
                Refresh
              </Button>
            </Box>
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
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EventAvailable sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#4caf50">
                  {availability.filter(s => !s.is_booked).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Slots
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EventBusy sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#f44336">
                  {availability.filter(s => s.is_booked).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Booked Slots
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CalendarToday sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#2196f3">
                  {new Set(availability.map(s => s.available_date)).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Days Available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Schedule sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#ff9800">
                  {availability.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Slots
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters and Actions */}
        <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" gap={2} alignItems="center">
            <FilterList />
            <Chip
              label="All"
              onClick={() => setFilterStatus('all')}
              color={filterStatus === 'all' ? 'primary' : 'default'}
              clickable
            />
            <Chip
              label="Available"
              onClick={() => setFilterStatus('available')}
              color={filterStatus === 'available' ? 'success' : 'default'}
              clickable
            />
            <Chip
              label="Booked"
              onClick={() => setFilterStatus('booked')}
              color={filterStatus === 'booked' ? 'error' : 'default'}
              clickable
            />
          </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Week View">
              <IconButton onClick={() => setViewMode('week')} color={viewMode === 'week' ? 'primary' : 'default'}>
                <ViewWeek />
              </IconButton>
            </Tooltip>
            <Tooltip title="Month View">
              <IconButton onClick={() => setViewMode('month')} color={viewMode === 'month' ? 'primary' : 'default'}>
                <CalendarToday />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        {/* Availability List */}
        <Grid container spacing={3}>
          {filteredAvailability.map((slot) => (
            <Grid item xs={12} sm={6} md={4} key={slot.id}>
              <Card elevation={3} sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
              }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        {new Date(slot.available_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          {slot.start_time} - {slot.end_time}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={getStatusText(slot.is_booked)}
                      color={getStatusColor(slot.is_booked)}
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                    {slot.is_booked && (
                      <Typography variant="caption" color="text.secondary">
                        Booked by student
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredAvailability.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No availability slots found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Start by adding your available time slots
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Availability
            </Button>
          </Paper>
        )}
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => setOpenDialog(true)}
      >
        <Add />
      </Fab>

      {/* Add Availability Dialog */}
      <Dialog open={openDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Availability Slot</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAvailability} variant="contained">
            Add Slot
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Add Dialog */}
      <Dialog open={openBulkDialog} maxWidth="md" fullWidth>
        <DialogTitle>Bulk Add Availability</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={bulkData.dates[0] || ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Repeat Pattern"
                value={bulkData.repeatPattern}
                onChange={(e) => setBulkData({ ...bulkData, repeatPattern: e.target.value })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="none">No Repeat</MenuItem>
                <MenuItem value="daily">Daily (7 days)</MenuItem>
                <MenuItem value="weekly">Weekly (4 weeks)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={bulkData.startTime}
                onChange={(e) => setBulkData({ ...bulkData, startTime: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={bulkData.endTime}
                onChange={(e) => setBulkData({ ...bulkData, endTime: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={generateRepeatingDates} variant="outlined" sx={{ mb: 2 }}>
                Generate Dates
              </Button>
              {bulkData.dates.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Generated Dates ({bulkData.dates.length}):
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {bulkData.dates.map((date, index) => (
                      <Chip key={index} label={date} size="small" />
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBulkDialog(false)}>Cancel</Button>
          <Button onClick={handleBulkAddAvailability} variant="contained">
            Add All Slots
          </Button>
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

export default AvailabilityManagement;
