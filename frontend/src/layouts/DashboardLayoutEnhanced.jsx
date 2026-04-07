import React, { useContext, useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Avatar, Chip, Tooltip, Collapse, Badge } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Close from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import Person from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CalendarToday from '@mui/icons-material/CalendarToday';
import VideoCall from '@mui/icons-material/VideoCall';
import Book from '@mui/icons-material/Book';
import Star from '@mui/icons-material/Star';
import Settings from '@mui/icons-material/Settings';
import Help from '@mui/icons-material/Help';
import Notifications from '@mui/icons-material/Notifications';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Assessment from '@mui/icons-material/Assessment';
import Group from '@mui/icons-material/Group';
import School from '@mui/icons-material/School';
import Work from '@mui/icons-material/Work';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(180deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
    borderRight: 'none',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    borderRight: '1px solid rgba(255,255,255,0.1)',
  },
}));

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'active' })(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: 12,
  background: active ? 'rgba(255,255,255,0.25)' : 'transparent',
  '&:hover': {
    background: 'rgba(255,255,255,0.2)',
  },
  '& .MuiListItemIcon-root': {
    color: 'white',
    minWidth: 40,
  },
  '& .MuiListItemText-root': {
    color: 'white',
    '& .MuiListItemText-primary': {
      fontWeight: active ? 600 : 400,
      fontSize: '0.9rem',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'white',
  color: '#333',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  borderBottom: '1px solid #e0e0e0',
}));

const UserProfile = styled(Box)(({ theme }) => ({
  padding: '20px 16px',
  background: 'rgba(255,255,255,0.1)',
  margin: '16px',
  borderRadius: 16,
  backdropFilter: 'blur(10px)',
}));

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const learnerMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/learner',
      badge: null
    },
    {
      text: 'Learning',
      icon: <School />,
      children: [
        { text: 'Search Tutors', icon: <SearchIcon />, path: '/learner/search' },
        { text: 'My Bookings', icon: <EventAvailableIcon />, path: '/learner/bookings', badge: 3 },
        { text: 'Upcoming Sessions', icon: <VideoCall />, path: '/learner/sessions' },
      ]
    },
    {
      text: 'Progress',
      icon: <TrendingUp />,
      children: [
        { text: 'Learning Analytics', icon: <Assessment />, path: '/learner/analytics' },
        { text: 'Certificates', icon: <Star />, path: '/learner/certificates' },
        { text: 'Achievements', icon: <Book />, path: '/learner/achievements' },
      ]
    },
    {
      text: 'Account',
      icon: <Person />,
      children: [
        { text: 'Profile', icon: <PersonIcon />, path: '/learner/profile' },
        { text: 'Subscriptions', icon: <PaymentIcon />, path: '/learner/subscriptions' },
        { text: 'Settings', icon: <Settings />, path: '/learner/settings' },
      ]
    },
  ];

  const tutorMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/tutor',
      badge: null
    },
    {
      text: 'Teaching',
      icon: <Work />,
      children: [
        { text: 'Availability', icon: <CalendarToday />, path: '/tutor/availability' },
        { text: 'Appointments', icon: <EventAvailableIcon />, path: '/tutor/appointments', badge: 5 },
        { text: 'Students', icon: <Group />, path: '/tutor/students' },
      ]
    },
    {
      text: 'Analytics',
      icon: <Assessment />,
      children: [
        { text: 'Earnings', icon: <TrendingUp />, path: '/tutor/earnings' },
        { text: 'Performance', icon: <Star />, path: '/tutor/performance' },
        { text: 'Reports', icon: <Book />, path: '/tutor/reports' },
      ]
    },
    {
      text: 'Profile',
      icon: <Person />,
      children: [
        { text: 'My Profile', icon: <PersonIcon />, path: '/tutor/profile' },
        { text: 'Settings', icon: <Settings />, path: '/tutor/settings' },
        { text: 'Help', icon: <Help />, path: '/tutor/help' },
      ]
    },
  ];

  const getMenuItems = () => {
    if (!user) return [];
    return user.role === 'learner' ? learnerMenuItems : tutorMenuItems;
  };

  const renderMenuItem = (item, depth = 0) => {
    const isActive = item.path ? isActivePath(item.path) : false;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.text];

    if (hasChildren) {
      return (
        <React.Fragment key={item.text}>
          <StyledListItem active={isActive}>
            <ListItemButton onClick={() => toggleSection(item.text)} sx={{ pl: depth * 2 + 2 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </StyledListItem>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <StyledListItem key={item.text} active={isActive}>
        <ListItemButton component={Link} to={item.path} sx={{ pl: depth * 2 + 2 }}>
          <ListItemIcon>
            {item.badge ? (
              <Badge badgeContent={item.badge} color="error">
                {item.icon}
              </Badge>
            ) : (
              item.icon
            )}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </StyledListItem>
    );
  };

  const drawer = (
    <Box>
      {/* Logo Section with Close Button */}
      <Box sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            }
          }}
          onClick={toggleSidebar}
        >
          <Close sx={{ fontSize: 20 }} />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
          🎓 MentorConnect
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Learn • Grow • Succeed
        </Typography>
      </Box>

      {/* User Profile Section */}
      {user && (
        <UserProfile>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'white', color: '#1a237e', width: 48, height: 48 }}>
              {user.first_name?.[0]}{user.last_name?.[0]}
            </Avatar>
            <Box flexGrow={1}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                {user.first_name} {user.last_name}
              </Typography>
              <Chip
                label={user.role}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          </Box>
        </UserProfile>
      )}

      {/* Navigation Menu */}
      <List sx={{ p: 1 }}>
        {getMenuItems().map((item) => renderMenuItem(item))}
      </List>

      {/* Bottom Actions */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <StyledListItem>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </StyledListItem>
      </Box>
    </Box>
  );

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* Floating Menu Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1400,
          bgcolor: '#1a237e',
          color: 'white',
          '&:hover': {
            bgcolor: '#283593',
          }
        }}
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>
      
      <Box component="nav">
        {/* Mobile Drawer */}
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </StyledDrawer>
        
        {/* Desktop Sidebar */}
        <StyledDrawer
          variant="temporary"
          open={sidebarOpen}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              zIndex: 1300,
            }
          }}
        >
          {drawer}
        </StyledDrawer>
      </Box>
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        width: '100%',
        background: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
