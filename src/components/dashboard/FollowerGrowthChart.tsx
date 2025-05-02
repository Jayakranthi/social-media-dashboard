import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { FollowerData, TimeRange } from '../../types';
import { mockSocialMediaService } from '../../services/mockData';
import { getPlatformColor, formatNumber } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FollowerGrowthChartProps {
  title?: string;
}

const FollowerGrowthChart: React.FC<FollowerGrowthChartProps> = ({ title = 'Follower Growth' }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [followerData, setFollowerData] = useState<FollowerData[]>([]);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  });
  
  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockSocialMediaService.getFollowerData(timeRange);
        setFollowerData(data);
      } catch (error) {
        console.error('Error fetching follower data:', error);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  useEffect(() => {
    if (followerData.length === 0) return;
    
    // Group data by platform
    const groupedByPlatform = followerData.reduce<Record<string, FollowerData[]>>((acc, item) => {
      if (!acc[item.platform]) {
        acc[item.platform] = [];
      }
      
      acc[item.platform].push(item);
      
      return acc;
    }, {});
    
    // Calculate growth for each platform
    const platforms = Object.keys(groupedByPlatform);
    const growthData: Record<string, number> = {};
    
    platforms.forEach(platform => {
      const platformData = groupedByPlatform[platform];
      
      // Sort by date
      platformData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Get first and last data points
      const firstDataPoint = platformData[0];
      const lastDataPoint = platformData[platformData.length - 1];
      
      // Calculate growth
      const growth = lastDataPoint.count - firstDataPoint.count;
      growthData[platform] = growth;
    });
    
    // Create chart data
    setChartData({
      labels: platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)),
      datasets: [
        {
          label: 'New Followers',
          data: platforms.map(p => growthData[p]),
          backgroundColor: platforms.map(p => getPlatformColor(p)),
          borderWidth: 1
        }
      ]
    });
  }, [followerData]);
  
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `New Followers: ${formatNumber(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'New Followers'
        }
      }
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
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FollowerGrowthChart;