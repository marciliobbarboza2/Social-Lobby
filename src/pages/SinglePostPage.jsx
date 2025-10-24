import React from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import NotFoundPage from '../NotFoundPage';

const SinglePostPage = () => {
  const { postsProps } = useSocialLobbyContext();
  const { singlePost, singlePostLoading, handleLike, handleComment, handleDeletePost, handleDeleteComment } = postsProps;

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
        {...postsProps}
      />
    </div>
  );
};

export default SinglePostPage;
