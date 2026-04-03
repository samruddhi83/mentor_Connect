import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress, Card, CardContent, CardActions, Button } from '@mui/material';
import api from '../../services/api';

function LearnerHome() {
  const [stats, setStats] = useState({ totalBookings: 0, activePlan: 'None' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch these from /api/learner/dashboard endpoint
    // For now, mocking:
    setTimeout(() => {
      setStats({ totalBookings: 3, activePlan: 'Basic' });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Welcome to your Dashboard
      </Typography>
      
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Plan
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold">
                {stats.activePlan}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary">Upgrade</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Sessions Booked
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold">
                {stats.totalBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Skeleton for upcoming sessions could go here */}
      <Paper elevation={2} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upcoming Sessions
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No upcoming sessions found. Go to 'Search Tutors' to book one!
        </Typography>
      </Paper>
    </Box>
  );
}

export default LearnerHome;
