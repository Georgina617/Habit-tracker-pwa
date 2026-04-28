'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth';

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return setError('All fields are required');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    // ✅ Use central auth logic
    const result = signup(fullName, email, password);

    if (!result.success) {
      setError(result.error || 'Something went wrong');
      return;
    }

    // ✅ Redirect after success
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          data-testid="auth-signup-fullname"
          className="input"
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Email</label>
        <input
          data-testid="auth-signup-email"
          className="input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Password</label>
        <input
          data-testid="auth-signup-password"
          className="input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Confirm Password</label>
        <input
          data-testid="auth-signup-confirm-password"
          className="input"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        data-testid="auth-signup-submit"
        type="submit"
        className="btn btn-primary w-full"
      >
        Sign Up
      </button>

      {/* Login Redirect */}
      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => router.push('/login')}
        >
          Login
        </span>
      </p>
    </form>
  );
}
