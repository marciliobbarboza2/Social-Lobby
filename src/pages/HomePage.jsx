import React from 'react';
import Feed from '../views/Feed';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
  return (
    <div className="facebook-main">
      <LeftSidebar />
      <div className="facebook-content">
        <Feed />
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
