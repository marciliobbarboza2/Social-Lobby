import React, { useEffect } from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import NotFoundPage from '../NotFoundPage';

const SinglePostPage = () => {
  const { postsProps, viewProps } = useSocialLobbyContext();
  const { singlePost, singlePostLoading, handleLike, handleComment, handleDeletePost, handleDeleteComment, fetchSinglePost } = postsProps;
  const { setCurrentView } = viewProps;

  // Extract postId from URL or state, assuming it's passed via state or URL params
  // For simplicity, assume postId is in window.location or passed via props
  // In a real app, use React Router params
  const postId = window.location.pathname.split('/post/')[1]; // Assuming URL like /post/:id

  useEffect(() => {
    if (postId && !singlePost) {
      fetchSinglePost(postId);
    }
  }, [postId, singlePost, fetchSinglePost]);

  if (singlePostLoading) {
    return <div>Loading post...</div>;
  }

  if (!singlePost) {
    return <NotFoundPage />;
  }

  return (
    <div className="single-post-page">
      <button onClick={() => setCurrentView('feed')}>Back to Feed</button>
      <Post
        post={singlePost}
        handleLike={handleLike}
        handleComment={handleComment}
        handleDeletePost={handleDeletePost}
        handleDeleteComment={handleDeleteComment}
        {...postsProps}
      />
    </div>
  );
};

export default SinglePostPage;
