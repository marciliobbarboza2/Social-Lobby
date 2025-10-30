import React from 'react';
import Feed from '../views/Feed';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
  return (
    <div className="socialobby-main">
      <LeftSidebar />
      <div className="socialobby-content">
        <Feed />
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
