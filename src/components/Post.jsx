import React from 'react';
import Comment from './Comment';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Post = ({
  post,
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
}) => {
  const { authProps, viewProps, postsProps } = useSocialLobbyContext();
  const { currentUser, isLoggedIn } = authProps;
  const { setCurrentView } = viewProps;
  const { fetchSinglePost } = postsProps;

  const handleDeletePostClick = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      handleDeletePost(post.id);
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-author">
          <img src={post.avatar} alt={post.author} className="author-avatar" onClick={() => handleViewProfile(post.authorObject)} style={{cursor: 'pointer', borderRadius: '50%'}} />
          <div className="author-info">
            <h4 className="author-name" onClick={() => handleViewProfile(post.authorObject)} style={{cursor: 'pointer'}}>{post.author}</h4>
            <span className="post-time">{post.time}</span>
          </div>
        </div>
        <div className="post-options">
          {currentUser?._id === post.authorId && (
            <>
              <button className="edit-btn" onClick={() => handleEditPost(post.id, post.content)}>✏️ Edit</button>
              <button className="delete-btn" onClick={handleDeletePostClick}>🗑️ Delete</button>
            </>
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
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post image" className="post-image-img" />
          </div>
        )}
        {post.video && (
          <div className="post-video">
            <video src={post.video} controls className="post-video-player" />
          </div>
        )}
      </div>

      <div className="post-stats">
        <span className="likes-count">
          👍 {post.likes.length} likes
        </span>
        <span className="comments-count">
          {post.comments.length} comments
        </span>
      </div>

      <div className="post-actions">
        <button className="action-btn" onClick={() => {
          const postUrl = `${window.location.origin}/post/${post.id}`;
          const postTitle = `Check out this post by ${post.author}`;

          if (navigator.share) {
            navigator.share({
              title: postTitle,
              text: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
              url: postUrl,
            }).catch(err => {
              console.error('Error sharing:', err);
              // Fallback to clipboard
              navigator.clipboard.writeText(postUrl).then(() => {
                alert('Post link copied to clipboard!');
              }).catch(() => {
                alert('Unable to share or copy link.');
              });
            });
          } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(postUrl).then(() => {
              alert('Post link copied to clipboard!');
            }).catch(err => {
              console.error('Failed to copy: ', err);
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = postUrl;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              alert('Post link copied to clipboard!');
            });
          }
        }}>🔗 Share</button>
        <button
          className={`action-btn like-btn ${post.isLikedByCurrentUser ? 'liked' : ''}`}
          onClick={() => handleLike(post.id)}
          title={post.isLikedByCurrentUser ? 'Unlike this post' : 'Like this post'}
        >
          {post.isLikedByCurrentUser ? '❤️' : '🤍'}
        </button>
        <button
          className="action-btn"
          onClick={() => toggleComments(post.id)}
        >
          💬 Comment
        </button>
        <button className="action-btn" onClick={() => {
          fetchSinglePost(post.id);
          setCurrentView('singlePost');
          // Update URL for single post
          window.history.pushState({}, '', `/post/${post.id}`);
        }}>📤 View</button>
      </div>

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
            {post.comments.map(comment => (
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
                handleViewProfile={handleViewProfile}
                postAuthorId={post.authorId}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default Post;
