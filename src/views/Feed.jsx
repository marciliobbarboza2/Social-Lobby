import React, { useState, useEffect, useRef } from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import CreatePost from '../components/CreatePost';
import Stories from '../components/Stories';
import { FeedSkeleton } from '../components/LoadingSkeleton';
import Toast from '../Toast';
import PullToRefresh from 'react-pull-to-refresh';

const Feed = () => {
  const { dataProps, postsProps, filterTopic, setFilterTopic, authProps } = useSocialLobbyContext();
  const { handleViewProfile, groupPostsByDate } = dataProps;
  const { currentUser } = authProps;
  const {
    posts,
    isFetching,
    hasNext,
    loadMore,
    refreshPosts,
    checkForNewPosts,
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
  const [newCount, setNewCount] = useState(0);
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [toasts, setToasts] = useState([]);

  // Load saved post ids on mount
  useEffect(() => {
    try {
      const key = 'savedPostIds';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      setSavedIds(new Set(list));
    } catch (err) {
      console.error('Failed to load saved posts', err);
    }
  }, []);

  const pushToast = (message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

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

  // Poll for new posts every 30s
  useEffect(() => {
    const id = setInterval(async () => {
      const count = await checkForNewPosts();
      setNewCount(count);
    }, 30000);
    return () => clearInterval(id);
  }, [checkForNewPosts]);

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
  const savedFiltered = savedOnly ? filteredPosts.filter(p => savedIds.has(p.id)) : filteredPosts;
  const sortedPosts = getSortedPosts(savedFiltered);

  return (
    <main className="socialobby-content">
      {/* Stories Section */}
      <Stories />
      
      {/* Create Post Section */}
      <CreatePost />

      {/* New posts banner */}
      {newCount > 0 && (
        <div className="new-posts-banner" onClick={async () => { await refreshPosts(); setNewCount(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          Show {newCount} new post{newCount === 1 ? '' : 's'}
        </div>
      )}

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
        <div className="feed-sort">
          <button 
            className={`sort-btn ${savedOnly ? 'active' : ''}`}
            onClick={() => setSavedOnly(v => !v)}
            title="Toggle saved posts filter"
          >
            ⭐ Saved
          </button>
        </div>
      </div>

      {/* Posts Feed with Pull-To-Refresh */}
      <div className="posts-feed">
        <PullToRefresh onRefresh={async () => { await refreshPosts(); setNewCount(0); }}>
        {isLoading ? (
          <FeedSkeleton />
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
                    currentUser={currentUser}
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
                    onHide={(postId) => { setHiddenPostIds(prev => new Set(prev).add(postId)); pushToast('Post hidden', 'info'); }}
                    onToast={(msg, type) => pushToast(msg, type)}
                    onSaved={(p) => {
                      try {
                        const key = 'savedPostIds';
                        const existing = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
                        let message = 'Saved post';
                        if (existing.has(p.id)) { existing.delete(p.id); message = 'Removed from Saved'; }
                        else { existing.add(p.id); }
                        const updated = Array.from(existing);
                        localStorage.setItem(key, JSON.stringify(updated));
                        setSavedIds(new Set(updated));
                        pushToast(message, 'success');
                      } catch (err) {
                        console.error('Failed to update saved posts', err);
                        pushToast('Failed to update saved posts', 'error');
                      }
                    }}
                  />
                ))}
              </div>
            ))}
            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} />
            {isFetching && hasNext && (
              <FeedSkeleton />
            )}
          </div>
        )}
        </PullToRefresh>
      </div>

      {/* Toasts */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(t => (
            <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} duration={3000} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Feed;
