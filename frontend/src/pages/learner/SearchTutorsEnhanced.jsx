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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Switch,
  FormControlLabel,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search,
  FilterList,
  CalendarToday,
  AccessTime,
  VideoCall,
  Star,
  TrendingUp,
  School,
  Work,
  LocationOn,
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
  LocalHospital,
  ExpandMore,
  Sort,
  Favorite,
  FavoriteBorder,
  CompareArrows,
  Verified,
  AccessTimeFilled,
  AttachMoney,
  LanguageOutlined,
  Public,
  WorkspacePremium,
  MilitaryTech,
  EmojiEvents,
  Apps
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.04)',
  background: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid rgba(0,0,0,0.08)',
  },
}));

const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  border: '1px solid rgba(26, 35, 123, 0.15)',
  position: 'relative',
  background: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(26, 35, 123, 0.12)',
    border: '1px solid rgba(26, 35, 123, 0.25)',
  },
  '&::before': {
    content: '"PREMIUM"',
    position: 'absolute',
    top: 6,
    right: -20,
    background: 'linear-gradient(45deg, #1a237e 0%, #3949ab 100%)',
    color: 'white',
    padding: '2px 20px',
    fontSize: '8px',
    fontWeight: 'bold',
    transform: 'rotate(45deg)',
    zIndex: 1,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: '#1a237e',
  color: 'white',
  padding: '8px 20px',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: 4,
  textTransform: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#283593',
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#1a237e',
  color: '#1a237e',
  padding: '8px 20px',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: 4,
  textTransform: 'none',
  borderWidth: 1,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#283593',
    color: '#283593',
    background: 'rgba(26, 35, 126, 0.04)',
  },
}));

const SearchTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      // Mock data - replace with real API call
      setTimeout(() => {
        setTutors([
          {
            id: 1,
            name: 'Sarah Johnson',
            avatar: '',
            rating: 4.9,
            reviews: 234,
            hourly_rate: 3500,
            skills: ['React', 'JavaScript', 'Node.js', 'TypeScript'],
            experience: 6,
            category: 'programming',
            languages: ['English', 'Spanish'],
            students: 156,
            completed_sessions: 892,
            response_rate: 98,
            is_premium: true,
            is_verified: true,
            badges: ['Top Rated', 'Quick Responder'],
            availability: ['Weekdays', 'Weekends'],
            education: 'M.S. Computer Science, Stanford',
            bio: 'Passionate about teaching modern web development with 6+ years of industry experience.'
          },
          {
            id: 2,
            name: 'Dr. Emily Chen',
            avatar: '',
            rating: 4.8,
            reviews: 189,
            hourly_rate: 4500,
            skills: ['Machine Learning', 'Python', 'Data Science', 'TensorFlow'],
            experience: 8,
            category: 'data-science',
            languages: ['English', 'Mandarin'],
            students: 98,
            completed_sessions: 567,
            response_rate: 95,
            is_premium: true,
            is_verified: true,
            badges: ['Expert', 'Research Background'],
            availability: ['Weekdays'],
            education: 'Ph.D. Data Science, MIT',
            bio: 'AI researcher with extensive experience in machine learning and deep learning applications.'
          },
          {
            id: 3,
            name: 'Michael Rodriguez',
            avatar: '',
            rating: 4.7,
            reviews: 145,
            hourly_rate: 2500,
            skills: ['Python', 'Django', 'Flask', 'PostgreSQL'],
            experience: 5,
            category: 'programming',
            languages: ['English', 'Portuguese'],
            students: 78,
            completed_sessions: 423,
            response_rate: 92,
            is_premium: false,
            is_verified: true,
            badges: ['Rising Star'],
            availability: ['Evenings', 'Weekends'],
            education: 'B.S. Software Engineering, UC Berkeley',
            bio: 'Full-stack developer specializing in Python web technologies and database design.'
          },
          {
            id: 4,
            name: 'Lisa Anderson',
            avatar: '',
            rating: 4.9,
            reviews: 312,
            hourly_rate: 3000,
            skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
            experience: 7,
            category: 'design',
            languages: ['English', 'French'],
            students: 203,
            completed_sessions: 1024,
            response_rate: 99,
            is_premium: true,
            is_verified: true,
            badges: ['Top Rated', 'Design Expert'],
            availability: ['Flexible'],
            education: 'B.F.A. Graphic Design, RISD',
            bio: 'Award-winning designer helping students create beautiful and functional user experiences.'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching tutors:', err);
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Apps /> },
    { id: 'programming', name: 'Programming', icon: <Code /> },
    { id: 'data-science', name: 'Data Science', icon: <Assessment /> },
    { id: 'business', name: 'Business', icon: <BusinessCenter /> },
    { id: 'design', name: 'Design', icon: <Brush /> },
    { id: 'music', name: 'Music', icon: <MusicNote /> },
    { id: 'fitness', name: 'Fitness', icon: <FitnessCenter /> },
    { id: 'cooking', name: 'Cooking', icon: <Restaurant /> },
    { id: 'health', name: 'Health', icon: <MedicalServices /> }
  ];

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tutor.category === selectedCategory;
    const matchesPrice = tutor.hourly_rate >= priceRange[0] && tutor.hourly_rate <= priceRange[1];
    const matchesRating = tutor.rating >= ratingFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.hourly_rate - b.hourly_rate;
      case 'price_high':
        return b.hourly_rate - a.hourly_rate;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const toggleFavorite = (tutorId) => {
    setFavorites(prev => 
      prev.includes(tutorId) 
        ? prev.filter(id => id !== tutorId)
        : [...prev, tutorId]
    );
  };

  const handleBookSession = (tutor) => {
    setSelectedTutor(tutor);
    setBookingDialog(true);
  };

  const confirmBooking = () => {
    setSuccessMessage('Session booked successfully!');
    setBookingDialog(false);
    setSelectedTutor(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Finding the perfect tutors for you...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          color: 'white',
          py: 8,
          px: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              🎓 Find Your Perfect Mentor
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Connect with 1000+ expert tutors across 50+ subjects
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
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              <Search sx={{ color: '#666', mr: 2 }} />
              <TextField
                fullWidth
                placeholder="Search by tutor name, skill, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
              <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ ml: 2 }}>
                <FilterList />
              </IconButton>
              <Button
                variant="contained"
                sx={{ ml: 2, borderRadius: 2, bgcolor: '#667eea' }}
                startIcon={<Search />}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4, width: '100%' }}>
        {/* Filters */}
        {showFilters && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Advanced Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="price_low">Lowest Price</MenuItem>
                    <MenuItem value="price_high">Highest Price</MenuItem>
                    <MenuItem value="experience">Most Experience</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography gutterBottom>Min Rating: {ratingFilter}⭐</Typography>
                <Slider
                  value={ratingFilter}
                  onChange={(e, newValue) => setRatingFilter(newValue)}
                  min={0}
                  max={5}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography gutterBottom>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  min={500}
                  max={5000}
                  step={100}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value}`}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Results Count */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">
            {filteredTutors.length} tutors found
          </Typography>
          <Box display="flex" gap={2}>
            <Chip label="Verified Only" size="small" clickable />
            <Chip label="Available Now" size="small" clickable />
            <Chip label="Premium" size="small" clickable />
          </Box>
        </Box>

        {/* Tutor Cards */}
        <Grid container spacing={2}>
          {filteredTutors.map((tutor) => (
            <Grid item xs={12} key={tutor.id}>
              {tutor.is_premium ? (
                <PremiumCard elevation={4}>
                  <CardContent sx={{ p: 2 }}>
                    {/* RedBus-style Table Layout */}
                    <Box>
                      {/* Header Row */}
                      <Box display="flex" alignItems="center" mb={2} pb={2} borderBottom="1px solid rgba(0,0,0,0.06)">
                        {/* Avatar and Name */}
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 280 }}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              tutor.is_verified ? (
                                <Verified sx={{ fontSize: 16, color: '#4caf50' }} />
                              ) : null
                            }
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: '#3949ab',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {tutor.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                          </Badge>
                          <Box ml={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="subtitle1" fontWeight="600" sx={{ fontSize: '0.95rem' }}>
                                {tutor.name}
                              </Typography>
                              {tutor.is_premium && (
                                <WorkspacePremium sx={{ fontSize: 16, color: '#ffd700' }} />
                              )}
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Rating value={tutor.rating} precision={0.1} size="small" readOnly />
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {tutor.rating} ({tutor.reviews})
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        {/* Skills */}
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 300, flexWrap: 'wrap' }}>
                          {tutor.skills.slice(0, 3).map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: '#f3f4f6',
                                color: '#374151',
                                fontSize: '0.75rem',
                                height: 24,
                                mr: 0.5
                              }}
                            />
                          ))}
                          {tutor.skills.length > 3 && (
                            <Chip
                              label={`+${tutor.skills.length - 3} more`}
                              size="small"
                              sx={{
                                bgcolor: '#e5e7eb',
                                color: '#374151',
                                fontSize: '0.75rem',
                                height: 24
                              }}
                            />
                          )}
                        </Box>
                        
                        {/* Price and Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 200 }}>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold', fontSize: '1.1rem' }}>
                              ₹{tutor.hourly_rate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              per hour
                            </Typography>
                          </Box>
                          <Box display="flex" gap={1}>
                            <GradientButton
                              size="small"
                              onClick={() => handleBookSession(tutor)}
                            >
                              Book
                            </GradientButton>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleFavorite(tutor.id)}
                              sx={{ ml: 1 }}
                            >
                              {favorites.includes(tutor.id) ? (
                                <Favorite sx={{ fontSize: 18, color: '#e91e63' }} />
                              ) : (
                                <FavoriteBorder sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Details Row - Collapsible */}
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                        {/* Stats Section */}
                        <Box display="flex" gap={3} flexWrap="wrap" mb={2}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Group sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.students}</strong> students
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <EventAvailable sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.completed_sessions}</strong> sessions
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Speed sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.response_rate}%</strong> response rate
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Additional Details */}
                        <Box display="flex" gap={3} flexWrap="wrap">
                          {/* Languages */}
                          <Box display="flex" alignItems="center" gap={1}>
                            <LanguageOutlined sx={{ fontSize: 14, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {tutor.languages.join(', ')}
                            </Typography>
                          </Box>
                          
                          {/* Badges */}
                          {tutor.badges.length > 0 && (
                            <Box display="flex" gap={1}>
                              {tutor.badges.map((badge, index) => (
                                <Chip
                                  key={index}
                                  label={badge}
                                  size="small"
                                  sx={{
                                    bgcolor: '#1a237e',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          
                          {/* Availability */}
                          <Box display="flex" alignItems="center" gap={1}>
                            <Schedule sx={{ fontSize: 14, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {tutor.availability?.join(', ') || 'Flexible'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </PremiumCard>
              ) : (
                <StyledCard elevation={3}>
                  <CardContent sx={{ p: 2 }}>
                    {/* RedBus-style Table Layout */}
                    <Box>
                      {/* Header Row */}
                      <Box display="flex" alignItems="center" mb={2} pb={2} borderBottom="1px solid rgba(0,0,0,0.06)">
                        {/* Avatar and Name */}
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 280 }}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              tutor.is_verified ? (
                                <Verified sx={{ fontSize: 16, color: '#4caf50' }} />
                              ) : null
                            }
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: '#3949ab',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {tutor.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                          </Badge>
                          <Box ml={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="subtitle1" fontWeight="600" sx={{ fontSize: '0.95rem' }}>
                                {tutor.name}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Rating value={tutor.rating} precision={0.1} size="small" readOnly />
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {tutor.rating} ({tutor.reviews})
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        {/* Stats */}
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 200 }}>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', mr: 2 }}>
                            <strong>{tutor.students}</strong> students
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', mr: 2 }}>
                            <strong>{tutor.completed_sessions}</strong> sessions
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            <strong>{tutor.response_rate}%</strong> response
                          </Typography>
                        </Box>
                        
                        {/* Skills */}
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 300, flexWrap: 'wrap' }}>
                          {tutor.skills.slice(0, 3).map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: '#f3f4f6',
                                color: '#374151',
                                fontSize: '0.75rem',
                                height: 24,
                                mr: 0.5
                              }}
                            />
                          ))}
                          {tutor.skills.length > 3 && (
                            <Chip
                              label={`+${tutor.skills.length - 3} more`}
                              size="small"
                              sx={{
                                bgcolor: '#e5e7eb',
                                color: '#374151',
                                fontSize: '0.75rem',
                                height: 24
                              }}
                            />
                          )}
                        </Box>
                        
                        {/* Price and Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 200 }}>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold', fontSize: '1.1rem' }}>
                              ₹{tutor.hourly_rate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              per hour
                            </Typography>
                          </Box>
                          <Box display="flex" gap={1}>
                            <GradientButton
                              size="small"
                              onClick={() => handleBookSession(tutor)}
                            >
                              Book
                            </GradientButton>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleFavorite(tutor.id)}
                              sx={{ ml: 1 }}
                            >
                              {favorites.includes(tutor.id) ? (
                                <Favorite sx={{ fontSize: 18, color: '#e91e63' }} />
                              ) : (
                                <FavoriteBorder sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Details Row - Collapsible */}
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                        {/* Stats Section */}
                        <Box display="flex" gap={3} flexWrap="wrap" mb={2}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Group sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.students}</strong> students
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <EventAvailable sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.completed_sessions}</strong> sessions
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Speed sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              <strong>{tutor.response_rate}%</strong> response rate
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Additional Details */}
                        <Box display="flex" gap={3} flexWrap="wrap">
                          {/* Languages */}
                          <Box display="flex" alignItems="center" gap={1}>
                            <LanguageOutlined sx={{ fontSize: 14, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {tutor.languages.join(', ')}
                            </Typography>
                          </Box>
                          
                          {/* Badges */}
                          {tutor.badges.length > 0 && (
                            <Box display="flex" gap={1}>
                              {tutor.badges.map((badge, index) => (
                                <Chip
                                  key={index}
                                  label={badge}
                                  size="small"
                                  sx={{
                                    bgcolor: '#1a237e',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          
                          {/* Availability */}
                          <Box display="flex" alignItems="center" gap={1}>
                            <Schedule sx={{ fontSize: 14, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {tutor.availability?.join(', ') || 'Flexible'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              )}
            </Grid>
          ))}
        </Grid>

        {filteredTutors.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No tutors found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your filters or search terms
            </Typography>
            <Button variant="contained" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPriceRange([0, 200]);
              setRatingFilter(0);
            }}>
              Clear Filters
            </Button>
          </Paper>
        )}
      </Container>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book Session with {selectedTutor?.name}</DialogTitle>
        <DialogContent>
          {selectedTutor && (
            <Box>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ bgcolor: '#667eea' }}>
                  {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedTutor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${selectedTutor.hourly_rate}/hour • {selectedTutor.rating}⭐
                  </Typography>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="What would you like to learn?"
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Preferred Date"
                type="date"
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Preferred Time"
                type="time"
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmBooking}>
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
      />
    </Box>
  );
};

export default SearchTutors;
