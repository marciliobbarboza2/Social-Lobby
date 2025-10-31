import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Stories = () => {
  const { dataProps, authProps } = useSocialLobbyContext();
  const { stories, handleStoryClick, handleViewProfile } = dataProps;
  const { currentUser } = authProps;
  const [selectedStory, setSelectedStory] = useState(null);

  // Add current user as first story (like Instagram)
  const allStories = [
    {
      id: 'current-user',
      author: currentUser?.firstName + ' ' + currentUser?.lastName || currentUser?.username || 'You',
      userId: currentUser?._id || 'current',
      avatar: currentUser?.avatar || 'https://picsum.photos/seed/you/50',
      type: 'add',
      time: 'now',
      caption: 'Add your story'
    },
    ...stories
  ];

  const handleStorySelect = (story) => {
    if (story.id === 'current-user') {
      // Handle add story functionality
      return;
    }
    setSelectedStory(story);
  };

  const handleAuthorClick = (e, story) => {
    e.stopPropagation();
    if (story.id !== 'current-user') {
      handleViewProfile(story.author);
    }
  };

  const renderMediaContent = (story) => {
    switch (story.type) {
      case 'photo':
        return <img src={story.media} alt={story.caption} className="story-media" />;
      case 'video':
        return (
          <video className="story-media" controls>
            <source src={story.media} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'music':
        return (
          <div className="story-media music-media">
            <div className="music-info">
              <div className="music-icon">🎵</div>
              <div className="music-details">
                <h4>{story.songTitle}</h4>
                <p>{story.artist}</p>
              </div>
            </div>
            <audio controls className="audio-player">
              <source src={story.media} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      default:
        return <img src={story.media} alt={story.caption} className="story-media" />;
    }
  };

  return (
    <>
      <div className="stories-section">
        <div className="stories-container">
          {allStories.map(story => (
            <div
              key={story.id}
              className={`story-item ${story.id === 'current-user' ? 'current-user-story' : ''}`}
              onClick={() => handleStorySelect(story)}
            >
              <div className="story-avatar">
                <img src={story.avatar} alt={story.author} />
                <div className="story-ring"></div>
                {story.id === 'current-user' && (
                  <div className="add-story-icon">+</div>
                )}
                {story.type === 'video' && <div className="media-indicator video">▶</div>}
                {story.type === 'music' && <div className="media-indicator music">♪</div>}
              </div>
              <span
                className="story-author"
                onClick={(e) => handleAuthorClick(e, story)}
                style={{ cursor: story.id !== 'current-user' ? 'pointer' : 'default' }}
              >
                {story.id === 'current-user' ? 'Your story' : story.author.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="story-modal" onClick={() => setSelectedStory(null)}>
          <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="story-modal-header">
              <img src={selectedStory.avatar} alt={selectedStory.author} className="story-modal-avatar" />
              <span
                className="story-modal-author"
                onClick={() => handleViewProfile(selectedStory.author)}
                style={{ cursor: 'pointer' }}
              >
                {selectedStory.author}
              </span>
              <span className="story-modal-time">{selectedStory.time}</span>
              <button className="story-modal-close" onClick={() => setSelectedStory(null)}>×</button>
            </div>
            <div className="story-modal-media">
              {renderMediaContent(selectedStory)}
            </div>
            <div className="story-modal-caption">
              <p>{selectedStory.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
