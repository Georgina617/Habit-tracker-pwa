'use client';

import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Email</label>
        <input
          className="input"
          data-testid="auth-login-email"
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
          className="input"
          type="password"
          data-testid="auth-login-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        className="btn btn-primary w-full"
        data-testid="auth-login-submit"
        type="submit"
      >
        Login
      </button>

      {/* Signup link */}
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => router.push('/signup')}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}
