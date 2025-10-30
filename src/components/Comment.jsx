import React from 'react';

const Comment = ({
  comment,
  isLoggedIn,
  handleEditComment,
  handleDeleteComment,
  editingComment,
  editContent,
  setEditContent,
  handleSaveComment,
  handleCancelEdit,
  postId,
  currentUser,
  handleViewProfile,
  postAuthorId,
}) => {
  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await handleDeleteComment(postId, comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment. Please try again.');
      }
    }
  };

  return (
    <div key={comment.id} className="comment">
      <img src={comment.avatar} alt={comment.author} className="comment-avatar" onClick={() => handleViewProfile && handleViewProfile(comment.authorObject || comment.author)} style={{cursor: 'pointer', borderRadius: '50%'}} />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{comment.time}</span>
          {isLoggedIn && currentUser && (comment.authorId === currentUser._id || postAuthorId === currentUser._id) && (
            <div className="comment-actions">
              {comment.authorId === currentUser._id && (
                <button className="edit-comment-btn" onClick={() => handleEditComment(postId, comment.id, comment.content)} title="Edit comment">✏️</button>
              )}
              <button className="delete-comment-btn" onClick={handleDeleteClick} title="Delete comment">🗑️</button>
            </div>
          )}
        </div>
        {editingComment && editingComment.postId === postId && editingComment.commentId === comment.id ? (
          <div className="edit-section">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="edit-input"
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={() => handleSaveComment(postId, comment.id)}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="comment-text">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
