import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, usePosts, useView, useData } from './useHooks';
import useWebSocket from './hooks/useWebSocket';
import { notifications as initialNotifications } from './data/notifications.js';
import { groups as initialGroups } from './data/groups.js';
import { stories as initialStories } from './data/stories.js';
import { users as initialUsers } from './data/users.js';
import { events as initialEvents } from './data/events.js';

const SocialLobbyContext = createContext(null);

/**
 * A custom hook to easily consume the SocialLobbyContext.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useSocialLobbyContext = () => {
  const context = useContext(SocialLobbyContext);
  if (!context) {
    console.error('🚨 [Context] useSocialLobbyContext called outside of SocialLobbyProvider');
    console.error('🚨 [Context] Make sure the component is wrapped in <SocialLobbyProvider>');
    throw new Error('useSocialLobbyContext must be used within a SocialLobbyProvider');
  }
  return context;
};

/**
 * This provider component encapsulates all the major state logic of the application.
 * It calls the custom hooks and provides their state and functions to the rest of the app
 * through the SocialLobbyContext.
 */
export const SocialLobbyProvider = ({ children }) => {
  // --- HOOKS ---
  const authProps = useAuth();
  const { currentUser, isLoggedIn } = authProps;

  const viewProps = useView();
  const { setCurrentView, setShowLogin, setShowStoryModal } = viewProps;

  const dataProps = useData(initialUsers, initialGroups, initialStories, initialEvents, initialNotifications, currentUser, authProps.setCurrentUser);
  const { handleViewProfile, setSelectedUser, setSelectedStory } = dataProps;

  // New states for enhanced interactivity
  const [filterTopic, setFilterTopic] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const postsProps = usePosts([], currentUser);

  // WebSocket for chat
  const token = localStorage.getItem('token');
  const { messages: wsMessages, sendMessage, isConnected, typingFrom, emitTyping, onlineUsers } = useWebSocket(token);

  // Chat states
  const [activeChats, setActiveChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState(new Set());
  const [unreadByUser, setUnreadByUser] = useState({}); // { userId: count }

  // When user logs in or out, reset the view to the feed
  useEffect(() => {
    if (isLoggedIn) {
      setCurrentView('feed');
      setShowLogin(false);
    } else {
      setCurrentView('login');
      setShowLogin(true);
    }
  }, [isLoggedIn, setCurrentView, setShowLogin]);

  // --- DERIVED STATE & HANDLERS ---

  const handleViewProfileClick = async (userOrName) => {
    console.log('🔍 [Profile Click] Clicked on:', userOrName);
    let userToView = handleViewProfile(userOrName);
    console.log('🔍 [Profile Click] Found user:', userToView);

    // If user not found in static data, try to fetch from backend
    if (!userToView && typeof userOrName === 'object' && userOrName._id) {
      console.log('🔍 [Profile Click] Fetching from backend for ID:', userOrName._id);
      // Fetch user profile from backend
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userOrName._id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            userToView = data.data;
            console.log('🔍 [Profile Click] Backend user found:', userToView);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    if (userToView) {
      console.log('🔍 [Profile Click] Setting selected user and navigating to profile');
      setSelectedUser(userToView);
      setCurrentView('profile');
    } else {
      console.log('🔍 [Profile Click] No user found, cannot navigate to profile');
    }
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  const openChat = (user) => {
    if (!activeChats.find(chat => chat._id === user._id)) {
      setActiveChats(prev => [...prev, user]);
    }
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(user._id);
      return newSet;
    });
  };

  const closeChat = (userId) => {
    setActiveChats(prev => prev.filter(chat => chat._id !== userId));
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const toggleMinimize = (userId) => {
    setMinimizedChats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleOpenChat = (user) => {
    openChat(user);
    // Mark as read on open
    setUnreadByUser((prev) => ({ ...prev, [user._id]: 0 }));
  };

  // Increment unread counts when a message arrives from someone not currently focused
  useEffect(() => {
    if (!wsMessages.length || !isLoggedIn) return;
    const last = wsMessages[wsMessages.length - 1];
    // If message from other user and chat not minimized? increment unread unless the window is open and not minimized
    if (last.senderId && currentUser && last.senderId !== currentUser._id) {
      const isOpen = activeChats.some(c => c._id === last.senderId);
      const isMin = minimizedChats.has(last.senderId);
      if (!isOpen || isMin) {
        setUnreadByUser((prev) => ({ ...prev, [last.senderId]: (prev[last.senderId] || 0) + 1 }));
      }
    }
  }, [wsMessages, isLoggedIn, currentUser, activeChats, minimizedChats]);

  // --- PROPS GROUPING ---

  const finalViewProps = { ...viewProps, handleOpenChat };
  const finalDataProps = {
    ...dataProps,
    handleViewProfile: handleViewProfileClick,
    handleStoryClick,
  };

  const chatProps = {
    wsMessages,
    sendMessage,
    isConnected,
    typingFrom,
    emitTyping,
    onlineUsers,
    activeChats,
    minimizedChats,
    unreadByUser,
    openChat,
    closeChat,
    toggleMinimize,
  };

  const contextValue = {
    authProps,
    viewProps: finalViewProps,
    dataProps: finalDataProps,
    postsProps,
    chatProps,
    filterTopic,
    setFilterTopic,
    selectedEvent,
    setSelectedEvent,
    selectedPage,
    setSelectedPage,
  };

  return (
    <SocialLobbyContext.Provider value={contextValue}>
      {children}
    </SocialLobbyContext.Provider>
  );
};