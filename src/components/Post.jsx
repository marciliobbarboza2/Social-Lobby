
import React, { useState } from 'react';
import Comment from './Comment';

const Post = ({
  post,
  isLoggedIn,
  handleEditPost,
  handleDeletePost,
  editingPost,
  editContent,
  setEditContent,
  handleSavePost,
  handleCancelEdit,
  handleLike,
  toggleComments,
  showComments,
  newComment,
  setNewComment,
  handleComment,
  handleViewProfile,
  handleEditComment,
  handleDeleteComment,
  editingComment,
  handleSaveComment,
  onHide,
  onSaved,
  onToast,
  currentUser, // Add currentUser prop
}) => {
  // reactions picker removed (simplified Like UX)
  const [showMenu, setShowMenu] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const likesArray = Array.isArray(post.likes) ? post.likes : (typeof post.likes === 'number' ? Array(post.likes).fill(0) : []);
  const likeCount = Array.isArray(post.likes) ? post.likes.length : (typeof post.likes === 'number' ? post.likes : 0);
  const likedIds = likesArray.map(u => typeof u === 'string' ? u : u?._id);
  const isLiked = post.isLikedByCurrentUser || (isLoggedIn && likedIds.includes?.(post.currentUserId));
  
  // Check if current user is the post author
  const isPostAuthor = currentUser && post.authorId && (post.authorId === currentUser._id || post.author === currentUser.username);

  const handleAuthorClick = () => {
    // Try to pass authorId first, then fall back to author name
    const userIdentifier = post.authorId || post.author;
    console.log('🔥 [Post] Author clicked, passing identifier:', userIdentifier);
    handleViewProfile(userIdentifier);
  };

  const visibleComments = showAllComments ? post.comments : post.comments.slice(0, 2);
  const hasMoreComments = post.comments.length > 2 && !showAllComments;
  return (
    <article className="post">
      <div className="post-header">
        <div className="post-author">
          <img 
            src={post.avatar} 
            alt={`${post.author}'s avatar`} 
            className="author-avatar" 
            onClick={handleAuthorClick}
            style={{cursor: 'pointer'}}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleAuthorClick()}
            aria-label={`View ${post.author}'s profile`}
            onError={(e) => {
              console.log(`[Post] Avatar failed for ${post.author}:`, post.avatar);
              const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&size=50&background=3b82f6&color=fff&bold=true&rounded=true`;
              e.target.src = fallbackUrl;
            }}
          />
          <div className="author-info">
            <h4 
              className="author-name" 
              onClick={handleAuthorClick}
              style={{cursor: 'pointer'}}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleAuthorClick()}
            >
              {post.author}
            </h4>
            <span className="post-time">{post.time}</span>
          </div>
        </div>
        <div className="post-options">
          <button 
            className="more-btn" 
            onClick={() => setShowMenu(v => !v)}
            aria-label="Post options"
            aria-expanded={showMenu}
            aria-haspopup="true"
          >
            ⋯
          </button>
          {showMenu && (
            <div className="post-menu" onMouseLeave={() => setShowMenu(false)}>
              {isLoggedIn && isPostAuthor && (
                <>
                  <button className="menu-item" onClick={() => { handleEditPost(post.id, post.content); setShowMenu(false); }}>✏️ Edit</button>
                  <button className="menu-item" onClick={() => { handleDeletePost(post.id); setShowMenu(false); }}>🗑️ Delete</button>
                </>
              )}
              <button className="menu-item" onClick={() => { onSaved && onSaved(post); setShowMenu(false); }}>⭐ Save post</button>
              <button className="menu-item" onClick={() => { onHide && onHide(post.id); setShowMenu(false); }}>🙈 Hide post</button>
              <button className="menu-item" onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/post/${post.slug || post.id}`); onToast && onToast('Link copied', 'success'); setShowMenu(false); }}>🔗 Copy link</button>
              <button className="menu-item" onClick={() => { alert('Thanks for the report. We will review this post.'); setShowMenu(false); }}>🚩 Report post</button>
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        {editingPost === post.id ? (
          <div className="edit-section">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="edit-input"
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={() => handleSavePost(post.id)}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <p>{post.content}</p>
        )}
        {post.media && post.media.length > 0 && (
          <div className="post-media-gallery">
            {post.media.map((item, idx) => (
              <div key={idx} className="post-media-item">
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.alt || 'Post media'} 
                    className="post-media-image"
                    loading="lazy"
                  />
                ) : item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    poster={item.poster}
                    controls 
                    className="post-media-video"
                    preload="metadata"
                  >
                    Your browser does not support video playback.
                  </video>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {!post.media && post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post image" className="post-image-img" />
          </div>
        )}
      </div>

      <div className="post-stats">
        <span className="likes-count">
          {likeCount > 0 && `👍 ${likeCount} like${likeCount === 1 ? '' : 's'}`}
        </span>
        <span className="comments-count">
          {post.comments.length > 0 && `${post.comments.length} comment${post.comments.length === 1 ? '' : 's'}`}
        </span>
      </div>

      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => handleLike(post.id)}
          aria-label={isLiked ? `Unlike post by ${post.author}` : `Like post by ${post.author}`}
          aria-pressed={isLiked}
        >
          👍 Like
        </button>
        <button
          className="action-btn"
          onClick={() => toggleComments(post.id)}
          aria-label={`Comment on post by ${post.author}`}
          aria-expanded={showComments[post.id]}
        >
          💬 Comment
        </button>
        <button 
          className="action-btn"
          aria-label={`Share post by ${post.author}`}
        >
          ↗️ Share
        </button>
      </div>
      {/* Reactions picker hidden to keep Like simple for now */}

      {showComments[post.id] && (
        <div className="comments-section">
          <div className="add-comment">
            <img src="https://picsum.photos/seed/you/30" alt="You" className="user-avatar-small" />
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
              className="comment-input"
            />
            <button
              className="comment-btn"
              onClick={() => handleComment(post.id)}
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </div>
          <div className="comments-list">
            {visibleComments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                isLoggedIn={isLoggedIn}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                editingComment={editingComment}
                editContent={editContent}
                setEditContent={setEditContent}
                handleSaveComment={handleSaveComment}
                handleCancelEdit={handleCancelEdit}
                postId={post.id}
              />
            ))}
            {hasMoreComments && (
              <button className="view-more-comments" onClick={() => setShowAllComments(true)}>
                View more comments
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default Post;
