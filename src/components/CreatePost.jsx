import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const CreatePost = () => {
  const { postsProps, authProps } = useSocialLobbyContext();
  const { handlePost } = postsProps;
  const { currentUser } = authProps;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔵 CreatePost: handleSubmit called');
    console.log('🔵 Title:', title, '| Content:', content);
    console.log('🔵 Token exists:', !!localStorage.getItem('token'));
    
    if (!title.trim() || !content.trim() || isSubmitting) {
      console.warn('⚠️ Form validation failed or already submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('🔵 Calling handlePost...');
      await handlePost({ title, content });
      setTitle('');
      setContent('');
      setIsExpanded(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      console.log('✅ Post created successfully');
    } catch (error) {
      console.error('❌ Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className="create-post">
      {showSuccess && (
        <div className="post-success-banner">
          ✅ Post shared successfully!
        </div>
      )}
      <div className="post-composer">
        <div className="composer-header">
          <img 
            src={currentUser?.avatar || "https://picsum.photos/seed/you/40"} 
            alt={currentUser?.name || "You"} 
            className="user-avatar" 
          />
          {!isExpanded ? (
            <div 
              className="composer-placeholder"
              onClick={() => setIsExpanded(true)}
            >
              What's on your mind, {currentUser?.firstName || 'there'}?
            </div>
          ) : (
            <span className="composer-username">{currentUser?.fullName || 'You'}</span>
          )}
        </div>

        {isExpanded && (
          <form onSubmit={handleSubmit} className="composer-form">
            <input
              type="text"
              placeholder="Give your post a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="post-title-input"
              autoFocus
              required
            />
            <textarea
              placeholder="Share your thoughts, ideas, or updates..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="post-content-input"
              rows="4"
              required
            />
            <div className="composer-actions">
              <div className="composer-media-buttons">
                <button type="button" className="media-btn" title="Add Photo">
                  📷 Photo
                </button>
                <button type="button" className="media-btn" title="Add Video">
                  📹 Video
                </button>
                <button type="button" className="media-btn" title="Add Feeling">
                  😊 Feeling
                </button>
              </div>
              <div className="composer-submit-buttons">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="post-btn" 
                  disabled={!title.trim() || !content.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner"></span> Posting...
                    </>
                  ) : (
                    <>📤 Share</>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
