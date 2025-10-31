import React, { useState, useRef } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const CreatePost = () => {
  const { postsProps, authProps } = useSocialLobbyContext();
  const { handlePost } = postsProps;
  const { currentUser } = authProps;
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedVideo(null); // Clear video if image selected
      setVideoPreview(null);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      setSelectedImage(null); // Clear image if video selected
      setImagePreview(null);
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    setImagePreview(null);
    setVideoPreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const postData = { content };

      // Convert file to base64 for demo purposes
      // In production, you'd upload to a cloud storage service
      if (selectedImage) {
        postData.image = imagePreview;
      }
      if (selectedVideo) {
        postData.video = videoPreview;
      }

      await handlePost(postData);
      setContent('');
      handleRemoveMedia();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <div className="post-composer">
        <div className="composer-header">
          <img src={currentUser?.avatar || "https://picsum.photos/seed/you/40"} alt="You" className="user-avatar" />
          <div className="composer-input">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="post-input"
              required
            />
          </div>
        </div>
        {/* Media Preview */}
        {(imagePreview || videoPreview) && (
          <div className="media-preview">
            {imagePreview && (
              <div className="preview-container">
                <img src={imagePreview} alt="Preview" className="media-preview-img" />
                <button type="button" className="remove-media-btn" onClick={handleRemoveMedia}>✕</button>
              </div>
            )}
            {videoPreview && (
              <div className="preview-container">
                <video src={videoPreview} controls className="media-preview-video" />
                <button type="button" className="remove-media-btn" onClick={handleRemoveMedia}>✕</button>
              </div>
            )}
          </div>
        )}

        <div className="composer-options">
          <div className="media-upload-section">
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoSelect}
              accept="video/*"
              style={{ display: 'none' }}
            />
            <button
              className="option-btn"
              type="button"
              onClick={() => imageInputRef.current?.click()}
            >
              📷 Photo
            </button>
            <button
              className="option-btn"
              type="button"
              onClick={() => videoInputRef.current?.click()}
            >
              🎥 Video
            </button>
          </div>
          <button className="option-btn" type="button">
            👥 Tag Friends
          </button>
          <button className="option-btn" type="button">
            😊 Feeling/Activity
          </button>
          <button className="option-btn" type="button">
            📍 Check In
          </button>
        </div>
        <div className="composer-actions">
          <button type="submit" className="post-btn" disabled={!content.trim() || isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
