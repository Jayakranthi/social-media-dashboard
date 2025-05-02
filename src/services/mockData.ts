import { 
  SocialAccount, 
  FollowerData, 
  EngagementData, 
  PostData, 
  AnalyticsSummary, 
  TimeRange, 
  Platform 
} from '../types';

// Mock Social Accounts
const mockAccounts: SocialAccount[] = [
  {
    id: 'insta1',
    platform: 'instagram',
    username: 'techbrand',
    profileUrl: 'https://instagram.com/techbrand',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    isConnected: true,
    lastUpdated: new Date('2025-04-30T10:30:00')
  },
  {
    id: 'twitter1',
    platform: 'twitter',
    username: 'techbrand',
    profileUrl: 'https://twitter.com/techbrand',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    isConnected: true,
    lastUpdated: new Date('2025-04-30T11:45:00')
  },
  {
    id: 'fb1',
    platform: 'facebook',
    username: 'TechBrand',
    profileUrl: 'https://facebook.com/techbrand',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    isConnected: true,
    lastUpdated: new Date('2025-04-30T09:15:00')
  }
];

// Generate dates for the last 90 days
const generateDates = (days: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date);
  }
  
  return dates;
};

const dates = generateDates(90);

// Generate follower data for the last 90 days
const generateFollowerData = (): FollowerData[] => {
  const followerData: FollowerData[] = [];
  
  mockAccounts.forEach(account => {
    let baseFollowers = 0;
    
    switch(account.platform) {
      case 'instagram':
        baseFollowers = 15000;
        break;
      case 'twitter':
        baseFollowers = 8500;
        break;
      case 'facebook':
        baseFollowers = 22000;
        break;
    }
    
    dates.forEach((date, index) => {
      // Add some randomness to follower growth
      const dailyGrowth = Math.floor(Math.random() * 50) + 10;
      const followers = baseFollowers + (index * dailyGrowth);
      
      followerData.push({
        date: new Date(date),
        count: followers,
        platform: account.platform,
        accountId: account.id
      });
    });
  });
  
  return followerData;
};

// Generate engagement data for the last 90 days
const generateEngagementData = (): EngagementData[] => {
  const engagementData: EngagementData[] = [];
  
  mockAccounts.forEach(account => {
    dates.forEach(date => {
      let baseLikes = 0;
      let baseComments = 0;
      let baseShares = 0;
      
      switch(account.platform) {
        case 'instagram':
          baseLikes = Math.floor(Math.random() * 500) + 300;
          baseComments = Math.floor(Math.random() * 50) + 20;
          baseShares = Math.floor(Math.random() * 30) + 10;
          break;
        case 'twitter':
          baseLikes = Math.floor(Math.random() * 300) + 100;
          baseComments = Math.floor(Math.random() * 30) + 10;
          baseShares = Math.floor(Math.random() * 100) + 50;
          break;
        case 'facebook':
          baseLikes = Math.floor(Math.random() * 400) + 200;
          baseComments = Math.floor(Math.random() * 80) + 30;
          baseShares = Math.floor(Math.random() * 60) + 20;
          break;
      }
      
      engagementData.push({
        date: new Date(date),
        likes: baseLikes,
        comments: baseComments,
        shares: baseShares,
        platform: account.platform,
        accountId: account.id
      });
    });
  });
  
  return engagementData;
};

// Generate mock posts
const generatePosts = (): PostData[] => {
  const posts: PostData[] = [];
  const postContents = [
    "Check out our latest product release! #innovation",
    "We're excited to announce our new partnership with @techpartner",
    "Thanks to all our customers for the amazing feedback!",
    "Join us for our upcoming webinar on digital transformation",
    "Behind the scenes at our annual team retreat",
    "Happy to share that we've reached 100k followers! Thank you for your support",
    "New blog post: 10 tips for improving your digital strategy",
    "We're hiring! Check out our careers page for open positions",
    "Product tutorial: How to get the most out of our latest features",
    "Customer spotlight: See how @bigclient achieved 200% ROI with our solution"
  ];
  
  mockAccounts.forEach(account => {
    // Generate 10 posts per account
    for (let i = 0; i < 10; i++) {
      const publishDate = new Date();
      publishDate.setDate(publishDate.getDate() - Math.floor(Math.random() * 30));
      
      const likes = Math.floor(Math.random() * 1000) + 100;
      const comments = Math.floor(Math.random() * 100) + 10;
      const shares = Math.floor(Math.random() * 50) + 5;
      
      // Calculate engagement rate (likes + comments + shares) / estimated reach
      const estimatedReach = account.platform === 'instagram' ? 15000 : 
                            account.platform === 'twitter' ? 8500 : 22000;
      const engagement = ((likes + comments + shares) / estimatedReach) * 100;
      
      posts.push({
        id: `${account.platform}-post-${i}`,
        platform: account.platform,
        accountId: account.id,
        content: postContents[i],
        imageUrl: i % 2 === 0 ? `https://picsum.photos/id/${i + 10}/500/500` : undefined,
        postUrl: `https://${account.platform}.com/${account.username}/posts/${i}`,
        publishDate,
        likes,
        comments,
        shares,
        engagement
      });
    }
  });
  
  // Sort by engagement rate (descending)
  return posts.sort((a, b) => b.engagement - a.engagement);
};

// Generate analytics summary
const generateAnalyticsSummary = (
  followerData: FollowerData[], 
  engagementData: EngagementData[],
  posts: PostData[]
): AnalyticsSummary => {
  // Calculate total followers (most recent count for each account)
  const latestFollowers: {[key: string]: number} = {};
  followerData.forEach(data => {
    const key = `${data.platform}-${data.accountId}`;
    if (!latestFollowers[key] || new Date(data.date) > new Date(latestFollowers[key])) {
      latestFollowers[key] = data.count;
    }
  });
  
  const totalFollowers = Object.values(latestFollowers).reduce((sum, count) => sum + count, 0);
  
  // Calculate follower growth (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const oldFollowerCounts: {[key: string]: number} = {};
  const newFollowerCounts: {[key: string]: number} = {};
  
  followerData.forEach(data => {
    const key = `${data.platform}-${data.accountId}`;
    const dataDate = new Date(data.date);
    
    if (dataDate <= thirtyDaysAgo) {
      if (!oldFollowerCounts[key] || dataDate > new Date(oldFollowerCounts[key])) {
        oldFollowerCounts[key] = data.count;
      }
    } else {
      if (!newFollowerCounts[key] || dataDate > new Date(newFollowerCounts[key])) {
        newFollowerCounts[key] = data.count;
      }
    }
  });
  
  const oldTotal = Object.values(oldFollowerCounts).reduce((sum, count) => sum + count, 0);
  const newTotal = Object.values(newFollowerCounts).reduce((sum, count) => sum + count, 0);
  const followerGrowth = oldTotal > 0 ? ((newTotal - oldTotal) / oldTotal) * 100 : 0;
  
  // Calculate total engagement
  const totalLikes = engagementData.reduce((sum, data) => sum + data.likes, 0);
  const totalComments = engagementData.reduce((sum, data) => sum + data.comments, 0);
  const totalShares = engagementData.reduce((sum, data) => sum + data.shares, 0);
  const totalEngagement = totalLikes + totalComments + totalShares;
  
  // Calculate engagement rate
  const totalPotentialReach = totalFollowers * engagementData.length;
  const engagementRate = totalPotentialReach > 0 ? (totalEngagement / totalPotentialReach) * 100 : 0;
  
  // Get top 5 posts by engagement
  const topPosts = [...posts].sort((a, b) => b.engagement - a.engagement).slice(0, 5);
  
  // Platform breakdown
  const platformBreakdown = [
    {
      platform: 'instagram' as Platform,
      followers: followerData
        .filter(data => data.platform === 'instagram')
        .reduce((max, data) => data.count > max ? data.count : max, 0),
      engagement: engagementData
        .filter(data => data.platform === 'instagram')
        .reduce((sum, data) => sum + data.likes + data.comments + data.shares, 0)
    },
    {
      platform: 'twitter' as Platform,
      followers: followerData
        .filter(data => data.platform === 'twitter')
        .reduce((max, data) => data.count > max ? data.count : max, 0),
      engagement: engagementData
        .filter(data => data.platform === 'twitter')
        .reduce((sum, data) => sum + data.likes + data.comments + data.shares, 0)
    },
    {
      platform: 'facebook' as Platform,
      followers: followerData
        .filter(data => data.platform === 'facebook')
        .reduce((max, data) => data.count > max ? data.count : max, 0),
      engagement: engagementData
        .filter(data => data.platform === 'facebook')
        .reduce((sum, data) => sum + data.likes + data.comments + data.shares, 0)
    }
  ];
  
  return {
    totalFollowers,
    followerGrowth,
    totalEngagement,
    engagementRate,
    topPosts,
    platformBreakdown
  };
};

// Generate all mock data
const followerData = generateFollowerData();
const engagementData = generateEngagementData();
const posts = generatePosts();
const analyticsSummary = generateAnalyticsSummary(followerData, engagementData, posts);

// Mock API service
export const mockSocialMediaService = {
  // Get all connected accounts
  getAccounts: (): Promise<SocialAccount[]> => {
    return Promise.resolve(mockAccounts);
  },
  
  // Get follower data for specified time range
  getFollowerData: (timeRange: TimeRange = '30d'): Promise<FollowerData[]> => {
    let filteredData = [...followerData];
    const today = new Date();
    
    switch(timeRange) {
      case '7d':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        filteredData = followerData.filter(data => new Date(data.date) >= sevenDaysAgo);
        break;
      case '30d':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        filteredData = followerData.filter(data => new Date(data.date) >= thirtyDaysAgo);
        break;
      case '90d':
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        filteredData = followerData.filter(data => new Date(data.date) >= ninetyDaysAgo);
        break;
      case 'ytd':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        filteredData = followerData.filter(data => new Date(data.date) >= startOfYear);
        break;
      // 'all' returns all data, no filtering needed
    }
    
    return Promise.resolve(filteredData);
  },
  
  // Get engagement data for specified time range
  getEngagementData: (timeRange: TimeRange = '30d'): Promise<EngagementData[]> => {
    let filteredData = [...engagementData];
    const today = new Date();
    
    switch(timeRange) {
      case '7d':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        filteredData = engagementData.filter(data => new Date(data.date) >= sevenDaysAgo);
        break;
      case '30d':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        filteredData = engagementData.filter(data => new Date(data.date) >= thirtyDaysAgo);
        break;
      case '90d':
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        filteredData = engagementData.filter(data => new Date(data.date) >= ninetyDaysAgo);
        break;
      case 'ytd':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        filteredData = engagementData.filter(data => new Date(data.date) >= startOfYear);
        break;
      // 'all' returns all data, no filtering needed
    }
    
    return Promise.resolve(filteredData);
  },
  
  // Get posts data
  getPosts: (limit: number = 10): Promise<PostData[]> => {
    return Promise.resolve(posts.slice(0, limit));
  },
  
  // Get analytics summary for specified time range
  getAnalyticsSummary: (timeRange: TimeRange = '30d'): Promise<AnalyticsSummary> => {
    // For simplicity, we'll just return the pre-generated summary
    // In a real implementation, this would filter based on the time range
    return Promise.resolve(analyticsSummary);
  },
  
  // Connect a new social media account (mock implementation)
  connectAccount: (platform: Platform, username: string): Promise<SocialAccount> => {
    const newAccount: SocialAccount = {
      id: `${platform}-${Date.now()}`,
      platform,
      username,
      profileUrl: `https://${platform}.com/${username}`,
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      isConnected: true,
      lastUpdated: new Date()
    };
    
    // In a real implementation, this would add the account to the database
    mockAccounts.push(newAccount);
    
    return Promise.resolve(newAccount);
  },
  
  // Disconnect a social media account (mock implementation)
  disconnectAccount: (accountId: string): Promise<boolean> => {
    const accountIndex = mockAccounts.findIndex(account => account.id === accountId);
    
    if (accountIndex !== -1) {
      mockAccounts[accountIndex].isConnected = false;
      return Promise.resolve(true);
    }
    
    return Promise.resolve(false);
  },
  
  // Export data to CSV (mock implementation)
  exportToCSV: (data: any[], filename: string): Promise<string> => {
    // In a real implementation, this would convert the data to CSV format
    // and return a download URL or trigger a download
    return Promise.resolve(`data:text/csv;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
  }
};