import React from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import CreatePost from '../components/CreatePost';
import Stories from '../components/Stories';

const Feed = () => {
  const { dataProps, postsProps, filterTopic } = useSocialLobbyContext();
  const { handleViewProfile, groupPostsByDate } = dataProps;
  const {
    posts,
    editingPost,
    editContent,
    setEditContent,
    handleSavePost,
    handleCancelEdit,
    handleDeletePost,
    showComments,
    handleLike,
    newComment,
    setNewComment,
    handleComment,
    toggleComments,
    editingComment,
    handleEditComment,
    handleSaveComment,
    handleDeleteComment,
    handleEditPost,
  } = postsProps;

  return (
    <main className="socialobby-content">
      <Stories />
      <CreatePost />

      <div className="posts-feed">
        {(() => {
          const filteredPosts = filterTopic ? posts.filter(post => post.content.includes(filterTopic)) : posts;
          return filteredPosts.length === 0 ? (
            <p>{filterTopic ? `No posts found for ${filterTopic}.` : 'No posts to show. Start sharing!'}</p>
          ) : (
            Object.entries(groupPostsByDate(filteredPosts)).map(([date, datePosts]) => (
              <div key={date} className="date-group">
                <h4 className="date-header">{date}</h4>
                {datePosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    editingPost={editingPost}
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleSavePost={handleSavePost}
                    handleCancelEdit={handleCancelEdit}
                    handleLike={handleLike}
                    toggleComments={toggleComments}
                    showComments={showComments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleComment={handleComment}
                    handleViewProfile={handleViewProfile}
                    editingComment={editingComment}
                    handleEditComment={handleEditComment}
                    handleSaveComment={handleSaveComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </div>
            ))
          );
        })()}
      </div>
    </main>
  );
};

export default Feed;
