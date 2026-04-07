import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, Chip, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { VideoCall, AccessTime, Star, School, TrendingUp, People, Security, Support } from '@mui/icons-material';

function Landing() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 10, md: 20 },
          px: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Chip 
              icon={<Star />} 
              label="🔥 Trending Platform" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                fontWeight: 'bold',
                mb: 2
              }} 
            />
          </Box>
          
          <Typography 
            variant="h1" 
            component="h1" 
            fontWeight="800" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.2,
              mb: 3
            }}
          >
            Learn from the
            <Box component="span" sx={{ color: '#ffd700' }}> Best Mentors</Box>
            <br />Worldwide
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6, 
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Connect with industry experts for personalized 1-on-1 video sessions. 
            Book 15 or 30-minute slots and accelerate your learning journey.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/slots" 
              sx={{ 
                px: 5, 
                py: 2, 
                fontSize: '1.1rem',
                borderRadius: 3,
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                }
              }}
            >
              <VideoCall sx={{ mr: 2 }} />
              Book Your Session
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/register" 
              sx={{ 
                px: 5, 
                py: 2, 
                fontSize: '1.1rem',
                borderRadius: 3,
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': { 
                  borderColor: 'white', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Start Free Trial
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">500+</Typography>
              <Typography variant="body2" opacity={0.9}>Expert Mentors</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">10K+</Typography>
              <Typography variant="body2" opacity={0.9}>Happy Students</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">98%</Typography>
              <Typography variant="body2" opacity={0.9}>Success Rate</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography 
          variant="h3" 
          textAlign="center" 
          fontWeight="bold" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose <Box component="span" sx={{ color: 'primary.main' }}>MentorConnect</Box>?
        </Typography>
        
        <Grid container spacing={4}>
          {[
            { icon: <VideoCall />, title: 'Video Sessions', desc: 'HD quality video calls with screen sharing and recording' },
            { icon: <AccessTime />, title: 'Flexible Timing', desc: 'Book 15 or 30-minute slots at your convenience' },
            { icon: <School />, title: 'Expert Tutors', desc: 'Learn from industry professionals and subject matter experts' },
            { icon: <TrendingUp />, title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics' }
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%', 
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  bgcolor: 'white',
                  '&:hover': { 
                    transform: 'translateY(-12px)', 
                    boxShadow: 8,
                    '& .feature-icon': {
                      color: 'primary.main',
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              >
                <Box 
                  className="feature-icon"
                  sx={{
                    fontSize: 48,
                    color: 'text.secondary',
                    mb: 2,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works */}
      <Box sx={{ bgcolor: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            textAlign="center" 
            fontWeight="bold" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                {[1, 2, 3].map((step) => (
                  <Box key={step} sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 56,
                        height: 56,
                        fontWeight: 'bold',
                        mr: 3
                      }}
                    >
                      {step}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {step === 1 && 'Browse & Select'}
                        {step === 2 && 'Book Your Slot'}
                        {step === 3 && 'Join Video Call'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step === 1 && 'Find the perfect mentor based on skills, rating, and availability'}
                        {step === 2 && 'Choose your preferred time slot and duration (15 or 30 minutes)'}
                        {step === 3 && 'Connect via video call at the scheduled time'}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    mx: 'auto',
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  <VideoCall sx={{ fontSize: 120, color: 'white' }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Start Your Learning Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of students already learning from expert mentors
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/register"
            sx={{ 
              px: 6, 
              py: 2, 
              fontSize: '1.1rem',
              borderRadius: 3,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
            }}
          >
            Get Started Now - It's Free!
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;
