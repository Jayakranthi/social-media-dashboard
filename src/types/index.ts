// Social Media Platform Types
export type Platform = 'instagram' | 'twitter' | 'facebook';

// User Account Type
export interface SocialAccount {
  id: string;
  platform: Platform;
  username: string;
  profileUrl: string;
  profileImage?: string;
  isConnected: boolean;
  lastUpdated: Date;
}

// Follower Data Type
export interface FollowerData {
  date: Date;
  count: number;
  platform: Platform;
  accountId: string;
}

// Engagement Data Type
export interface EngagementData {
  date: Date;
  likes: number;
  comments: number;
  shares: number;
  platform: Platform;
  accountId: string;
}

// Post Data Type
export interface PostData {
  id: string;
  platform: Platform;
  accountId: string;
  content: string;
  imageUrl?: string;
  postUrl: string;
  publishDate: Date;
  likes: number;
  comments: number;
  shares: number;
  engagement: number; // Calculated engagement rate
}

// Dashboard Analytics Summary
export interface AnalyticsSummary {
  totalFollowers: number;
  followerGrowth: number; // Percentage growth
  totalEngagement: number;
  engagementRate: number; // Percentage
  topPosts: PostData[];
  platformBreakdown: {
    platform: Platform;
    followers: number;
    engagement: number;
  }[];
}

// Time Range for Analytics
export type TimeRange = '7d' | '30d' | '90d' | 'ytd' | 'all';

// Export Format
export type ExportFormat = 'csv' | 'pdf' | 'json';