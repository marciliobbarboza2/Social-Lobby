import React from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Feed = () => {
  const { dataProps, postsProps } = useSocialLobbyContext();
  const { handleViewProfile, getTodaysBirthdays, getUpcomingEvents } = dataProps;
  const {
    posts,
    newPost,
    setNewPost,
    handlePost,
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
    groupPostsByDate,
  } = postsProps;

  return (
    <main className="socialobby-content">
      <div className="create-post">
        <div className="post-composer">
          <div className="composer-input">
            <img src="https://picsum.photos/seed/you/40" alt="You" className="user-avatar" />
            <textarea
              placeholder="What's happening in your world?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="post-input"
            />
          </div>
          <div className="composer-actions">
            <button className="media-btn">📷 Photo</button>
            <button className="media-btn">📹 Video</button>
            <button className="media-btn">📍 Location</button>
            <button className="media-btn">😊 Feeling</button>
            <button className="post-btn" onClick={handlePost} disabled={!newPost.trim()}>
              Share
            </button>
          </div>
        </div>
      </div>

      {getTodaysBirthdays().length > 0 && (
        <div className="birthdays-section">
          <h3>🎂 Birthdays Today</h3>
          {/* ... birthday list rendering ... */}
        </div>
      )}

      {getUpcomingEvents().length > 0 && (
        <div className="events-section">
          <h3>📅 Upcoming Events</h3>
          {/* ... event list rendering ... */}
        </div>
      )}

      <div className="posts-feed">
        {posts.length === 0 ? (
          <p>No posts to show. Start sharing!</p>
        ) : (
          Object.entries(groupPostsByDate(posts)).map(([date, datePosts]) => (
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
        )}
      </div>
    </main>
  );
};

export default Feed;