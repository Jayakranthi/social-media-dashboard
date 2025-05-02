import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<div>Analytics Page (Coming Soon)</div>} />
            <Route path="/accounts/instagram" element={<div>Instagram Accounts (Coming Soon)</div>} />
            <Route path="/accounts/twitter" element={<div>Twitter Accounts (Coming Soon)</div>} />
            <Route path="/accounts/facebook" element={<div>Facebook Accounts (Coming Soon)</div>} />
            <Route path="/accounts/connect" element={<div>Connect New Account (Coming Soon)</div>} />
            <Route path="/reports/engagement" element={<div>Engagement Reports (Coming Soon)</div>} />
            <Route path="/reports/followers" element={<div>Follower Reports (Coming Soon)</div>} />
            <Route path="/reports/posts" element={<div>Post Reports (Coming Soon)</div>} />
            <Route path="/reports/export" element={<div>Export Data (Coming Soon)</div>} />
            <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
