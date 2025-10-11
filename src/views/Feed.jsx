import React from 'react';
import Post from '../components/Post';

const Feed = ({
  stories,
  posts,
  newPost,
  setNewPost,
  handlePost,
  isLoggedIn,
  handleEditPost,
  handleDeletePost,
  editingPost,
  editContent,
  setEditContent,
  handleSavePost,
  handleCancelEdit,
  handleLike,
  toggleComments,
  showComments,
  newComment,
  setNewComment,
  handleComment,
  handleViewProfile,
  handleEditComment,
  handleDeleteComment,
  editingComment,
  handleSaveComment,
  handleOpenChat,
  setCurrentView,
  setShowGroups,
}) => {
  return (
    <div className="socialobby-main">
      <aside className="socialobby-sidebar">
        <div className="sidebar-section navigation-section">
          <h3>Navigation</h3>
          <ul>
            <li onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>🏠 Feed</li>
            <li onClick={() => setCurrentView('friends')} style={{cursor: 'pointer'}}>👥 Friends</li>
            <li onClick={() => setCurrentView('messages')} style={{cursor: 'pointer'}}>💬 Messages</li>
            <li onClick={() => setCurrentView('photos')} style={{cursor: 'pointer'}}>📷 Photos</li>
            <li onClick={() => setCurrentView('events')} style={{cursor: 'pointer'}}>📅 Events</li>
            <li onClick={() => setShowGroups(true)} style={{cursor: 'pointer'}}>👪 Groups</li>
            <li onClick={() => setCurrentView('pages')} style={{cursor: 'pointer'}}>📰 Pages</li>
          </ul>
        </div>
        <div className="sidebar-section your-shortcuts">
          <h3>Your Shortcuts</h3>
          <ul>
            <li>🎨 Art Community</li>
            <li>💻 Tech Talk</li>
            <li>🍳 Food Lovers</li>
            <li>🏃 Fitness Friends</li>
          </ul>
        </div>
      </aside>

      <main className="socialobby-content">
        <div className="stories-section">
          <div className="stories-container">
            <div className="story-item add-story">
              <div className="story-avatar">
                <img src="https://picsum.photos/seed/you/50" alt="You" />
                <div className="add-icon">+</div>
              </div>
              <span>Add Story</span>
            </div>
            {stories.map(story => (
              <div key={story.id} className="story-item">
                <div className="story-avatar">
                  <img src={story.avatar} alt={story.author} />
                </div>
                <span>{story.author.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

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
              <button
                className="post-btn"
                onClick={handlePost}
                disabled={!newPost.trim()}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="posts-feed">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              isLoggedIn={isLoggedIn}
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
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              editingComment={editingComment}
              handleSaveComment={handleSaveComment}
            />
          ))}
        </div>
      </main>

      <aside className="socialobby-right-sidebar">
        <div className="sidebar-section online-friends">
          <h3>Online Friends</h3>
          <div className="contacts-list">
            <div className="contact online" onClick={() => handleOpenChat('Emma Rodriguez')}>🟢 Emma Rodriguez</div>
            <div className="contact online" onClick={() => handleOpenChat('David Kim')}>🟢 David Kim</div>
            <div className="contact" onClick={() => handleOpenChat('Sophie Anderson')}>⚪ Sophie Anderson</div>
            <div className="contact online" onClick={() => handleOpenChat('Carlos Mendoza')}>🟢 Carlos Mendoza</div>
            <div className="contact" onClick={() => handleOpenChat('Alex Chen')}>⚪ Alex Chen</div>
            <div className="contact online" onClick={() => handleOpenChat('Lisa Thompson')}>🟢 Lisa Thompson</div>
          </div>
        </div>
        <div className="sidebar-section trending-topics">
          <h3>Trending on Google</h3>
          <div className="trending-list">
            <div className="trend-item">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('AI Revolution')}`} target="_blank" className="trend-link">AI Revolution</a>
              <span className="trend-count">+150%</span>
            </div>
            <div className="trend-item">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Sustainable Living')}`} target="_blank" className="trend-link">Sustainable Living</a>
              <span className="trend-count">+120%</span>
            </div>
            <div className="trend-item">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Remote Work Tips')}`} target="_blank" className="trend-link">Remote Work Tips</a>
              <span className="trend-count">+95%</span>
            </div>
            <div className="trend-item">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Mental Health Awareness')}`} target="_blank" className="trend-link">Mental Health Awareness</a>
              <span className="trend-count">+80%</span>
            </div>
            <div className="trend-item">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent('Electric Vehicles')}`} target="_blank" className="trend-link">Electric Vehicles</a>
              <span className="trend-count">+75%</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
