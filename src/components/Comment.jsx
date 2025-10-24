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
}) => {
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      handleDeleteComment(postId, comment.id);
    }
  };

  return (
    <div key={comment.id} className="comment">
      <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{comment.time}</span>
          {isLoggedIn && comment.author === "You" && (
            <>
              <button className="edit-comment-btn" onClick={() => handleEditComment(postId, comment.id, comment.content)}>✏️</button>
              <button className="delete-comment-btn" onClick={handleDeleteClick}>🗑️</button>
            </>
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
