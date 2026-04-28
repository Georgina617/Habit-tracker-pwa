'use client';

import { useEffect, useState } from 'react';
import { getHabits, getSession } from '@/lib/storage';
import type { Habit } from '@/types/habit';
import HabitCard from './HabitCard';

type Props = {
  refreshKey: number;
  customHabits?: Habit[];
  search?: string;
};

export default function HabitList({ refreshKey, customHabits, search }: Props) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 2;

  useEffect(() => {
    const session = getSession();
    const allHabits = getHabits() as Habit[];

    if (!session) return;

    const userHabits = allHabits.filter((h) => h.userId === session.userId);

    setHabits(userHabits);
  }, [refreshKey]);

  const habitsToRender = customHabits ?? habits;

  // 🔍 EMPTY STATE
  if (habitsToRender.length === 0) {
    if (search && search.trim() !== '') {
      return (
        <p className="text-sm text-gray-500">No habits found for "{search}"</p>
      );
    }

    return <p data-testid="empty-state">No habits yet</p>;
  }

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(habitsToRender.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentHabits = habitsToRender.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* HABITS */}
      {currentHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}

      {/* PAGINATION CONTROLS */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
