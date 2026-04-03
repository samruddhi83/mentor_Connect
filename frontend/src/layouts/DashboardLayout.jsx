import React, { useContext } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    if (!user) return [];
    if (user.role === 'learner') {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/learner' },
        { text: 'Search Tutors', icon: <SearchIcon />, path: '/learner/search' },
        { text: 'My Bookings', icon: <EventAvailableIcon />, path: '/learner/bookings' },
        { text: 'Subscriptions', icon: <PaymentIcon />, path: '/learner/subscriptions' },
        { text: 'Profile', icon: <PersonIcon />, path: '/learner/profile' },
      ];
    } else {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/tutor' },
        { text: 'Availability', icon: <EventAvailableIcon />, path: '/tutor/availability' },
        { text: 'Appointments', icon: <EventAvailableIcon />, path: '/tutor/appointments' },
        { text: 'Profile', icon: <PersonIcon />, path: '/tutor/profile' },
      ];
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Mentor Connect
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {user?.role === 'learner' ? 'Learner Dashboard' : 'Tutor Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
