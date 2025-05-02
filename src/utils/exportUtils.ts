/**
 * Utility functions for exporting data from the social media dashboard
 */

import { FollowerData, EngagementData, PostData, ExportFormat } from '../types';

// Convert array of objects to CSV string
export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) {
    return '';
  }
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return headers.map(header => {
      const value = item[header];
      
      // Handle different data types
      if (value === null || value === undefined) {
        return '';
      }
      
      if (value instanceof Date) {
        return value.toISOString();
      }
      
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Escape quotes and wrap in quotes if the value contains commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(',');
  }).join('\n');
  
  // Combine header and rows
  return `${headerRow}\n${rows}`;
};

// Download CSV file
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export follower data to CSV
export const exportFollowerData = (data: FollowerData[], filename: string = 'follower-data.csv'): void => {
  // Format data for CSV export
  const formattedData = data.map(item => ({
    Date: item.date instanceof Date ? item.date.toISOString() : item.date,
    Platform: item.platform,
    AccountID: item.accountId,
    FollowerCount: item.count
  }));
  
  const csvContent = convertToCSV(formattedData);
  downloadCSV(csvContent, filename);
};

// Export engagement data to CSV
export const exportEngagementData = (data: EngagementData[], filename: string = 'engagement-data.csv'): void => {
  // Format data for CSV export
  const formattedData = data.map(item => ({
    Date: item.date instanceof Date ? item.date.toISOString() : item.date,
    Platform: item.platform,
    AccountID: item.accountId,
    Likes: item.likes,
    Comments: item.comments,
    Shares: item.shares,
    TotalEngagement: item.likes + item.comments + item.shares
  }));
  
  const csvContent = convertToCSV(formattedData);
  downloadCSV(csvContent, filename);
};

// Export post data to CSV
export const exportPostData = (data: PostData[], filename: string = 'post-data.csv'): void => {
  // Format data for CSV export
  const formattedData = data.map(item => ({
    ID: item.id,
    Platform: item.platform,
    AccountID: item.accountId,
    Content: item.content,
    PostURL: item.postUrl,
    PublishDate: item.publishDate instanceof Date ? item.publishDate.toISOString() : item.publishDate,
    Likes: item.likes,
    Comments: item.comments,
    Shares: item.shares,
    EngagementRate: item.engagement.toFixed(2) + '%'
  }));
  
  const csvContent = convertToCSV(formattedData);
  downloadCSV(csvContent, filename);
};

// Export data based on format
export const exportData = (data: any[], format: ExportFormat, filename: string): void => {
  switch (format) {
    case 'csv':
      const csvContent = convertToCSV(data);
      downloadCSV(csvContent, `${filename}.csv`);
      break;
    case 'json':
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      break;
    case 'pdf':
      // PDF export would typically use a library like jsPDF
      // This is a placeholder for where that implementation would go
      console.log('PDF export not implemented in this demo');
      alert('PDF export would be implemented with a library like jsPDF');
      break;
    default:
      console.error('Unsupported export format');
  }
};