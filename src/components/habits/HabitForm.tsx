'use client';

import { useState } from 'react';
import { validateHabitName } from '@/lib/validators';
import { getSession, getHabits, setHabits } from '@/lib/storage';
import type { Habit } from '@/types/habit';

export default function HabitForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validateHabitName(name);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const session = getSession();
    if (!session) return;

    const habits = getHabits() as Habit[];

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name: validation.value,
      description,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    setHabits([...habits, newHabit]);

    setName('');
    setDescription('');
    setError(null);

    if (onCreated) onCreated();
  }

  return (
    <form
      data-testid="habit-form"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Create Habit</h2>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Name */}
      <input
        data-testid="habit-name-input"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />

      {/* Description */}
      <input
        data-testid="habit-description-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input"
      />

      {/* Frequency */}
      <select
        data-testid="habit-frequency-select"
        defaultValue="daily"
        className="input"
      >
        <option value="daily">Daily</option>
      </select>

      {/* ✅ Save Button (clearly below select) */}
      <button
        data-testid="habit-save-button"
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Save Habit
      </button>
    </form>
  );
}
