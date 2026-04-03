import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, CircularProgress } from '@mui/material';

function TutorHome() {
  const [stats, setStats] = useState({ earnings: 0, pendingRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({ earnings: 450, pendingRequests: 2 });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Tutor Dashboard
      </Typography>
      
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Earnings
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" color="green">
                ${stats.earnings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Requests
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold" color="secondary">
                {stats.pendingRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TutorHome;
