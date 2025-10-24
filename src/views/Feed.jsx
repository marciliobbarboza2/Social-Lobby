import React from 'react';
import Post from '../components/Post';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const Feed = () => {
  const { dataProps, postsProps, authProps, filterTopic } = useSocialLobbyContext();
  const { handleViewProfile, getTodaysBirthdays, getUpcomingEvents } = dataProps;
  const { currentUser } = authProps;
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
    draftSaved,
  } = postsProps;

  return (
    <main className="socialobby-content">
      <div className="create-post">
        <div className="post-composer">
          <div className="composer-input">
            <img src={currentUser?.avatar || "https://picsum.photos/seed/you/40"} alt="You" className="user-avatar" />
            <textarea
              placeholder="What's happening in your world?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="post-input"
            />
          </div>
          <div className="composer-actions">
            <button className="media-btn" onClick={() => alert('Photo upload coming soon!')}>📷 Photo</button>
            <button className="media-btn" onClick={() => alert('Video upload coming soon!')}>📹 Video</button>
            <button className="media-btn" onClick={() => alert('Location tagging coming soon!')}>📍 Location</button>
            <button className="media-btn" onClick={() => alert('Feeling/Activity coming soon!')}>😊 Feeling</button>
            <button className="post-btn" onClick={handlePost} disabled={!newPost.trim()}>
              Share
            </button>
          </div>
          {draftSaved && <div className="draft-saved">Draft saved!</div>}
        </div>
      </div>

      {getTodaysBirthdays().length > 0 && (
        <div className="birthdays-section">
          <h3>🎂 Birthdays Today</h3>
          <div className="birthdays-list">
            {getTodaysBirthdays().map((user) => (
              <div key={user.username} className="birthday-item" onClick={() => handleViewProfile(user)} style={{cursor: 'pointer'}}>
                <img src={user.avatar} alt={user.name} className="birthday-avatar" />
                <span className="birthday-name">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {getUpcomingEvents().length > 0 && (
        <div className="events-section">
          <h3>📅 Upcoming Events</h3>
          <div className="events-list">
            {getUpcomingEvents().map((event) => (
              <div key={event.id} className="event-item" style={{cursor: 'pointer'}}>
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-details">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-description">{event.description}</p>
                  <p className="event-date">{event.date} at {event.time}</p>
                  <p className="event-location">{event.location}</p>
                  <p className="event-going">{event.going} going</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
