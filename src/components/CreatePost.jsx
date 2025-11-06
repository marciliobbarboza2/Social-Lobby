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
  const [taggedFriends, setTaggedFriends] = useState([]);
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
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

  const handleTagFriends = () => {
    setShowTagModal(true);
  };

  const handleFeelingActivity = () => {
    setShowFeelingModal(true);
  };

  const handleCheckIn = () => {
    setShowLocationModal(true);
  };

  const handleTagFriend = (friend) => {
    if (!taggedFriends.includes(friend)) {
      setTaggedFriends([...taggedFriends, friend]);
    }
    setShowTagModal(false);
  };

  const handleSelectFeeling = (selectedFeeling) => {
    setFeeling(selectedFeeling);
    setShowFeelingModal(false);
  };

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
  };

  const removeTag = (friend) => {
    setTaggedFriends(taggedFriends.filter(f => f !== friend));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Backend requires title field, so we'll use first 50 chars as title
      const title = content.length > 50 ? content.substring(0, 47) + '...' : content;
      const postData = {
        title,
        content
      };

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
        {/* Tagged Friends Display */}
        {taggedFriends.length > 0 && (
          <div className="tagged-friends">
            <span>With: </span>
            {taggedFriends.map((friend, index) => (
              <span key={friend} className="tagged-friend">
                {friend}
                <button type="button" onClick={() => removeTag(friend)}>×</button>
                {index < taggedFriends.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}

        {/* Feeling/Activity Display */}
        {feeling && (
          <div className="feeling-display">
            <span>Feeling {feeling}</span>
          </div>
        )}

        {/* Location Display */}
        {location && (
          <div className="location-display">
            <span>📍 {location}</span>
          </div>
        )}

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
          <button className="option-btn" type="button" onClick={handleTagFriends}>
            👥 Tag Friends
          </button>
          <button className="option-btn" type="button" onClick={handleFeelingActivity}>
            😊 Feeling/Activity
          </button>
          <button className="option-btn" type="button" onClick={handleCheckIn}>
            📍 Check In
          </button>
        </div>
        {/* Modals */}
        {showTagModal && (
          <div className="modal-overlay" onClick={() => setShowTagModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Tag Friends</h3>
              <div className="friends-list">
                {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'].map(friend => (
                  <div key={friend} className="friend-item" onClick={() => handleTagFriend(friend)}>
                    <img src={`https://picsum.photos/seed/${friend}/40`} alt={friend} />
                    <span>{friend}</span>
                  </div>
                ))}
              </div>
              <button className="close-modal-btn" onClick={() => setShowTagModal(false)}>Close</button>
            </div>
          </div>
        )}

        {showFeelingModal && (
          <div className="modal-overlay" onClick={() => setShowFeelingModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>How are you feeling?</h3>
              <div className="feelings-grid">
                {['Happy', 'Sad', 'Excited', 'Tired', 'Grateful', 'Angry', 'Loved', 'Stressed'].map(feelingOption => (
                  <button
                    key={feelingOption}
                    className="feeling-btn"
                    onClick={() => handleSelectFeeling(feelingOption)}
                  >
                    {feelingOption}
                  </button>
                ))}
              </div>
              <button className="close-modal-btn" onClick={() => setShowFeelingModal(false)}>Close</button>
            </div>
          </div>
        )}

        {showLocationModal && (
          <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Check In</h3>
              <input
                type="text"
                placeholder="Where are you?"
                className="location-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSelectLocation(e.target.value);
                  }
                }}
              />
              <div className="popular-locations">
                <h4>Popular Locations</h4>
                {['Home', 'Work', 'School', 'Restaurant', 'Park', 'Gym'].map(locationOption => (
                  <button
                    key={locationOption}
                    className="location-btn"
                    onClick={() => handleSelectLocation(locationOption)}
                  >
                    📍 {locationOption}
                  </button>
                ))}
              </div>
              <button className="close-modal-btn" onClick={() => setShowLocationModal(false)}>Close</button>
            </div>
          </div>
        )}

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
