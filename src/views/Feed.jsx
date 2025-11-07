import React, { useState, useEffect, useRef } from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import CreatePost from '../components/CreatePost';
import Stories from '../components/Stories';
import PostSkeleton from '../components/PostSkeleton';

const Feed = () => {
  const { dataProps, postsProps, filterTopic, setFilterTopic, authProps } = useSocialLobbyContext();
  const { handleViewProfile, groupPostsByDate } = dataProps;
  const { currentUser } = authProps;
  const {
    posts,
    isFetching,
    hasNext,
    loadMore,
    editingPost,
    editContent,
    setEditContent,
    handleSavePost,
    handleCancelEdit,
    handleDeletePost,
    showComments,
    handleLike,
    newComment,
    setNewComment,
    handleComment,
    toggleComments,
    editingComment,
    handleEditComment,
    handleSaveComment,
    handleDeleteComment,
    handleEditPost,
  } = postsProps;

  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular'
  const [hiddenPostIds, setHiddenPostIds] = useState(new Set());
  const sentinelRef = useRef(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [posts]);

  // Infinite scroll sentinel
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNext && !isFetching) {
        loadMore();
      }
    }, { rootMargin: '200px' });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNext, isFetching, loadMore]);

  const getSortedPosts = (postsToSort) => {
    switch (sortBy) {
      case 'popular':
        return [...postsToSort].sort((a, b) => {
          const aLikes = Array.isArray(a.likes) ? a.likes.length : 0;
          const bLikes = Array.isArray(b.likes) ? b.likes.length : 0;
          return bLikes - aLikes;
        });
      case 'recent':
      default:
        return postsToSort;
    }
  };

  const basePosts = posts.filter(p => !hiddenPostIds.has(p.id));
  const filteredPosts = filterTopic 
    ? basePosts.filter(post => post.content.toLowerCase().includes(filterTopic.toLowerCase())) 
    : basePosts;

  const sortedPosts = getSortedPosts(filteredPosts);

  return (
    <main className="socialobby-content">
      {/* Stories Section */}
      <Stories />
      
      {/* Create Post Section */}
      <CreatePost />

      {/* Feed Controls */}
      <div className="feed-controls">
        <div className="feed-sort">
          <button 
            className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
            onClick={() => setSortBy('recent')}
          >
            📅 Recent
          </button>
          <button 
            className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
            onClick={() => setSortBy('popular')}
          >
            🔥 Popular
          </button>
        </div>
        {filterTopic && (
          <div className="feed-filter-info">
            Filtering by: <strong>{filterTopic}</strong>
            <button className="clear-filter-btn" onClick={() => setFilterTopic(null)}>Clear</button>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="posts-feed">
        {isLoading ? (
          <div className="feed-loading">
            {[...Array(3)].map((_, i) => <PostSkeleton key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="feed-empty-state">
            <div className="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community!</p>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="feed-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No posts found</h3>
            <p>{filterTopic ? `No posts match "${filterTopic}"` : 'Try adjusting your filters'}</p>
          </div>
        ) : (
          <div className="posts-container">
            {Object.entries(groupPostsByDate(sortedPosts)).map(([date, datePosts]) => (
              <div key={date} className="date-group">
                <div className="date-divider">
                  <span className="date-badge">{date}</span>
                </div>
                {datePosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    isLoggedIn={!!currentUser}
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    editingPost={editingPost}
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleSavePost={handleSavePost}
                    handleCancelEdit={handleCancelEdit}
                    handleLike={handleLike}
                    toggleComments={toggleComments}
                    showComments={showComments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleComment={handleComment}
                    handleViewProfile={handleViewProfile}
                    editingComment={editingComment}
                    handleEditComment={handleEditComment}
                    handleSaveComment={handleSaveComment}
                    handleDeleteComment={handleDeleteComment}
                    onHide={(postId) => setHiddenPostIds(prev => new Set(prev).add(postId))}
                  />
                ))}
              </div>
            ))}
            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} />
            {isFetching && hasNext && (
              <div className="feed-loading more">
                {[...Array(2)].map((_, i) => <PostSkeleton key={`more-${i}`} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Feed;
