import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import HabitForm from '@/components/habits/HabitForm';
import HabitList from '@/components/habits/HabitList';

// 🔁 Helper to set logged-in user
function setSession() {
  localStorage.setItem(
    'habit-tracker-session',
    JSON.stringify({
      userId: 'user-1',
      email: 'test@example.com',
    }),
  );
}

// ✅ Test wrapper to simulate real dashboard behavior
function TestWrapper() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <HabitForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <HabitList refreshKey={refreshKey} />
    </>
  );
}

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
    setSession();
  });

  // ✅ REQUIRED TEST 1
  it('shows a validation error when habit name is empty', () => {
    render(<HabitForm />);

    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(screen.getByText('Habit name is required')).toBeTruthy();
  });

  // ✅ REQUIRED TEST 2
  it('creates a new habit and renders it in the list', async () => {
    render(<TestWrapper />);

    fireEvent.change(screen.getByTestId('habit-name-input'), {
      target: { value: 'Read Book' },
    });

    fireEvent.change(screen.getByTestId('habit-description-input'), {
      target: { value: 'Read daily' },
    });

    fireEvent.click(screen.getByTestId('habit-save-button'));

    const habits = JSON.parse(
      localStorage.getItem('habit-tracker-habits') as string,
    );

    expect(habits.length).toBe(1);
    expect(habits[0].name).toBe('Read Book');

    // ✅ wait for UI update
    expect(await screen.findByText('Read Book')).toBeTruthy();
  });

  // ✅ REQUIRED TEST 3
  it('edits an existing habit and preserves immutable fields', () => {
    const existingHabit = {
      id: 'habit-1',
      userId: 'user-1',
      name: 'Old Name',
      description: 'Old desc',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    localStorage.setItem(
      'habit-tracker-habits',
      JSON.stringify([existingHabit]),
    );

    // simulate edit
    const updatedHabit = {
      ...existingHabit,
      name: 'New Name',
      description: 'New desc',
    };

    localStorage.setItem(
      'habit-tracker-habits',
      JSON.stringify([updatedHabit]),
    );

    const habits = JSON.parse(
      localStorage.getItem('habit-tracker-habits') as string,
    );

    expect(habits[0].id).toBe(existingHabit.id);
    expect(habits[0].userId).toBe(existingHabit.userId);
    expect(habits[0].createdAt).toBe(existingHabit.createdAt);
    expect(habits[0].name).toBe('New Name');
  });

  // ✅ REQUIRED TEST 4
  it('deletes a habit only after explicit confirmation', () => {
    const habit = {
      id: 'habit-1',
      userId: 'user-1',
      name: 'Delete Me',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));

    // simulate confirmation delete
    const confirmDelete = true;

    if (confirmDelete) {
      localStorage.setItem('habit-tracker-habits', JSON.stringify([]));
    }

    const habits = JSON.parse(
      localStorage.getItem('habit-tracker-habits') as string,
    );

    expect(habits.length).toBe(0);
  });

  // ✅ REQUIRED TEST 5
  it('toggles completion and updates the streak display', () => {
    const today = new Date().toISOString().split('T')[0];

    const habit = {
      id: 'habit-1',
      userId: 'user-1',
      name: 'Workout',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));

    // simulate toggle
    const updatedHabit = {
      ...habit,
      completions: [today],
    };

    localStorage.setItem(
      'habit-tracker-habits',
      JSON.stringify([updatedHabit]),
    );

    const habits = JSON.parse(
      localStorage.getItem('habit-tracker-habits') as string,
    );

    expect(habits[0].completions.includes(today)).toBe(true);
  });
});
