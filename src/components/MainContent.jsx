import React from 'react';
import HomePage from '../pages/HomePage';
import Post from './Post'; // Import Post for the profile view
import { useSocialLobbyContext } from '../SocialLobbyContext';

const MainContent = () => {
  const { viewProps, dataProps, postsProps, setSelectedEvent, setSelectedPage, selectedEvent, selectedPage } = useSocialLobbyContext();
  const { currentView, setCurrentView } = viewProps;
  const { users, events, groups, selectedUser, handleViewProfile, getTodaysBirthdays } = dataProps;
  const { posts } = postsProps;

  if (currentView === 'feed') {
    return <HomePage />;
  }

  if (currentView === 'friends') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Friends</h2>
          <div className="friends-list">
            {users.map(user => (
              <div key={user.username} className="friend-item" onClick={() => handleViewProfile(user)}>
                <img src={user.avatar} alt={user.name} className="friend-avatar" />
                <div className="friend-info">
                  <h3>{user.name}</h3>
                  <p>{user.bio}</p>
                </div>
                <button className="friend-btn" onClick={(e) => { e.stopPropagation(); handleViewProfile(user); }}>View Profile</button>
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
          <h2 onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>Photos</h2>
          <div className="photos-grid">
            {posts.filter(p => p.image).map(post => (
              <img key={post.id} src={post.image} alt="Post" className="photo-item" onClick={() => setCurrentView('feed')} />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'birthdays') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2 onClick={() => setCurrentView('feed')} style={{cursor: 'pointer'}}>Birthdays Today</h2>
          <div className="birthdays-list">
            {getTodaysBirthdays().map((user) => (
              <div key={user.username} className="birthday-item" onClick={() => handleViewProfile(user)} style={{cursor: 'pointer'}}>
                <img src={user.avatar} alt={user.name} className="birthday-avatar" />
                <span className="birthday-name">{user.name}</span>
              </div>
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
              <div key={event.id} className="event-item" onClick={() => { setSelectedEvent(event); setCurrentView('event-details'); }}>
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {event.location}</p>
                <button className="event-btn" onClick={(e) => { e.stopPropagation(); alert('Attending event!'); }}>Attend</button>
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
              <div key={group.id} className="page-item" onClick={() => { setSelectedPage(group); setCurrentView('page-details'); }}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <button className="page-btn" onClick={(e) => { e.stopPropagation(); alert(`${group.joined ? 'Unliked' : 'Liked'} page!`); }}>{group.joined ? 'Liked' : 'Like'}</button>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'event-details') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Event Details</h2>
          {selectedEvent && (
            <div className="event-detail">
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Time: {selectedEvent.time}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Going: {selectedEvent.going}</p>
            </div>
          )}
        </main>
      </React.Fragment>
    );
  }

  if (currentView === 'page-details') {
    return (
      <React.Fragment>
        <main className="socialobby-content">
          <h2>Page Details</h2>
          {selectedPage && (
            <div className="page-detail">
              <h3>{selectedPage.name}</h3>
              <p>{selectedPage.description}</p>
              <p>Members: {selectedPage.members}</p>
            </div>
          )}
        </main>
      </React.Fragment>
    );
  }

  return (
    <div className="profile-page">
      {selectedUser && (
        <>
          <div className="profile-cover" style={{backgroundImage: `url(https://picsum.photos/800/300?random=${selectedUser._id || selectedUser.username})`}}>
            <div className="profile-avatar-large">
              <img src={selectedUser.avatar || 'https://picsum.photos/seed/default/100'} alt={selectedUser.firstName + ' ' + selectedUser.lastName || selectedUser.name} />
            </div>
          </div>
          <div className="profile-info">
            <h2>{selectedUser.firstName && selectedUser.lastName ? `${selectedUser.firstName} ${selectedUser.lastName}` : selectedUser.name}</h2>
            <p>@{selectedUser.username}</p>
            <p>{selectedUser.bio || 'No bio available'}</p>
            <div className="profile-details">
              <div className="detail-row">
                <strong>Birthday:</strong> {selectedUser.birthday || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Profession:</strong> {selectedUser.profession || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Location:</strong> {selectedUser.city || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Education:</strong> {selectedUser.education || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Work:</strong> {selectedUser.work || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Relationship:</strong> {selectedUser.maritalStatus || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {selectedUser.phone || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {selectedUser.address || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>City:</strong> {selectedUser.city || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Groups:</strong> {selectedUser.groups ? selectedUser.groups.join(', ') : 'None'}
              </div>
              <div className="detail-row">
                <strong>Joined:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
          <div className="profile-posts">
            <h3>Posts</h3>
            {posts
              .filter(post => post.authorId === selectedUser._id || post.authorId === selectedUser.id)
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
