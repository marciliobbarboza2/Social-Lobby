import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const CreatePost = () => {
  const { postsProps, authProps } = useSocialLobbyContext();
  const { handlePost } = postsProps;
  const { currentUser } = authProps;
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handlePost({ content });
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <div className="post-composer">
        <div className="composer-input">
          <img src={currentUser?.avatar || "https://picsum.photos/seed/you/40"} alt="You" className="user-avatar" />
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="post-input"
              required
            />
            <div className="composer-actions">
              <button type="submit" className="post-btn" disabled={!content.trim() || isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Share'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
