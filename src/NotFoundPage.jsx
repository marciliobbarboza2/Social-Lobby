import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const NotFoundPage = () => {
  const { viewProps } = useSocialLobbyContext();
  const { setCurrentView } = viewProps;

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <button className="not-found-btn" onClick={() => setCurrentView('feed', null)}>
        Go to Feed
      </button>
    </div>
  );
};

export default NotFoundPage;