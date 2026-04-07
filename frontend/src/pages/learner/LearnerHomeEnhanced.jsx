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
  Fab,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Tooltip,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Search,
  CalendarToday,
  AccessTime,
  VideoCall,
  Star,
  TrendingUp,
  School,
  Work,
  LocationOn,
  FilterList,
  ArrowForward,
  PlayArrow,
  Book,
  Person,
  Schedule,
  CheckCircle,
  EventAvailable,
  Subscriptions,
  Payment,
  Assessment,
  Group,
  Speed,
  Timer,
  Language,
  Code,
  BusinessCenter,
  Psychology,
  Biotech,
  MedicalServices,
  Computer,
  Brush,
  MusicNote,
  CameraAlt,
  FitnessCenter,
  Restaurant,
  LocalHospital
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
  },
}));

const GradientCard = styled(Card)(({ theme, gradient }) => ({
  borderRadius: 16,
  background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  },
}));

const LearnerHome = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activePlan: 'None',
    completedSessions: 0,
    totalSpent: 0,
    upcomingSessions: 0,
    favoriteTutors: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchLearnerData();
  }, []);

  const fetchLearnerData = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with real API calls
      setTimeout(() => {
        setStats({
          totalBookings: 12,
          activePlan: 'Premium',
          completedSessions: 8,
          totalSpent: 450,
          upcomingSessions: 3,
          favoriteTutors: 5
        });
        
        setBookings([
          {
            id: 1,
            tutor: { name: 'Sarah Johnson', avatar: '', rating: 4.8 },
            topic: 'React Development',
            date: '2026-04-05',
            time: '14:00',
            status: 'confirmed'
          },
          {
            id: 2,
            tutor: { name: 'Mike Chen', avatar: '', rating: 4.9 },
            topic: 'Python Basics',
            date: '2026-04-06',
            time: '16:00',
            status: 'pending'
          }
        ]);
        
        setTutors([
          {
            id: 1,
            name: 'Sarah Johnson',
            avatar: '',
            rating: 4.8,
            reviews: 127,
            hourly_rate: 75,
            skills: ['React', 'JavaScript', 'Node.js'],
            experience: 5,
            category: 'programming'
          },
          {
            id: 2,
            name: 'Dr. Emily Roberts',
            avatar: '',
            rating: 4.9,
            reviews: 89,
            hourly_rate: 120,
            skills: ['Data Science', 'Machine Learning', 'Python'],
            experience: 8,
            category: 'data-science'
          }
        ]);
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching learner data:', err);
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Grid /> },
    { id: 'programming', name: 'Programming', icon: <Code /> },
    { id: 'data-science', name: 'Data Science', icon: <Assessment /> },
    { id: 'business', name: 'Business', icon: <BusinessCenter /> },
    { id: 'design', name: 'Design', icon: <Brush /> },
    { id: 'music', name: 'Music', icon: <MusicNote /> },
    { id: 'fitness', name: 'Fitness', icon: <FitnessCenter /> },
    { id: 'cooking', name: 'Cooking', icon: <Restaurant /> },
    { id: 'health', name: 'Health', icon: <MedicalServices /> }
  ];

  const getCategoryIcon = (category) => {
    const categoryMap = {
      programming: <Code />,
      'data-science': <Assessment />,
      business: <BusinessCenter />,
      design: <Brush />,
      music: <MusicNote />,
      fitness: <FitnessCenter />,
      cooking: <Restaurant />,
      health: <MedicalServices />
    };
    return categoryMap[category] || <School />;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading your learning journey...</Typography>
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
          py: 8,
          px: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              🚀 Your Learning Journey
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Connect with expert mentors and accelerate your growth
            </Typography>
            
            {/* Search Bar */}
            <Paper
              elevation={8}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.95)',
                maxWidth: 600
              }}
            >
              <Search sx={{ color: '#666', mr: 2 }} />
              <TextField
                fullWidth
                placeholder="Search for tutors, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
              <Button
                variant="contained"
                sx={{ ml: 2, borderRadius: 2, bgcolor: '#667eea' }}
                startIcon={<ArrowForward />}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats Dashboard */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Book sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.totalBookings}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Sessions
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4} gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Subscriptions sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.activePlan}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Active Plan
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4} gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <CheckCircle sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.completedSessions}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Completed
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4} gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Payment sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  ${stats.totalSpent}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Spent
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4} gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <EventAvailable sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.upcomingSessions}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Upcoming
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <GradientCard elevation={4} gradient="linear-gradient(135deg, #30cfd0 0%, #330867 100%)">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Star sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.favoriteTutors}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Favorites
                </Typography>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🎯 Explore Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={category.id}>
                <StyledCard
                  elevation={2}
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedCategory === category.id ? '2px solid #667eea' : 'none',
                    bgcolor: selectedCategory === category.id ? '#f3f4f6' : 'white'
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Box sx={{ color: selectedCategory === category.id ? '#667eea' : '#666', mb: 1 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="body2" fontWeight="500">
                      {category.name}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Sessions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📅 Upcoming Sessions
          </Typography>
          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid item xs={12} md={6} key={booking.id}>
                <StyledCard elevation={3}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
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
                      <Chip
                        label={booking.status}
                        color={booking.status === 'confirmed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {booking.time}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Topic: {booking.topic}
                    </Typography>
                    
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VideoCall />}
                        sx={{ borderRadius: 2 }}
                      >
                        Join Session
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        Reschedule
                      </Button>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recommended Tutors */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ⭐ Recommended Tutors
          </Typography>
          <Grid container spacing={3}>
            {tutors.map((tutor) => (
              <Grid item xs={12} sm={6} md={4} key={tutor.id}>
                <StyledCard elevation={3}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ mr: 2, width: 56, height: 56, bgcolor: '#667eea' }}>
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {tutor.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Rating value={tutor.rating} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            {tutor.rating} ({tutor.reviews} reviews)
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          ${tutor.hourly_rate}/hour
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      {getCategoryIcon(tutor.category)}
                      <Typography variant="body2" color="text.secondary">
                        {tutor.experience} years experience
                      </Typography>
                    </Box>
                    
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                      {tutor.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: '#e3f2fd',
                            color: '#1976d2',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                    
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CalendarToday />}
                        sx={{ borderRadius: 2 }}
                      >
                        Book Session
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Star />}
                        sx={{ borderRadius: 2 }}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Learning Progress */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📈 Your Learning Progress
          </Typography>
          <StyledCard elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                This Month's Activity
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Sessions Completed</Typography>
                  <Typography variant="body2" fontWeight="bold">8/10</Typography>
                </Box>
                <LinearProgress variant="determinate" value={80} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Skills Learned</Typography>
                  <Typography variant="body2" fontWeight="bold">5 new skills</Typography>
                </Box>
                <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4, bgcolor: '#e3f2fd' }} />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Study Streak</Typography>
                  <Typography variant="body2" fontWeight="bold">12 days</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4, bgcolor: '#fff3e0' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="search"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#667eea',
          '&:hover': { bgcolor: '#5a67d8' }
        }}
      >
        <Search />
      </Fab>

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

export default LearnerHome;
