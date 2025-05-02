import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Toolbar,
  Box,
  Collapse,
  ListItemButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  BarChart as AnalyticsIcon,
  People as AccountsIcon,
  Description as ReportsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ open, drawerWidth }) => {
  const location = useLocation();
  const [accountsOpen, setAccountsOpen] = React.useState(false);
  const [reportsOpen, setReportsOpen] = React.useState(false);
  
  const handleAccountsClick = () => {
    setAccountsOpen(!accountsOpen);
  };
  
  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen);
  };
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          ...(open ? {} : {
            overflowX: 'hidden',
            width: '64px',
            transition: theme => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          })
        },
      }}
      open={open}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          
          <ListItemButton
            component={Link}
            to="/analytics"
            selected={location.pathname === '/analytics'}
          >
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          
          <ListItemButton onClick={handleAccountsClick}>
            <ListItemIcon>
              <AccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" sx={{ opacity: open ? 1 : 0 }} />
            {open && (accountsOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          
          <Collapse in={accountsOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/accounts/instagram"
                selected={location.pathname === '/accounts/instagram'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary="Instagram" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/accounts/twitter"
                selected={location.pathname === '/accounts/twitter'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary="Twitter" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/accounts/facebook"
                selected={location.pathname === '/accounts/facebook'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <ListItemText primary="Facebook" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/accounts/connect"
                selected={location.pathname === '/accounts/connect'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Box sx={{ 
                    width: 24, 
                    height: 24, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px dashed grey',
                    borderRadius: '50%'
                  }}>
                    +
                  </Box>
                </ListItemIcon>
                <ListItemText primary="Connect New" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
          </Collapse>
          
          <ListItemButton onClick={handleReportsClick}>
            <ListItemIcon>
              <ReportsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
            {open && (reportsOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          
          <Collapse in={reportsOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/reports/engagement"
                selected={location.pathname === '/reports/engagement'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Box sx={{ width: 24 }}>📊</Box>
                </ListItemIcon>
                <ListItemText primary="Engagement" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/reports/followers"
                selected={location.pathname === '/reports/followers'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Box sx={{ width: 24 }}>👥</Box>
                </ListItemIcon>
                <ListItemText primary="Followers" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/reports/posts"
                selected={location.pathname === '/reports/posts'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Box sx={{ width: 24 }}>📝</Box>
                </ListItemIcon>
                <ListItemText primary="Posts" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              
              <ListItemButton
                component={Link}
                to="/reports/export"
                selected={location.pathname === '/reports/export'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Box sx={{ width: 24 }}>📤</Box>
                </ListItemIcon>
                <ListItemText primary="Export Data" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        
        <Divider />
        
        <List>
          <ListItemButton
            component={Link}
            to="/settings"
            selected={location.pathname === '/settings'}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;