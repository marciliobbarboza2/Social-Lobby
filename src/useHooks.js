// This file contains custom hooks that encapsulate the business logic of the application.

import { useState, useEffect } from 'react';
import { mapFetchedPosts } from './utils/mappers';

/**
 * Custom hook for managing user authentication.
 * @returns {object} - An object containing authentication state and handler functions.
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const emailToLogin = email || loginEmail;
    const passwordToLogin = password || loginPassword;

    if (!emailToLogin || !passwordToLogin) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailToLogin,
          password: passwordToLogin
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch {
      console.error('Logout error');
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
      } else {
        setError('Failed to delete account');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return {
    isLoggedIn,
    currentUser,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    handleLogout,
    handleDeleteAccount,
    isLoading,
    error,
    setError
  };
};

/**
 * Custom hook for managing posts.
 * @param {Array} initialPosts - The initial list of posts.
 * @param {object} currentUser - The current authenticated user.
 * @returns {object} - An object containing posts state and handler functions.
 */
export const usePosts = (initialPosts, currentUser) => {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        if (data.success) {
          const postsWithId = mapFetchedPosts(data, currentUser);
          // Fetch comments for each post
          const postsWithComments = await Promise.all(
            postsWithId.map(async (post) => {
              try {
                const commentsResponse = await fetch(`http://localhost:5000/api/comments/post/${post.id}`);
                if (commentsResponse.ok) {
                  const commentsData = await commentsResponse.json();
                  if (commentsData.success) {
                    // Flatten comments and replies
                    const allComments = [];
                    commentsData.data.forEach(comment => {
                      allComments.push({
                        id: comment._id,
                        content: comment.content,
                        author: comment.author.firstName + ' ' + comment.author.lastName,
                        authorId: comment.author._id,
                        avatar: comment.author.avatar,
                        time: new Date(comment.createdAt).toLocaleDateString(),
                        likes: comment.likes || 0,
                        replies: comment.replies ? comment.replies.map(reply => ({
                          id: reply._id,
                          content: reply.content,
                          author: reply.author.firstName + ' ' + reply.author.lastName,
                          authorId: reply.author._id,
                          avatar: reply.author.avatar,
                          time: new Date(reply.createdAt).toLocaleDateString(),
                          likes: reply.likes || 0
                        })) : []
                      });
                    });
                    return { ...post, comments: allComments };
                  }
                }
              } catch (error) {
                console.error('Error fetching comments for post', post.id, error);
              }
              return post;
            })
          );
          setPosts(postsWithComments);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleEditPost = (postId, content) => {
    setEditingPost(postId);
    setEditContent(content);
  };

  const handleSavePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: editContent
        })
      });

      const data = await response.json();

      if (data.success) {
        // Instead of re-fetching, update the single post in the local state
        setPosts(posts.map(p => (p.id === postId ? mapFetchedPosts([data.post], currentUser)[0] : p)));
        handleCancelEdit();
      } else {
        console.error('Failed to update post:', data.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditingComment(null);
    setEditContent('');
  };

  const handleEditComment = (postId, commentId, content) => {
    setEditingComment({ postId, commentId });
    setEditContent(content);
  };

  const handleSaveComment = async (postId, commentId) => {
    // Optimistically update UI
    const originalPosts = posts;
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId ? { ...comment, content: editContent } : comment
          )
        }
        : post
    ));
    handleCancelEdit();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ content: editContent })
      });
      if (!response.ok) {
        // Revert on failure
        console.error('Failed to save comment');
        setPosts(originalPosts);
      }
    } catch (error) {
      console.error('Error saving comment:', error);
      setPosts(originalPosts);
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    // Optimistic update
    // const originalPosts = posts;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const wasLiked = p.likes.includes(currentUser._id);
        return { ...p, likes: wasLiked ? p.likes.filter(id => id !== currentUser._id) : [...p.likes, currentUser._id] };
      }
      return p;
    }));
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Update with the authoritative server response
        setPosts(posts => posts.map(p => p.id === postId ? mapFetchedPosts([data.post], currentUser)[0] : p));
      } else {
        console.error('Failed to toggle like:', data.message);
        // setPosts(originalPosts); // Revert on failure
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newPost.substring(0, 50), // First 50 chars as title
          content: newPost,
          status: 'published'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Instead of re-fetching, add the new post to the top of the list
        const newPostData = mapFetchedPosts([data.post], currentUser)[0];
        setPosts([newPostData, ...posts]);
        setNewPost('');
      } else {
        console.error('Failed to create post:', data.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleComment = async (postId) => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newComment,
          postId: postId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Instead of re-fetching, update the single post with the new comment
        const updatedPost = mapFetchedPosts([data.post], currentUser)[0];
        setPosts(posts.map(p => p.id === postId ? updatedPost : p));
        setNewComment('');
      } else {
        console.error('Failed to create comment:', data.message);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Instead of re-fetching, filter out the deleted post from local state
        setPosts(posts.filter(p => p.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    // Optimistically update UI
    const originalPosts = posts;
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        }
        : post
    ));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        // Revert on failure
        console.error('Failed to delete comment');
        setPosts(originalPosts);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setPosts(originalPosts);
    }
  };

  const fetchSinglePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch single post');
      }
      const data = await response.json();
      if (data.success) {
        // You can set a single post state or handle navigation here
        // For now, just log it or set a state if needed
        console.log('Fetched single post:', data.post);
      }
    } catch (error) {
      console.error('Error fetching single post:', error);
    }
  };

  return {
    posts,
    editingPost,
    editingComment,
    editContent,
    setEditContent,
    newPost,
    setNewPost,
    newComment,
    setNewComment,
    showComments,
    handleEditPost,
    handleSavePost,
    handleCancelEdit,
    handleEditComment,
    handleSaveComment,
    handleLike, // handleReaction is removed as it was redundant
    handlePost,
    toggleComments,
    handleComment,
    handleDeletePost,
    handleDeleteComment,
    fetchSinglePost
  };
};

/**
 * Custom hook for managing the current view and modal visibility.
 * @returns {object} - An object containing view state and handler functions.
 */
export const useView = () => {
  const [currentView, setCurrentView] = useState('feed');
  const [showLogin, setShowLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showOtherProfile, setShowOtherProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  return {
    currentView,
    setCurrentView,
    showLogin,
    setShowLogin,
    showProfile,
    setShowProfile,
    showOtherProfile,
    setShowOtherProfile,
    showNotifications,
    setShowNotifications,
    showGroups,
    setShowGroups,
    showChat,
    setShowChat,
    showStoryModal,
    setShowStoryModal
  };
};

/**
 * Custom hook for managing data such as users, groups, stories, etc.
 * @param {Array} initialUsers - The initial list of users.
 * @param {Array} initialGroups - The initial list of groups.
 * @param {Array} initialStories - The initial list of stories.
 * @param {Array} initialEvents - The initial list of events.
 * @param {Array} initialNotifications - The initial list of notifications.
 * @returns {object} - An object containing data state and handler functions.
 */
export const useData = (initialUsers, initialGroups, initialStories, initialEvents, initialNotifications) => {
  const [users] = useState(initialUsers);
  const [groups, setGroups] = useState(initialGroups);
  const [stories] = useState(initialStories);
  const [events] = useState(initialEvents);
  const [notifications] = useState(initialNotifications);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false); // Assuming data is static for now
  // const [error, setError] = useState(null); // Assuming no errors for static data

  const handleViewProfile = (userOrName) => {
    let user;
    if (typeof userOrName === 'string') {
      user = users.find(u => u.name === userOrName);
    } else {
      user = userOrName;
    }
    if (user && user.username) {
      return user;
    }
    return null;
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/posts`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Find user from posts author data
          const userFromPosts = data.data.length > 0 ? data.data[0].author : null;
          return userFromPosts;
        }
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
    return null;
  };

  const handleJoinGroup = (groupId) => {
    // TODO: This should be an API call to join/leave a group on the server.
    setGroups(groups.map(group =>
      group.id === groupId ? { ...group, joined: !group.joined } : group
    ));
  };

  const getTodaysBirthdays = () => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    return users.filter(user => {
      if (!user.birthday) return false;
      // Create a date object from the birthday string. Assumes "Month Day, Year" format.
      const birthdayDate = new Date(user.birthday);
      // Check if the date is valid before comparing
      if (isNaN(birthdayDate.getTime())) {
        return false;
      }
      return birthdayDate.getMonth() + 1 === todayMonth && birthdayDate.getDate() === todayDay;
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const groupPostsByDate = (posts) => {
    const grouped = {};
    // Create a shallow copy and sort by date before grouping
    [...posts]
      .sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0))
      .forEach(post => {
      const date = post.time; // since time is date string
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(post);
    });
    return grouped;
  };

  return {
    users,
    groups,
    stories,
    events,
    notifications,
    selectedUser,
    setSelectedUser,
    selectedStory,
    setSelectedStory,
    otherUser,
    setOtherUser,
    handleViewProfile,
    handleJoinGroup,
    getTodaysBirthdays,
    getUpcomingEvents,
    groupPostsByDate
  };
};
