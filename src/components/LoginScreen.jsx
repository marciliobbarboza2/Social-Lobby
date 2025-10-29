import React, { useState } from 'react';

const LoginScreen = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  isLoading,
  error,
  setError
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleRegister = async () => {
    // Clear previous errors
    setError(null);

    // Validation
    if (!registerData.firstName || !registerData.lastName || !registerData.username ||
        !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(registerData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(registerData.password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(registerData.username)) {
      setError('Username must be 3-30 characters long and can only contain letters, numbers, underscores, and hyphens.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          avatar: registerData.avatar
        })
      });

      const data = await response.json();

      if (data.success) {
        // Auto-login after successful registration
        handleLogin(registerData.email, registerData.password);
        setIsRegistering(false);
        setRegisterData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          avatar: ''
        });
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin(loginEmail, loginPassword);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-logo">
          <div className="logo-icon-large">🌐</div>
          <h1 className="logo-text">Socialobby</h1>
        </div>

        {isRegistering ? (
          <>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="avatar-upload">
                <div className="avatar-preview">
                  <img
                    src={registerData.avatar || 'https://picsum.photos/seed/default/100'}
                    alt="Avatar preview"
                    className="avatar-image"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setRegisterData({...registerData, avatar: e.target.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="avatar-input"
                />
                <label className="avatar-label">Choose Avatar</label>
              </div>
              <div className="name-fields">
                <input
                  type="text"
                  placeholder="First Name"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                  className="login-input name-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                  className="login-input name-input"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                className="login-input"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                className="login-input"
                required
              />
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                className="login-input"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                className="login-input"
                required
              />
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <p className="switch-mode">
              Already have an account?{' '}
              <button
                className="link-btn"
                onClick={() => {
                  setIsRegistering(false);
                  setError(null);
                }}
              >
                Login here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Login to Socialobby</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="login-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="login-input"
                required
              />
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="switch-mode">
              Don't have an account?{' '}
              <button
                className="link-btn"
                onClick={() => {
                  setIsRegistering(true);
                  setError(null);
                }}
              >
                Register here
              </button>
            </p>
          </>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginScreen;
