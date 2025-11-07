import React, { useState } from 'react';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        console.log('🗑️ [Comment] Starting delete process...');
        await handleDeleteComment(postId, comment.id);
        console.log('🗑️ [Comment] Delete successful!');
      } catch (error) {
        console.error('🗑️ [Comment] Delete failed:', error);
        alert('Failed to delete comment. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSaveClick = async () => {
    if (!editContent.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    
    setIsSaving(true);
    try {
      console.log('✏️ [Comment] Starting save process...');
      await handleSaveComment(postId, comment.id);
      console.log('✏️ [Comment] Save successful!');
    } catch (error) {
      console.error('✏️ [Comment] Save failed:', error);
      alert('Failed to save comment. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCommentAuthorClick = () => {
    if (!handleViewProfile) {
      console.log('💬 [Comment] handleViewProfile not provided, cannot navigate');
      return;
    }
    // Try authorObject if present, then explicit authorId, then fall back to author string
    const userIdentifier = comment.authorObject || comment.authorId || comment.author;
    console.log('💬 [Comment] Author clicked, passing identifier:', userIdentifier);
    handleViewProfile(userIdentifier);
  };

  // Check if current user can edit/delete this comment
  const canEdit = isLoggedIn && currentUser && (comment.authorId === currentUser._id || comment.authorObject?._id === currentUser._id);
  const canDelete = isLoggedIn && currentUser && (
    comment.authorId === currentUser._id ||
    comment.authorObject?._id === currentUser._id ||
    postAuthorId === currentUser._id
  );

  return (
    <div key={comment.id} className="comment">
      <img 
        src={comment.avatar} 
        alt={`${comment.author}'s avatar`} 
        className="comment-avatar" 
        onClick={handleCommentAuthorClick}
        style={{cursor: 'pointer', borderRadius: '50%'}}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleCommentAuthorClick()}
        aria-label={`View ${comment.author}'s profile`}
        onError={(e) => {
          console.log(`[Comment] Avatar failed for ${comment.author}:`, comment.avatar);
          const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&size=40&background=3b82f6&color=fff&bold=true&rounded=true`;
          e.target.src = fallbackUrl;
        }}
      />
      <div className="comment-content">
        <div className="comment-header">
          <span
            className="comment-author"
            onClick={handleCommentAuthorClick}
            style={{cursor: 'pointer'}}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCommentAuthorClick()}
            aria-label={`View ${comment.author}'s profile`}
          >
            {comment.author}
          </span>
          <span className="comment-time">{comment.time}</span>
          {canDelete && (
            <div className="comment-actions">
              {canEdit && (
                <button 
                  className="edit-comment-btn" 
                  onClick={() => handleEditComment(postId, comment.id, comment.content)} 
                  title="Edit comment"
                  aria-label="Edit comment"
                  disabled={isDeleting}
                >
                  ✏️
                </button>
              )}
              <button 
                className="delete-comment-btn" 
                onClick={handleDeleteClick} 
                title="Delete comment"
                aria-label="Delete comment"
                disabled={isDeleting || isSaving}
              >
                {isDeleting ? '⏳' : '🗑️'}
              </button>
            </div>
          )}
        </div>
        {editingComment && editingComment.postId === postId && editingComment.commentId === comment.id ? (
          <div className="edit-section">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="edit-input"
              placeholder="Edit your comment..."
              maxLength={500}
            />
            <div className="edit-actions">
              <button 
                className="save-btn" 
                onClick={handleSaveClick}
                disabled={isSaving || !editContent.trim()}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button 
                className="cancel-btn" 
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
            <div className="character-count">
              {editContent.length}/500
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
