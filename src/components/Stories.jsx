import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import { users } from '../data/users';

const Stories = () => {
  const { dataProps, authProps } = useSocialLobbyContext();
  const { stories } = dataProps;
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

  // Get all users for stories (excluding current user)
  const allUsers = users
    .filter(user => user._id !== currentUser?._id)
    .map(user => ({
      id: user._id,
      author: user.name,
      userId: user._id,
      avatar: user.avatar,
      image: null, // No image for profile stories
      time: 'now',
      caption: 'View profile'
    }));

  const allDisplayStories = [...allStories, ...allUsers];

  const handleStoryClickInternal = (story) => {
    if (story.userId === 'current') {
      // Handle current user story (add story functionality)
      console.log('Add story clicked');
    } else {
      // Navigate to user profile
      dataProps.setSelectedUser(story.userId);
      dataProps.setCurrentView('profile');
    }
  };

  return (
    <div className="stories-section">
      <div className="stories-container">
        {allDisplayStories.map(story => (
          <div
            key={story.id}
            className={`story-item ${story.id === 'current-user' ? 'current-user-story' : ''}`}
            onClick={() => handleStoryClickInternal(story)}
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
