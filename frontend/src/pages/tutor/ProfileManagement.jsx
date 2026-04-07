import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Paper,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Rating,
  LinearProgress,
  Badge,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Camera,
  Email,
  Phone,
  School,
  Work,
  Language,
  LinkedIn,
  GitHub,
  Language as WebIcon,
  VideoCall,
  Star,
  AccessTime,
  Security,
  Notifications,
  Settings
} from '@mui/icons-material';
import api from '../../services/api';

const ProfileManagement = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [avatarDialog, setAvatarDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    bio: '',
    profile_image: '',
    profile_data: {
      headline: '',
      experience_years: 0,
      hourly_rate: 0,
      linkedin_url: '',
      github_url: '',
      website_url: '',
      meeting_link: '',
      education: '',
      career_goal: ''
    }
  });

  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: false,
    profile_visibility: 'public',
    auto_confirm_bookings: false
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/profile/');
      
      if (response.data && response.data.data) {
        const data = response.data.data;
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          profile_image: data.profile_image || '',
          profile_data: {
            headline: data.headline || '',
            experience_years: data.experience_years || 0,
            hourly_rate: data.hourly_rate || 0,
            linkedin_url: data.linkedin_url || '',
            github_url: data.github_url || '',
            website_url: data.website_url || '',
            meeting_link: data.meeting_link || '',
            education: data.education || '',
            career_goal: data.career_goal || ''
          }
        });
      }
    } catch (err) {
      console.error('Profile Error:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await api.put('/profile/', formData);
      
      if (response.data.success) {
        setSuccessMessage('Profile updated successfully!');
        setEditMode(false);
        fetchProfile();
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update Error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle avatar upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_image: reader.result });
      };
      reader.readAsDataURL(file);
      setAvatarDialog(false);
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  const isTutor = profile?.role === 'tutor';

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
                👤 Profile Management
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your personal information and professional details
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={editMode ? <Save /> : <Edit />}
              onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
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

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={formData.profile_image}
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: 'primary.main',
                      fontSize: '3rem',
                      mb: 2
                    }}
                  >
                    {formData.first_name?.[0]}{formData.last_name?.[0]}
                  </Avatar>
                  {editMode && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'white',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                      onClick={() => setAvatarDialog(true)}
                    >
                      <Camera />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {formData.first_name} {formData.last_name}
                </Typography>
                
                <Chip
                  label={isTutor ? 'Tutor' : 'Learner'}
                  color={isTutor ? 'primary' : 'secondary'}
                  sx={{ mb: 2 }}
                />
                
                {isTutor && (
                  <Box sx={{ mb: 2 }}>
                    <Rating value={4.5} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      4.5 (127 reviews)
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ textAlign: 'left' }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Email sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">{formData.email}</Typography>
                  </Box>
                  {formData.phone && (
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Phone sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2">{formData.phone}</Typography>
                    </Box>
                  )}
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">
                      Joined {new Date(profile?.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {isTutor && (
              <Card elevation={3} sx={{ mt: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Quick Stats
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Total Sessions
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        156
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Total Earnings
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="green">
                        $3,240
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Response Rate
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        98%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Basic Info" />
                <Tab label={isTutor ? "Professional" : "Academic"} />
                <Tab label="Settings" />
              </Tabs>

              {/* Basic Info Tab */}
              {activeTab === 0 && (
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        disabled={!editMode}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        disabled={!editMode}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={formData.email}
                        disabled
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Email /></InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!editMode}
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!editMode}
                        placeholder="Tell us about yourself..."
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Professional/Academic Tab */}
              {activeTab === 1 && (
                <Box sx={{ p: 3 }}>
                  {isTutor ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Professional Headline"
                          value={formData.profile_data.headline}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, headline: e.target.value } })}
                          disabled={!editMode}
                          placeholder="e.g., Senior Software Engineer & Mentor"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Years of Experience"
                          type="number"
                          value={formData.profile_data.experience_years}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, experience_years: parseInt(e.target.value) } })}
                          disabled={!editMode}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Hourly Rate ($)"
                          type="number"
                          value={formData.profile_data.hourly_rate}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, hourly_rate: parseFloat(e.target.value) } })}
                          disabled={!editMode}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="LinkedIn URL"
                          value={formData.profile_data.linkedin_url}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, linkedin_url: e.target.value } })}
                          disabled={!editMode}
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="GitHub URL"
                          value={formData.profile_data.github_url}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, github_url: e.target.value } })}
                          disabled={!editMode}
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><GitHub /></InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Personal Website"
                          value={formData.profile_data.website_url}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, website_url: e.target.value } })}
                          disabled={!editMode}
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><WebIcon /></InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Video Meeting Link"
                          value={formData.profile_data.meeting_link}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, meeting_link: e.target.value } })}
                          disabled={!editMode}
                          placeholder="e.g., https://meet.jit.si/yourname"
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><VideoCall /></InputAdornment>
                          }}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Education"
                          multiline
                          rows={3}
                          value={formData.profile_data.education}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, education: e.target.value } })}
                          disabled={!editMode}
                          placeholder="e.g., Bachelor's in Computer Science from XYZ University"
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><School /></InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Career Goals"
                          multiline
                          rows={3}
                          value={formData.profile_data.career_goal}
                          onChange={(e) => setFormData({ ...formData, profile_data: { ...formData.profile_data, career_goal: e.target.value } })}
                          disabled={!editMode}
                          placeholder="e.g., Become a senior software engineer and lead a development team"
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><Work /></InputAdornment>
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              )}

              {/* Settings Tab */}
              {activeTab === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Notification Preferences
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Email Notifications"
                        secondary="Receive email updates about bookings and messages"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.email_notifications}
                          onChange={(e) => handleSettingChange('email_notifications', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Push Notifications"
                        secondary="Receive browser notifications for urgent updates"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.push_notifications}
                          onChange={(e) => handleSettingChange('push_notifications', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Privacy Settings
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Profile Visibility"
                        secondary="Control who can see your profile information"
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={settings.profile_visibility}
                          size="small"
                          clickable
                          onClick={() => {
                            const options = ['public', 'private', 'connections'];
                            const currentIndex = options.indexOf(settings.profile_visibility);
                            const nextIndex = (currentIndex + 1) % options.length;
                            handleSettingChange('profile_visibility', options[nextIndex]);
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {isTutor && (
                      <ListItem>
                        <ListItemText
                          primary="Auto-confirm Bookings"
                          secondary="Automatically accept booking requests within your availability"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.auto_confirm_bookings}
                            onChange={(e) => handleSettingChange('auto_confirm_bookings', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Avatar Upload Dialog */}
      <Dialog open={avatarDialog} onClose={() => setAvatarDialog(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarUpload}
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<Camera />}
              >
                Choose Image
              </Button>
            </label>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Recommended: Square image, at least 200x200px
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarDialog(false)}>Cancel</Button>
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

export default ProfileManagement;
