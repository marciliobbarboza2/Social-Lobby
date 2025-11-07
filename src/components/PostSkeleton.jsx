import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="post skeleton">
      <div className="post-header">
        <div className="post-author">
          <div className="skeleton-avatar" />
          <div>
            <div className="skeleton-line short" />
            <div className="skeleton-line xshort" />
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
      <div className="post-image">
        <div className="skeleton-media" />
      </div>
      <div className="post-actions">
        <div className="skeleton-button" />
        <div className="skeleton-button" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
};

export default PostSkeleton;
