import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Social Media Analytics Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/accounts/connect"
            sx={{ mr: 2 }}
          >
            Connect Account
          </Button>
          
          <IconButton
            color="inherit"
            aria-label="show notifications"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleNotificationMenuOpen}
            sx={{ mr: 2 }}
          >
            <NotificationsIcon />
          </IconButton>
          
          <IconButton
            color="inherit"
            aria-label="settings"
            component={Link}
            to="/settings"
            sx={{ mr: 2 }}
          >
            <SettingsIcon />
          </IconButton>
          
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt="User" src="https://randomuser.me/api/portraits/men/1.jpg" sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/settings">Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        id="notification-menu"
        anchorEl={notificationAnchorEl}
        keepMounted
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
      >
        <MenuItem onClick={handleNotificationMenuClose}>
          <Typography variant="body2">Your Instagram followers increased by 5% this week!</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          <Typography variant="body2">New Twitter engagement report is available</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          <Typography variant="body2">Facebook post "Product launch" is trending</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;