// This file contains custom hooks that encapsulate the business logic of the application.

import { useState, useEffect } from 'react';
import { mapFetchedPosts, mapFetchedComments } from './utils/mappers';
import { posts as postsData } from './data/posts';

/**
 * Custom hook for managing user authentication.
 * @returns {object} - An object containing authentication state and handler functions.
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
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
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after verification
        clearTimeout(timeoutId);
      });
    } else {
      setIsLoading(false); // No token, not loading
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
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          signal: controller.signal
        });
      }
    } catch {
      console.error('Logout error');
    } finally {
      clearTimeout(timeoutId);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
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
    } finally {
      clearTimeout(timeoutId);
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
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState({});

  // Fetch posts from backend on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/posts', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            const mappedPosts = mapFetchedPosts(data, currentUser);
            setPosts(mappedPosts);
          } else {
            // Fallback to static data if backend fails
            setPosts(postsData);
          }
        } else {
          // Fallback to static data if no token
          setPosts(postsData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to static data
        setPosts(postsData);
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: editContent
        }),
        signal: controller.signal
      });

      const data = await response.json();

      if (data.success) {
        // Instead of re-fetching, update the single post in the local state
        setPosts(posts.map(p => (p.id === postId ? mapFetchedPosts({data: [data.post]}, currentUser)[0] : p)));
        handleCancelEdit();
      } else {
        console.error('Failed to update post:', data.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      clearTimeout(timeoutId);
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

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ content: editContent }),
          signal: controller.signal
        });

        if (!response.ok) {
          // Revert on failure
          console.error('Failed to save comment');
          setPosts(originalPosts);
        } else {
          // Update with server response if needed
          const data = await response.json();
          if (data.success) {
            // Update with the returned comment data
            setPosts(posts.map(post =>
              post.id === postId
                ? {
                  ...post,
                  comments: post.comments.map(comment =>
                    comment.id === commentId ? { ...comment, content: data.comment.content, time: data.comment.updatedAt || comment.time } : comment
                  )
                }
                : post
            ));
          }
        }
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Error saving comment:', error);
        setPosts(originalPosts);
      }
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const likesArray = Array.isArray(p.likes) ? p.likes : [];
        const wasLiked = likesArray.includes(currentUser?._id);
        return { ...p, likes: wasLiked ? likesArray.filter(id => id !== currentUser?._id) : [...likesArray, currentUser?._id] };
      }
      return p;
    }));
  };

  const handlePost = async (post) => {
    const { title, content } = post;
    if (!title.trim() || !content.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          status: 'published'
        }),
        signal: controller.signal
      });

      const data = await response.json();

      if (data.success) {
        // Instead of re-fetching, add the new post to the top of the list
        const newPostData = mapFetchedPosts({data: [data.post]}, currentUser)[0];
        setPosts([newPostData, ...posts]);
      } else {
        console.error('Failed to create post:', data.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const toggleComments = async (postId) => {
    const newShowState = !showComments[postId];
    setShowComments(prev => ({
      ...prev,
      [postId]: newShowState
    }));

    // Fetch comments when opening comments section
    if (newShowState) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`http://localhost:5000/api/comments/post/${postId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.success) {
            const mappedComments = mapFetchedComments(data);
            setPosts(posts.map(post =>
              post.id === postId ? { ...post, comments: mappedComments } : post
            ));
          }
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  };

  const handleComment = async (postId) => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('http://localhost:5000/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: newComment,
            postId: postId
          }),
          signal: controller.signal
        });

        const data = await response.json();

        if (data.success) {
          // Add the new comment to the post's comments
          const newCommentObj = mapFetchedComments({ data: [data.data] })[0];
          setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, newCommentObj] } : post
          ));
          setNewComment('');
          clearTimeout(timeoutId);
          return;
        }
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    }

    // Fallback to local comment creation
    const newCommentObj = {
      id: Date.now(),
      author: currentUser?.username || 'You',
      avatar: 'https://picsum.photos/seed/you/30',
      content: newComment,
      time: 'now',
      authorId: currentUser?._id
    };
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, newCommentObj] } : post
    ));
    setNewComment('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleDeleteComment = async (postId, commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });

      const data = await response.json();

      if (data.success) {
        // Update local state to remove the comment
        setPosts(posts.map(post =>
          post.id === postId
            ? {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId)
            }
            : post
        ));
      } else {
        console.error('Failed to delete comment:', data.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const fetchSinglePost = (postId) => {
    return posts.find(post => post.id === postId);
  };

  return {
    posts,
    editingPost,
    editingComment,
    editContent,
    setEditContent,
    newComment,
    setNewComment,
    showComments,
    handleEditPost,
    handleSavePost,
    handleCancelEdit,
    handleEditComment,
    handleSaveComment,
    handleLike,
    handlePost,
    toggleComments,
    handleComment,
    handleDeletePost,
    handleDeleteComment,
    fetchSinglePost,
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
export const useData = (initialUsers, initialGroups, initialStories, initialEvents, initialNotifications, currentUser, setCurrentUser) => {
  const [users] = useState(initialUsers);
  const [groups, setGroups] = useState(initialGroups);
  const [stories, setStories] = useState(initialStories);
  const [events] = useState(initialEvents);
  const [notifications] = useState(initialNotifications);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [newStoryImage, setNewStoryImage] = useState(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
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

  const handleCreateStory = (imageFile) => {
    if (!imageFile) return;

    const newStory = {
      id: Date.now(),
      author: currentUser?.fullName || 'You',
      userId: currentUser?._id || 'user1',
      avatar: currentUser?.avatar || 'https://picsum.photos/seed/you/50',
      image: URL.createObjectURL(imageFile),
      time: 'now'
    };

    // Add to stories array (in a real app, this would be sent to backend)
    setStories(prevStories => [newStory, ...prevStories]);
    setNewStoryImage(null);
    setIsCreatingStory(false);
  };

  const handleChangeProfilePic = (imageFile, currentUser) => {
    if (!imageFile || !currentUser) return;

    const newAvatar = URL.createObjectURL(imageFile);
    // Update current user avatar (in a real app, this would be sent to backend)
    setCurrentUser(prev => ({ ...prev, avatar: newAvatar }));
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
    newStoryImage,
    setNewStoryImage,
    isCreatingStory,
    setIsCreatingStory,
    otherUser,
    setOtherUser,
    handleViewProfile,
    handleJoinGroup,
    handleCreateStory,
    handleChangeProfilePic,
    getTodaysBirthdays,
    getUpcomingEvents,
    groupPostsByDate
  };
};