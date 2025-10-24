import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginScreen from './LoginScreen';

describe('LoginScreen', () => {
  it('renders the login form by default', () => {
    render(
      <LoginScreen
        loginEmail=""
        setLoginEmail={() => {}}
        loginPassword=""
        setLoginPassword={() => {}}
        handleLogin={() => {}}
        isLoading={false}
        error={null}
        setError={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: /Login to Socialobby/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});