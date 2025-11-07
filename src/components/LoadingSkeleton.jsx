import React from 'react';

export const PostSkeleton = () => (
  <div className="post-skeleton skeleton-animate">
    <div className="post-skeleton-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-author-info">
        <div className="skeleton-name"></div>
        <div className="skeleton-time"></div>
      </div>
    </div>
    <div className="skeleton-title"></div>
    <div className="skeleton-content"></div>
    <div className="skeleton-content short"></div>
    <div className="post-skeleton-actions">
      <div className="skeleton-action-btn"></div>
      <div className="skeleton-action-btn"></div>
      <div className="skeleton-action-btn"></div>
    </div>
  </div>
);

export const FeedSkeleton = () => (
  <div className="feed-skeleton">
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </div>
);

export const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">{text}</p>
  </div>
);

export default { PostSkeleton, FeedSkeleton, LoadingSpinner };
