import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { EngagementData, TimeRange } from '../../types';
import { mockSocialMediaService } from '../../services/mockData';
import { getPlatformColor } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementChartProps {
  title?: string;
}

const EngagementChart: React.FC<EngagementChartProps> = ({ title = 'Engagement Over Time' }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: []
  });
  
  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockSocialMediaService.getEngagementData(timeRange);
        setEngagementData(data);
      } catch (error) {
        console.error('Error fetching engagement data:', error);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  useEffect(() => {
    if (engagementData.length === 0) return;
    
    // Group data by date
    const groupedByDate = engagementData.reduce<Record<string, Record<string, number>>>((acc, item) => {
      const dateStr = new Date(item.date).toLocaleDateString();
      
      if (!acc[dateStr]) {
        acc[dateStr] = {};
      }
      
      const platformKey = `${item.platform}-${item.accountId}`;
      const totalEngagement = item.likes + item.comments + item.shares;
      
      acc[dateStr][platformKey] = totalEngagement;
      
      return acc;
    }, {});
    
    // Get unique platform-account combinations
    const platformAccounts = Array.from(
      new Set(engagementData.map(item => `${item.platform}-${item.accountId}`))
    );
    
    // Sort dates
    const sortedDates = Object.keys(groupedByDate).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    
    // Create datasets
    const datasets = platformAccounts.map(platformAccount => {
      const [platform, accountId] = platformAccount.split('-');
      
      return {
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        data: sortedDates.map(date => groupedByDate[date][platformAccount] || 0),
        borderColor: getPlatformColor(platform),
        backgroundColor: `${getPlatformColor(platform)}33`, // Add transparency
        tension: 0.4,
        fill: true
      };
    });
    
    setChartData({
      labels: sortedDates,
      datasets
    });
  }, [engagementData]);
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Engagement (Likes + Comments + Shares)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  return (
    <Card>
      <CardHeader 
        title={title}
        action={
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="time-range-select-label">Time Range</InputLabel>
            <Select
              labelId="time-range-select-label"
              id="time-range-select"
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
            >
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 90 Days</MenuItem>
              <MenuItem value="ytd">Year to Date</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;