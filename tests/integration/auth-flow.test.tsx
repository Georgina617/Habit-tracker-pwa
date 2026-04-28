import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '@/components/auth/SignupForm';
import LoginForm from '@/components/auth/LoginForm';

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('submits the signup form and creates a session', () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByTestId('auth-signup-fullname'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-confirm-password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    const session = JSON.parse(
      localStorage.getItem('habit-tracker-session') as string,
    );

    expect(session).toBeTruthy();
    expect(session.email).toBe('test@example.com');
    expect(session.fullname).toBe('John Doe'); // ✅ FIXED
  });

  it('shows an error for duplicate signup email', () => {
    localStorage.setItem(
      'habit-tracker-users',
      JSON.stringify([
        {
          id: '1',
          fullname: 'John Doe', // ✅ already correct
          email: 'test@example.com',
          password: 'password123',
          createdAt: new Date().toISOString(),
        },
      ]),
    );

    render(<SignupForm />);

    fireEvent.change(screen.getByTestId('auth-signup-fullname'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByTestId('auth-signup-confirm-password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    expect(screen.getByText('User already exists')).toBeTruthy();
  });

  it('submits the login form and stores the active session', () => {
    localStorage.setItem(
      'habit-tracker-users',
      JSON.stringify([
        {
          id: '1',
          fullname: 'John Doe', // ✅ consistent
          email: 'test@example.com',
          password: 'password123',
          createdAt: new Date().toISOString(),
        },
      ]),
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('auth-login-submit'));

    const session = JSON.parse(
      localStorage.getItem('habit-tracker-session') as string,
    );

    expect(session).toBeTruthy();
    expect(session.email).toBe('test@example.com');
  });

  it('shows an error for invalid login credentials', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId('auth-login-email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByTestId('auth-login-password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(screen.getByText('Invalid email or password')).toBeTruthy();
  });
});
