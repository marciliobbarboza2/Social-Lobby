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
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      image: null,
      time: 'now',
      caption: 'Add your story',
      isCurrentUser: true
    },
    ...stories.map(story => ({
      ...story,
      // Ensure avatar URLs are properly formatted
      avatar: story.avatar || `https://images.unsplash.com/photo-${story.id}?w=100&h=100&fit=crop&crop=face`
    }))
  ];

  console.log('Stories data:', allStories); // Debug log

  return (
    <div className="stories-section">
      <div className="stories-container">
        {allStories.map(story => (
          <div
            key={story.id}
            className={`story-item ${story.id === 'current-user' ? 'current-user-story' : ''}`}
            onClick={() => handleStoryClick && handleStoryClick(story)}
            title={story.caption || story.author}
          >
            <div className="story-avatar">
              <img 
                src={story.avatar} 
                alt={story.author}
                onError={(e) => {
                  console.log(`[Stories] Avatar failed for ${story.author}:`, story.avatar);
                  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(story.author)}&size=100&background=3b82f6&color=fff&bold=true&rounded=true`;
                  console.log(`[Stories] Using fallback:`, fallbackUrl);
                  e.target.src = fallbackUrl;
                }}
                onLoad={() => console.log(`[Stories] Avatar loaded for ${story.author}`)}
                loading="lazy"
              />
              <div className="story-ring"></div>
              {story.id === 'current-user' && (
                <div className="add-story-icon">+</div>
              )}
            </div>
            <span className="story-author">
              {story.id === 'current-user' ? 'Your story' : (story.author.split(' ')[0] || story.author)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
