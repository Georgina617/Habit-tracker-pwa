'use client';

import { useState } from 'react';
import { getHabits, setHabits } from '@/lib/storage';
import { toggleHabitCompletion } from '@/lib/habits';
import { getHabitSlug } from '@/lib/slug';
import type { Habit } from '@/types/habit';
import { calculateCurrentStreak } from '@/lib/streaks';

export default function HabitCard({ habit }: { habit: Habit }) {
  const today = new Date().toISOString().split('T')[0];

  const completions = habit.completions || [];
  const isCompletedToday = completions.includes(today);
  const streak = calculateCurrentStreak(completions);

  const slug = getHabitSlug(habit.name);

  // ✅ EDIT STATE
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);

  // ✅ DELETE CONFIRM STATE
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // 🔁 TOGGLE COMPLETE
  function handleToggleComplete() {
    const habits = getHabits() as Habit[];

    const updated = habits.map((h) => {
      if (h.id !== habit.id) return h;
      return toggleHabitCompletion(h, today);
    });

    setHabits(updated);
    window.location.reload();
  }

  // ✏️ SAVE EDIT (preserve immutable fields)
  function handleSaveEdit() {
    const habits = getHabits() as Habit[];

    const updated = habits.map((h) => {
      if (h.id !== habit.id) return h;

      return {
        ...h,
        name,
        description,
      };
    });

    setHabits(updated);
    setIsEditing(false);
    window.location.reload();
  }

  // ❌ CANCEL EDIT (reset values properly)
  function handleCancelEdit() {
    setName(habit.name);
    setDescription(habit.description);
    setIsEditing(false);
  }

  // 🗑 DELETE CONFIRMED
  function handleDeleteConfirmed() {
    const habits = getHabits() as Habit[];
    const updated = habits.filter((h) => h.id !== habit.id);

    setHabits(updated);
    window.location.reload();
  }

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col gap-4"
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="w-full">
          {isEditing ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input mb-2"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-800">
                {habit.name}
              </h3>

              {habit.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {habit.description}
                </p>
              )}
            </>
          )}
        </div>

        {isCompletedToday && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Completed Today
          </span>
        )}
      </div>

      {/* STREAK */}
      <div
        data-testid={`habit-streak-${slug}`}
        className="flex items-center gap-2 text-sm font-medium"
      >
        <span className="text-orange-500 text-lg">🔥</span>
        <span className="text-gray-700">
          Streak: <span className="font-semibold">{streak}</span>
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 flex-wrap">
        {/* COMPLETE */}
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={handleToggleComplete}
          className={`px-4 py-2 text-sm rounded-lg ${
            isCompletedToday
              ? 'bg-gray-200 text-gray-700'
              : 'bg-green-500 text-white'
          }`}
        >
          {isCompletedToday ? '↩ Unmark Today' : '✔ Complete Today'}
        </button>

        {/* EDIT */}
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg"
            >
              💾 Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-sm bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            data-testid={`habit-edit-${slug}`}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm bg-yellow-400 text-white rounded-lg"
          >
            ✏ Edit
          </button>
        )}

        {/* DELETE */}
        {!confirmingDelete ? (
          <button
            data-testid={`habit-delete-${slug}`}
            onClick={() => setConfirmingDelete(true)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            🗑 Delete
          </button>
        ) : (
          <button
            data-testid="confirm-delete-button"
            onClick={handleDeleteConfirmed}
            className="px-4 py-2 text-sm bg-red-700 text-white rounded-lg"
          >
            Confirm Delete
          </button>
        )}
      </div>
    </div>
  );
}
