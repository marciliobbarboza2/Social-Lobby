import React from 'react';
import HomePage from '../pages/HomePage';
import SinglePostPage from '../pages/SinglePostPage';
import Post from './Post'; // Import Post for the profile view
import { useSocialLobbyContext } from '../SocialLobbyContext';

const MainContent = () => {
  const { viewProps, dataProps, postsProps } = useSocialLobbyContext();
  const { currentView } = viewProps;
  const { users, events, groups, selectedUser, handleViewProfile } = dataProps;
  const { posts } = postsProps;

  if (currentView === 'feed') {
    return <HomePage />;
  }

  if (currentView === 'singlePost') {
    return <SinglePostPage />;
  }

  if (currentView === 'friends') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Friends</h2>
          <div className="friends-list">
            {users.map(user => (
              <div key={user.username} className="friend-item">
                <img src={user.avatar} alt={user.name} className="friend-avatar" />
                <div className="friend-info">
                  <h3>{user.name}</h3>
                  <p>{user.bio}</p>
                </div>
                <button className="friend-btn" onClick={() => handleViewProfile(user)}>View Profile</button>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'messages') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Messages</h2>
          <div className="messages-list">
            {users.slice(0, 5).map(user => (
              <div key={user.username} className="message-item" onClick={() => viewProps.handleOpenChat(user)}>
                <img src={user.avatar} alt={user.name} className="message-avatar" />
                <div className="message-info">
                  <h3>{user.name}</h3>
                  <p>Last message...</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'photos') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Photos</h2>
          <div className="photos-grid">
            {posts.filter(p => p.image).map(post => (
              <img key={post.id} src={post.image} alt="Post" className="photo-item" />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'events') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Events</h2>
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-item">
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {event.location}</p>
                <button className="event-btn">Attend</button>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'pages') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Pages</h2>
          <div className="pages-list">
            {groups.map(group => (
              <div key={group.id} className="page-item">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <button className="page-btn">{group.joined ? 'Liked' : 'Like'}</button>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  return (
    <div className="profile-page">
      {selectedUser && (
        <>
          <div className="profile-cover" style={{backgroundImage: `url(${selectedUser.coverPhoto})`}}>
            <div className="profile-avatar-large">
              <img src={selectedUser.avatar} alt={selectedUser.name} />
            </div>
          </div>
          <div className="profile-info">
            <h2>{selectedUser.name}</h2>
            <p>@{selectedUser.username}</p>
            <p>{selectedUser.bio}</p>
            <div className="profile-details">
              <div className="detail-row">
                <strong>Birthday:</strong> {selectedUser.birthday}
              </div>
              <div className="detail-row">
                <strong>Profession:</strong> {selectedUser.profession}
              </div>
              <div className="detail-row">
                <strong>Location:</strong> {selectedUser.location}
              </div>
              <div className="detail-row">
                <strong>Education:</strong> {selectedUser.education}
              </div>
              <div className="detail-row">
                <strong>Work:</strong> {selectedUser.work}
              </div>
              <div className="detail-row">
                <strong>Relationship:</strong> {selectedUser.relationship}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {selectedUser.phone}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {selectedUser.address}
              </div>
              <div className="detail-row">
                <strong>City:</strong> {selectedUser.city}
              </div>
              <div className="detail-row">
                <strong>Groups:</strong> {selectedUser.groups.join(', ')}
              </div>
              <div className="detail-row">
                <strong>Joined:</strong> {selectedUser.joined}
              </div>
            </div>
          </div>
          <div className="profile-posts">
            <h3>Posts</h3>
            {posts
              .filter(post => post.author && post.author._id === selectedUser._id)
              .map(post => (
                <Post
                  key={post.id}
                  post={post}
                  handleEditPost={postsProps.handleEditPost}
                  handleDeletePost={postsProps.handleDeletePost}
                  editingPost={postsProps.editingPost}
                  editContent={postsProps.editContent}
                  setEditContent={postsProps.setEditContent}
                  handleSavePost={postsProps.handleSavePost}
                  handleCancelEdit={postsProps.handleCancelEdit}
                  handleLike={postsProps.handleLike}
                  toggleComments={postsProps.toggleComments}
                  showComments={postsProps.showComments}
                  newComment={postsProps.newComment}
                  setNewComment={postsProps.setNewComment}
                  handleComment={postsProps.handleComment}
                  handleViewProfile={dataProps.handleViewProfile}
                  editingComment={postsProps.editingComment}
                  handleEditComment={postsProps.handleEditComment}
                  handleSaveComment={postsProps.handleSaveComment}
                  handleDeleteComment={postsProps.handleDeleteComment}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
