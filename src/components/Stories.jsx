import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Stories = () => {
  const { dataProps, authProps } = useSocialLobbyContext();
  const { stories, handleStoryClick } = dataProps;
  const { currentUser } = authProps;

  // Add current user as first story (like Instagram)
  const allStories = [
    {
      id: 'current-user',
      author: currentUser?.firstName + ' ' + currentUser?.lastName || currentUser?.username || 'You',
      userId: currentUser?._id || 'current',
      avatar: currentUser?.avatar || 'https://picsum.photos/seed/you/50',
      image: null, // No image for current user story
      time: 'now',
      caption: 'Add your story'
    },
    ...stories
  ];

  return (
    <div className="stories-section">
      <div className="stories-container">
        {allStories.map(story => (
          <div
            key={story.id}
            className={`story-item ${story.id === 'current-user' ? 'current-user-story' : ''}`}
            onClick={() => handleStoryClick(story)}
          >
            <div className="story-avatar">
              <img src={story.avatar} alt={story.author} />
              <div className="story-ring"></div>
              {story.id === 'current-user' && (
                <div className="add-story-icon">+</div>
              )}
            </div>
            <span className="story-author">
              {story.id === 'current-user' ? 'Your story' : story.author.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
