import React, { createContext, useContext, useEffect } from 'react';
import { useAuth, usePosts, useView, useData } from './useHooks';
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
  const { setCurrentView, setShowLogin, setShowStoryModal, setShowChat } = viewProps;

  const dataProps = useData(initialUsers, initialGroups, initialStories, initialEvents, initialNotifications);
  const { handleViewProfile, setSelectedUser, setSelectedStory } = dataProps;

  const postsProps = usePosts([], currentUser);

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
    let userToView = handleViewProfile(userOrName);

    // If user not found in static data, try to fetch from backend
    if (!userToView && typeof userOrName === 'object' && userOrName._id) {
      userToView = userOrName; // It's already a user object from backend
    }

    if (userToView) {
      setSelectedUser(userToView);
      setCurrentView('profile');
    }
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  const handleOpenChat = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  // --- PROPS GROUPING ---

  const finalViewProps = { ...viewProps, handleOpenChat };
  const finalDataProps = {
    ...dataProps,
    handleViewProfile: handleViewProfileClick,
    handleStoryClick,
  };

  const contextValue = {
    authProps,
    viewProps: finalViewProps,
    dataProps: finalDataProps,
    postsProps,
  };

  return (
    <SocialLobbyContext.Provider value={contextValue}>
      {children}
    </SocialLobbyContext.Provider>
  );
};