import React from 'react';
import HomePage from '../pages/HomePage';
import Post from './Post'; // Import Post for the profile view
import { useSocialLobbyContext } from '../SocialLobbyContext';

const MainContent = () => {
  const { viewProps, dataProps, postsProps } = useSocialLobbyContext();
  const { currentView } = viewProps;
  const { selectedUser } = dataProps;
  const { posts } = postsProps;

  if (currentView === 'feed') {
    return <HomePage />;
  }

  if (currentView === 'profile') {
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