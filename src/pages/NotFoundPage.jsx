import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const NotFoundPage = () => {
  const { viewProps } = useSocialLobbyContext();
  const { setCurrentView } = viewProps;

  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => setCurrentView('feed', null)}>Go to Feed</button>
    </div>
  );
};

export default NotFoundPage;
