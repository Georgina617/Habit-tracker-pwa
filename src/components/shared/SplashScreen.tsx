'use client';

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white"
    >
      {/* ICON */}
      <img
        src="/icons/icon-192.png"
        alt="Habit Tracker Logo"
        className="w-24 h-24 mb-4 rounded-2xl shadow-lg"
      />

      {/* TITLE */}
      <h1 className="text-2xl font-bold tracking-wide">Habit Tracker</h1>
    </div>
  );
}
