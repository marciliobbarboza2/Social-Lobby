import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <button className="not-found-btn" onClick={() => window.location.href = '/'}>
        Go to Feed
      </button>
    </div>
  );
};

export default NotFoundPage;
