import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, Chip, Avatar, Divider, TextField, InputAdornment, Card, CardContent, IconButton, Fade, Slide, useScrollTrigger } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  VideoCall, 
  AccessTime, 
  Star, 
  School, 
  TrendingUp, 
  People, 
  Security, 
  Support,
  Search,
  ArrowForward,
  CheckCircle,
  PlayArrow,
  CalendarToday,
  Language,
  Public,
  WorkspacePremium,
  Psychology,
  Biotech,
  Code,
  Brush,
  MusicNote,
  FitnessCenter,
  MedicalServices,
  BusinessCenter,
  AutoAwesome,
  Speed,
  Timer,
  Groups,
  EmojiEvents,
  Lightbulb,
  RocketLaunch,
  Handshake,
  Verified
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 0%, #3949ab 100%)',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: 50,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(26, 35, 123, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #283593 0%, #5c6bc0 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(26, 35, 123, 0.5)',
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#1a237e',
  color: '#1a237e',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: 50,
  textTransform: 'none',
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#283593',
    color: '#283593',
    transform: 'translateY(-2px)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: 'white',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  },
}));

function Landing() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    navigate('/learner/search');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  const stats = [
    { number: '10,000+', label: 'Expert Tutors', icon: <People /> },
    { number: '50,000+', label: 'Active Learners', icon: <School /> },
    { number: '100,000+', label: 'Sessions Completed', icon: <VideoCall /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <Star /> },
  ];

  const features = [
    {
      icon: <Verified sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: 'Verified Experts',
      description: 'All tutors are thoroughly vetted and verified for quality and expertise.',
    },
    {
      icon: <VideoCall sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: 'Interactive Sessions',
      description: 'Live video sessions with screen sharing and collaborative tools.',
    },
    {
      icon: <CalendarToday sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with 24/7 availability.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and insights.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: 'Secure Platform',
      description: 'Your data and privacy are protected with enterprise-grade security.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#1a237e' }} />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.',
    },
  ];

  const categories = [
    { name: 'Programming', icon: <Code />, color: '#1a237e' },
    { name: 'Data Science', icon: <Biotech />, color: '#3949ab' },
    { name: 'Business', icon: <BusinessCenter />, color: '#5c6bc0' },
    { name: 'Design', icon: <Brush />, color: '#283593' },
    { name: 'Music', icon: <MusicNote />, color: '#5c6bc0' },
    { name: 'Fitness', icon: <FitnessCenter />, color: '#3949ab' },
    { name: 'Health', icon: <MedicalServices />, color: '#5c6bc0' },
    { name: 'Languages', icon: <Language />, color: '#283593' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      content: 'MentorConnect helped me advance my career with personalized guidance from industry experts.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      content: 'The quality of tutors and the flexibility of scheduling make this platform exceptional.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      content: 'I learned more in 3 months than I did in a year of self-study. Highly recommended!',
      rating: 5,
      avatar: 'ER'
    },
  ];

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          color: 'white',
          py: { xs: 12, md: 20 },
          px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1200, textAlign: 'center' }}>
            <Fade in timeout={1000}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 4 }}>
                  <Chip
                    icon={<AutoAwesome />}
                    label="🚀 Transform Your Career"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  />
                </Box>
                
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.2,
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  Learn from the
                  <Box component="span" sx={{ color: '#ffd700' }}> Best</Box> Tutors
                  <br />
                  Worldwide
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    lineHeight: 1.6,
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: 800,
                    mx: 'auto',
                    textAlign: 'center',
                  }}
                >
                  Connect with 10,000+ expert mentors for personalized learning experiences. 
                  Transform your skills and accelerate your career growth.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 3, mb: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <GradientButton onClick={handleGetStarted}>
                    Get Started Free
                  </GradientButton>
                  <OutlinedButton onClick={handleSearch}>
                    Browse Tutors
                  </OutlinedButton>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle sx={{ fontSize: 20 }} />
                    <Typography variant="body2">No credit card required</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle sx={{ fontSize: 20 }} />
                    <Typography variant="body2">Free trial session</Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
            
            <Slide in timeout={1500} direction="up">
              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Paper
                  elevation={24}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    maxWidth: 500,
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', color: 'white' }}>
                    Start Your Learning Journey
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="What do you want to learn?"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 2,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <GradientButton fullWidth onClick={handleSearch}>
                    Search Tutors
                  </GradientButton>
                </Paper>
              </Box>
            </Slide>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', mb: 6, width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Trusted by Learners Worldwide
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join thousands of successful professionals
          </Typography>
        </Box>
        
        <Grid container spacing={4} sx={{ maxWidth: 1200, width: '100%' }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard elevation={0} sx={{ textAlign: 'center' }}>
                <Box sx={{ color: '#1a237e', mb: 2, display: 'flex', justifyContent: 'center' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', mb: 6, width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Explore Popular Categories
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Find expert tutors in your field of interest
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ maxWidth: 1200, width: '100%', justifyContent: 'center' }}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FeatureCard elevation={2} sx={{ textAlign: 'center' }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ color: category.color, mb: 2, fontSize: 40, display: 'flex', justifyContent: 'center' }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    500+ Tutors
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', mb: 6, width: '100%' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Why Choose MentorConnect?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Experience the difference with our platform
            </Typography>
          </Box>
          
          <Grid container spacing={4} sx={{ maxWidth: 1200, width: '100%', justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard elevation={3} sx={{ textAlign: 'center' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', mb: 6, width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What Our Learners Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real stories from real people
          </Typography>
        </Box>
        
        <Grid container spacing={4} sx={{ maxWidth: 1200, width: '100%', justifyContent: 'center' }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard elevation={3} sx={{ textAlign: 'center' }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: '#ffd700', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                    <Avatar sx={{ bgcolor: '#1a237e', color: 'white' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', py: 8, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', color: 'white', width: '100%' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Ready to Start Your Learning Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of learners transforming their careers
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <GradientButton onClick={handleGetStarted}>
                Get Started Free
              </GradientButton>
              <OutlinedButton onClick={handleSearch}>
                Browse Tutors
              </OutlinedButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;
