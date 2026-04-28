import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md text-center p-6 sm:p-8">
        <div className="flex justify-center mb-3">
          <img
            src="/icons/icon-192.png"
            alt="Habit Tracker Logo"
            className="w-10 h-10 rounded-lg"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Start building better habits
        </p>

        <SignupForm />
      </div>
    </div>
  );
}
