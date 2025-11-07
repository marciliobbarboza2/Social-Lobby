import React, { useState } from 'react';

const SettingsPage = ({ currentUser, setCurrentView }) => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    showOnlineStatus: true,
    emailNotifications: true,
    pushNotifications: false,
    theme: 'dark'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button 
          className="back-btn" 
          onClick={() => setCurrentView('feed')}
          aria-label="Back to feed"
        >
          ← Back
        </button>
        <h2>Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h3>Profile Settings</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.privateProfile}
                onChange={(e) => handleSettingChange('privateProfile', e.target.checked)}
              />
              <span>Private Profile</span>
            </label>
            <p className="setting-description">Only people you follow can see your posts</p>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.showOnlineStatus}
                onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
              />
              <span>Show Online Status</span>
            </label>
            <p className="setting-description">Let others see when you're online</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <span>Email Notifications</span>
            </label>
            <p className="setting-description">Receive updates via email</p>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <span>Push Notifications</span>
            </label>
            <p className="setting-description">Get push notifications in your browser</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label htmlFor="theme-select">Theme</label>
            <select
              id="theme-select"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
            <p className="setting-description">Choose your preferred color scheme</p>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-settings-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="cancel-settings-btn" onClick={() => setCurrentView('feed')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
