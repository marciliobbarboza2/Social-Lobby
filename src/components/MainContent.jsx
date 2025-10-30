import React, { useState } from 'react';
import HomePage from '../pages/HomePage';
import Post from './Post'; // Import Post for the profile view
import { useSocialLobbyContext } from '../SocialLobbyContext';

const MainContent = () => {
  const { viewProps, dataProps, postsProps } = useSocialLobbyContext();
  const { currentView } = viewProps;
  const { selectedUser, users, groups, events, photos } = dataProps;
  const { posts } = postsProps;

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (currentView === 'feed') {
    return <HomePage />;
  }

  if (currentView === 'friends') {
    return (
      <div className="friends-page">
        <h2>Friends</h2>
        <div className="friends-grid">
          {users.filter(user => user._id !== dataProps.currentUser?._id).map(user => (
            <div key={user._id} className="friend-card" onClick={() => dataProps.handleViewProfile(user)}>
              <img src={user.avatar} alt={user.name} className="friend-avatar" />
              <div className="friend-info">
                <h3>{user.name}</h3>
                <p>{user.profession}</p>
                <p>{user.location}</p>
                <span className={`status ${user.isOnline ? 'online' : 'offline'}`}>
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'messages') {
    return (
      <div className="messages-page">
        <h2>Messages</h2>
        <div className="messages-container">
          <div className="conversations-list">
            <h3>Conversations</h3>
            {users.filter(user => user._id !== dataProps.currentUser?._id).slice(0, 5).map(user => (
              <div key={user._id} className="conversation-item" onClick={() => viewProps.handleOpenChat(user)}>
                <img src={user.avatar} alt={user.name} className="conversation-avatar" />
                <div className="conversation-info">
                  <h4>{user.name}</h4>
                  <p>Last message preview...</p>
                  <span className="conversation-time">2h ago</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-window">
            <div className="chat-header">
              <h3>Select a conversation to start chatting</h3>
            </div>
            <div className="chat-messages">
              <p className="no-messages">No messages selected</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'photos') {
    return (
      <div className="photos-page">
        <h2>Photos</h2>
        <div className="photos-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-item" onClick={() => setSelectedPhoto(photo)}>
              <img src={photo} alt={`Photo ${index + 1}`} />
            </div>
          ))}
        </div>
        {selectedPhoto && (
          <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
            <div className="photo-modal-content">
              <img src={selectedPhoto} alt="Selected photo" />
              <button className="close-modal" onClick={() => setSelectedPhoto(null)}>×</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'events') {
    return (
      <div className="events-page">
        <h2>Events</h2>
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-details">
                  <span>📅 {event.date}</span>
                  <span>🕒 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
                <div className="event-attendees">
                  <span>{event.going} going</span>
                  <button className="attend-btn">Attend</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedEvent && (
          <div className="event-modal" onClick={() => setSelectedEvent(null)}>
            <div className="event-modal-content">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
              <div className="event-details">
                <h2>{selectedEvent.title}</h2>
                <p>{selectedEvent.description}</p>
                <div className="event-meta">
                  <p><strong>Date:</strong> {selectedEvent.date}</p>
                  <p><strong>Time:</strong> {selectedEvent.time}</p>
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                  <p><strong>Attendees:</strong> {selectedEvent.attendees.join(', ')}</p>
                </div>
                <button className="close-modal" onClick={() => setSelectedEvent(null)}>×</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'groups') {
    return (
      <div className="groups-page">
        <h2>Groups</h2>
        <div className="groups-grid">
          {groups.map(group => (
            <div key={group.id} className="group-card" onClick={() => setSelectedGroup(group)}>
              <img src={group.avatar} alt={group.name} className="group-avatar" />
              <div className="group-info">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <div className="group-stats">
                  <span>{group.members} members</span>
                  <span>{group.posts} posts</span>
                </div>
                <button className={`join-btn ${group.joined ? 'joined' : ''}`}>
                  {group.joined ? 'Joined' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedGroup && (
          <div className="group-modal" onClick={() => setSelectedGroup(null)}>
            <div className="group-modal-content">
              <img src={selectedGroup.avatar} alt={selectedGroup.name} />
              <div className="group-details">
                <h2>{selectedGroup.name}</h2>
                <p>{selectedGroup.description}</p>
                <div className="group-stats">
                  <p><strong>Members:</strong> {selectedGroup.members}</p>
                  <p><strong>Posts:</strong> {selectedGroup.posts}</p>
                </div>
                <button className="close-modal" onClick={() => setSelectedGroup(null)}>×</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'pages') {
    return (
      <div className="pages-page">
        <h2>Pages</h2>
        <div className="pages-grid">
          <div className="page-card">
            <div className="page-avatar">🎨</div>
            <div className="page-info">
              <h3>Art Community</h3>
              <p>Share your artwork and connect with fellow artists</p>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
          <div className="page-card">
            <div className="page-avatar">💻</div>
            <div className="page-info">
              <h3>Tech Talk</h3>
              <p>Latest technology news and discussions</p>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
          <div className="page-card">
            <div className="page-avatar">🍳</div>
            <div className="page-info">
              <h3>Food Lovers</h3>
              <p>Recipes, cooking tips, and food adventures</p>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
          <div className="page-card">
            <div className="page-avatar">🏃</div>
            <div className="page-info">
              <h3>Fitness Friends</h3>
              <p>Stay motivated and achieve your fitness goals</p>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="profile-page">
        {selectedUser && (
          <>
            <div className="profile-cover" style={{backgroundImage: `url(https://picsum.photos/800/300?random=${selectedUser._id || selectedUser.username})`}}>
              <div className="profile-avatar-large">
                <img src={selectedUser.avatar} alt={selectedUser.firstName + ' ' + selectedUser.lastName || selectedUser.name} />
              </div>
            </div>
            <div className="profile-info">
              <h2>{selectedUser.firstName && selectedUser.lastName ? `${selectedUser.firstName} ${selectedUser.lastName}` : selectedUser.name}</h2>
              <p>@{selectedUser.username}</p>
              <p>{selectedUser.bio || 'No bio available'}</p>
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
  }

  return <HomePage />;
};

export default MainContent;
