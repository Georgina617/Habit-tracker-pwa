'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitForm from '@/components/habits/HabitForm';
import HabitList from '@/components/habits/HabitList';
import { logout } from '@/lib/auth';
import { getSession, getHabits } from '@/lib/storage';
import Calendar from '@/components/shared/Calendar';

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [userName, setUserName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [habits, setHabits] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();

    if (session?.fullname) {
      setUserName(session.fullname);
    }

    if (session?.userId) {
      const allHabits = getHabits();

      // ✅ ONLY LOAD CURRENT USER HABITS (TRD requirement)
      const userHabits = allHabits.filter(
        (h: any) => h.userId === session.userId,
      );

      setHabits(userHabits);
    }
  }, [refreshKey]);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  // 🔍 FILTER HABITS (SAFE)
  const filteredHabits =
    search.trim() === ''
      ? habits
      : habits.filter((habit) =>
          habit.name?.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <ProtectedRoute>
      <div
        data-testid="dashboard-page"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6"
      >
        {/* HEADER */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Hi {userName || 'User'} 👋
            </h1>

            {/* 🔍 SEARCH */}
            <input
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input mt-3 w-full md:w-80"
            />
          </div>

          <button
            data-testid="auth-logout-button"
            onClick={handleLogout}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition text-sm"
          >
            Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="space-y-4">
            {/* CREATE BUTTON */}
            <button
              data-testid="create-habit-button"
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {showForm ? 'Close Form' : 'Create Habit'}
            </button>

            {/* FORM */}
            {showForm && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                <h2 className="font-semibold mb-3">New Habit</h2>
                <HabitForm
                  onCreated={() => {
                    setRefreshKey((k) => k + 1);
                    setShowForm(false);
                  }}
                />
              </div>
            )}

            {/* ✅ CALENDAR (REPLACED COMPLETED PANEL) */}
            <Calendar />
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Your Habits
            </h2>

            {/* EMPTY SEARCH STATE */}
            {search && filteredHabits.length === 0 ? (
              <p className="text-sm text-gray-500">
                No habits found for "{search}"
              </p>
            ) : (
              <HabitList
                refreshKey={refreshKey}
                customHabits={filteredHabits}
                search={search}
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
