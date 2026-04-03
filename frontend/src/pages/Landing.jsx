import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

function Landing() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 15 },
        textAlign: 'center',
        borderRadius: 4,
        mb: 8,
        boxShadow: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Unlock Your Potential with Expert Mentors
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Book 1-on-1 video sessions with world-class tutors in various fields.
          </Typography>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/register" sx={{ px: 4, py: 1.5, fontSize: '1.2rem', borderRadius: 8 }}>
            Get Started for Free
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          Why Choose Mentor Connect?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {['Access to Experts', 'Flexible Scheduling', 'Affordable Plans', 'High Quality Video'].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: 6 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                  {feature}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience seamless mentoring with our intuitive platform design tailored for your success.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Landing;
