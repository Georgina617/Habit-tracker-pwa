import type { Habit } from '../types/habit';

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const hasDate = habit.completions.includes(date);

  let updatedCompletions: string[];

  if (hasDate) {
    updatedCompletions = habit.completions.filter((d) => d !== date);
  } else {
    updatedCompletions = [...habit.completions, date];
  }

  // ensure no duplicates
  const uniqueCompletions = Array.from(new Set(updatedCompletions));

  return {
    ...habit,
    completions: uniqueCompletions,
  };
}
