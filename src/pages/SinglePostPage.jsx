import React from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import NotFoundPage from '../NotFoundPage';

const SinglePostPage = () => {
  const { postsProps, authProps } = useSocialLobbyContext();
  const { singlePost, singlePostLoading } = postsProps;
  const { currentUser } = authProps;

  if (singlePostLoading) {
    return <div>Loading post...</div>;
  }

  if (!singlePost) {
    return <NotFoundPage />;
  }

  return (
    <div className="single-post-page">
      <Post
        post={singlePost}
        currentUser={currentUser}
        {...postsProps}
      />
    </div>
  );
};

export default SinglePostPage;
