/**
 * Utility functions for formatting data in the social media dashboard
 */

// Format large numbers with K, M, B suffixes
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format percentage values
export const formatPercentage = (value: number): string => {
  return value.toFixed(2) + '%';
};

// Format date to readable string
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time ago (e.g., "2 hours ago", "3 days ago")
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

// Get platform color for styling
export const getPlatformColor = (platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return '#E1306C';
    case 'twitter':
      return '#1DA1F2';
    case 'facebook':
      return '#4267B2';
    default:
      return '#6c757d';
  }
};

// Get platform icon name (for use with react-icons)
export const getPlatformIcon = (platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return 'FaInstagram';
    case 'twitter':
      return 'FaTwitter';
    case 'facebook':
      return 'FaFacebook';
    default:
      return 'FaGlobe';
  }
};