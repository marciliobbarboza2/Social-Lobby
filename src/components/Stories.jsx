import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Stories = () => {
  const { dataProps } = useSocialLobbyContext();
  const { stories, handleStoryClick } = dataProps;

  return (
    <div className="stories-section">
      <div className="stories-container">
        {stories.map(story => (
          <div
            key={story.id}
            className="story-item"
            onClick={() => handleStoryClick(story)}
          >
            <div className="story-avatar">
              <img src={story.avatar} alt={story.author} />
              <div className="story-ring"></div>
            </div>
            <span className="story-author">{story.author.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
