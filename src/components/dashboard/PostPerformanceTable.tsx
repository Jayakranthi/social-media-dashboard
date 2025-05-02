import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { PostData } from '../../types';
import { mockSocialMediaService } from '../../services/mockData';
import { formatNumber, formatTimeAgo, getPlatformColor } from '../../utils/formatters';

interface PostPerformanceTableProps {
  title?: string;
  limit?: number;
}

const PostPerformanceTable: React.FC<PostPerformanceTableProps> = ({ 
  title = 'Top Performing Posts', 
  limit = 5 
}) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockSocialMediaService.getPosts(limit);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    
    fetchData();
  }, [limit]);
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon sx={{ color: getPlatformColor('instagram') }} />;
      case 'twitter':
        return <TwitterIcon sx={{ color: getPlatformColor('twitter') }} />;
      case 'facebook':
        return <FacebookIcon sx={{ color: getPlatformColor('facebook') }} />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="post performance table">
            <TableHead>
              <TableRow>
                <TableCell>Platform</TableCell>
                <TableCell>Post</TableCell>
                <TableCell align="right">Likes</TableCell>
                <TableCell align="right">Comments</TableCell>
                <TableCell align="right">Shares</TableCell>
                <TableCell align="right">Engagement Rate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow
                  key={post.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getPlatformIcon(post.platform)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 300 }}>
                      {post.imageUrl && (
                        <Avatar
                          src={post.imageUrl}
                          alt="Post image"
                          variant="rounded"
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                      )}
                      <Box>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
                          {post.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(post.publishDate)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <LikeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      {formatNumber(post.likes)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <CommentIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      {formatNumber(post.comments)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <ShareIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      {formatNumber(post.shares)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${post.engagement.toFixed(2)}%`}
                      size="small"
                      sx={{
                        backgroundColor: post.engagement > 3 
                          ? 'success.light' 
                          : post.engagement > 1 
                            ? 'warning.light' 
                            : 'error.light',
                        color: post.engagement > 3 
                          ? 'success.contrastText' 
                          : post.engagement > 1 
                            ? 'warning.contrastText' 
                            : 'error.contrastText',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Open post">
                      <IconButton
                        size="small"
                        onClick={() => window.open(post.postUrl, '_blank')}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PostPerformanceTable;