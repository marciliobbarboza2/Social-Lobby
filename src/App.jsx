import './App.css';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import MainContent from './components/MainContent';
import Modals from './components/Modals';
import ChatBar from './components/ChatBar';
import React from 'react';
import { SocialLobbyProvider, useSocialLobbyContext } from './SocialLobbyContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Blogging Platform - Main App Component
 *
 * This is the root component of our blogging platform. It handles:
 * - User authentication state (login/logout)
 * - Main application layout (header, content, modals)
 * - Context consumption for global state management
 *
 * The app uses a provider pattern where SocialLobbyProvider manages all state,
 * and AppContent consumes that state to render the appropriate UI.
 */
const AppContent = () => {
  // Extract authentication, view, and data props from global context
  const { authProps, viewProps, dataProps } = useSocialLobbyContext();

  // Authentication state and handlers
  const { isLoggedIn, currentUser, loginEmail, setLoginEmail, loginPassword, setLoginPassword, handleLogin, isLoading, error, setError, handleLogout, handleDeleteAccount } = authProps;

  // View state for modals and navigation
  const { showLogin, setShowLogin, showProfile, setShowProfile, showOtherProfile, setShowOtherProfile, showNotifications, setShowNotifications, showGroups, setShowGroups, showStoryModal, setShowStoryModal, setCurrentView, currentView } = viewProps;

  // Data state for users, groups, etc.
  const { groups, notifications, otherUser, handleJoinGroup, selectedStory } = dataProps;



  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Show login screen if user is not authenticated
  if (!isLoggedIn) {
    return (
      <LoginScreen
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        handleLogin={handleLogin}
        isLoading={isLoading}
        error={error}
        setError={setError}
      />
    );
  }

  // Main authenticated app layout
  return (
    <div className="socialobby-container">
      {/* Application header with navigation and user controls */}
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        setShowNotifications={setShowNotifications}
        setCurrentView={setCurrentView}
        setSelectedUser={dataProps.setSelectedUser}
        isLoggedIn={isLoggedIn}
        currentView={currentView}
      />

      {/* Main content area - displays feed, profiles, etc. */}
      <MainContent />

      {/* Modal dialogs for various features */}
      {isLoggedIn && (
        <Modals
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          currentUser={currentUser}
          handleDeleteAccount={handleDeleteAccount}
          showOtherProfile={showOtherProfile}
          setShowOtherProfile={setShowOtherProfile}
          otherUser={otherUser}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          showGroups={showGroups}
          setShowGroups={setShowGroups}
          groups={groups}
          handleJoinGroup={handleJoinGroup}
          showStoryModal={showStoryModal}
          setShowStoryModal={setShowStoryModal}
          selectedStory={selectedStory}
        />
      )}

      {/* Chat Bar */}
      {isLoggedIn && <ChatBar />}

    </div>
  );
}

function App() {
  return (
    <SocialLobbyProvider>
      <AppContent />
    </SocialLobbyProvider>
  );
}

export default App;