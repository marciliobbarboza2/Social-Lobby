import React, { useState } from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';

const SettingsPage = () => {
  const { authProps, dataProps } = useSocialLobbyContext();
  const { currentUser } = authProps;
  const { handleChangeProfilePic } = dataProps;

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    privateProfile: false,
    showOnlineStatus: true,
    theme: 'light'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file && currentUser) {
      handleChangeProfilePic(file, currentUser);
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Profile Settings</h3>
        <div className="setting-item">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          <img src={currentUser?.avatar} alt="Current profile" className="current-avatar" />
        </div>
        <div className="setting-item">
          <label>Display Name</label>
          <input type="text" defaultValue={currentUser?.firstName + ' ' + currentUser?.lastName} />
        </div>
        <div className="setting-item">
          <label>Bio</label>
          <textarea defaultValue={currentUser?.bio} />
        </div>
      </div>

      <div className="settings-section">
        <h3>Privacy Settings</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.privateProfile}
              onChange={(e) => handleSettingChange('privateProfile', e.target.checked)}
            />
            Private Profile
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.showOnlineStatus}
              onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
            />
            Show Online Status
          </label>
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
            Email Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
            />
            Push Notifications
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-item">
          <label>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Account Actions</h3>
        <button className="save-settings-btn">Save Changes</button>
        <button className="change-password-btn">Change Password</button>
        <button className="delete-account-btn" onClick={() => authProps.handleDeleteAccount()}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
