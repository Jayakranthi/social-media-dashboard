import React, { useEffect, useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ThumbUp as ThumbUpIcon,
  BarChart as BarChartIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import EngagementChart from './EngagementChart';
import FollowerGrowthChart from './FollowerGrowthChart';
import PostPerformanceTable from './PostPerformanceTable';
import { mockSocialMediaService } from '../../services/mockData';
import { AnalyticsSummary, SocialAccount } from '../../types';
import { formatNumber, formatPercentage, getPlatformColor } from '../../utils/formatters';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryData = await mockSocialMediaService.getAnalyticsSummary();
        const accountsData = await mockSocialMediaService.getAccounts();
        
        setSummary(summaryData);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const getPlatformIconComponent = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon style={{ color: getPlatformColor('instagram') }} />;
      case 'twitter':
        return <TwitterIcon style={{ color: getPlatformColor('twitter') }} />;
      case 'facebook':
        return <FacebookIcon style={{ color: getPlatformColor('facebook') }} />;
      default:
        return null;
    }
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 250px', maxWidth: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Total Followers
              </Typography>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <PeopleIcon />
              </Avatar>
            </Box>
            <Typography variant="h4" component="div">
              {summary ? formatNumber(summary.totalFollowers) : '-'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="success.main">
                {summary ? formatPercentage(summary.followerGrowth) : '-'} growth
              </Typography>
            </Box>
          </Paper>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', maxWidth: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Total Engagement
              </Typography>
              <Avatar sx={{ bgcolor: 'secondary.light' }}>
                <ThumbUpIcon />
              </Avatar>
            </Box>
            <Typography variant="h4" component="div">
              {summary ? formatNumber(summary.totalEngagement) : '-'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2">
                {summary ? formatPercentage(summary.engagementRate) : '-'} engagement rate
              </Typography>
            </Box>
          </Paper>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', maxWidth: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Platform Breakdown
              </Typography>
              <Avatar sx={{ bgcolor: 'info.light' }}>
                <BarChartIcon />
              </Avatar>
            </Box>
            {summary && summary.platformBreakdown.map((platform) => (
              <Box key={platform.platform} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1 }}>
                  {getPlatformIconComponent(platform.platform)}
                </Box>
                <Typography variant="body2">
                  {formatNumber(platform.followers)} followers
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', maxWidth: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Connected Accounts
              </Typography>
              <Chip 
                label={`${accounts.length} accounts`} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
            </Box>
            <List dense sx={{ p: 0 }}>
              {accounts.map((account) => (
                <ListItem key={account.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                      sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: getPlatformColor(account.platform) 
                      }}
                    >
                      {getPlatformIconComponent(account.platform)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`@${account.username}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
      
      {/* Charts */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: { xs: '100%', md: '45%' } }}>
          <EngagementChart />
        </Box>
        <Box sx={{ flex: '1 1 400px', minWidth: { xs: '100%', md: '45%' } }}>
          <FollowerGrowthChart />
        </Box>
      </Box>
      
      {/* Post Performance Table */}
      <Box sx={{ width: '100%' }}>
        <PostPerformanceTable />
      </Box>
    </Box>
  );
};

export default Dashboard;